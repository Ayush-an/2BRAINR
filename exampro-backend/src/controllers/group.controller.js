// src/controllers/group.controller.js
import { Group, ParticipantGroup } from "../models/index.js";

/**
 * 🧩 Create new group
 */
export const createGroup = async (req, res, next) => {
  try {
    const { name, description, startDate, endDate, createdBy } = req.body;
    const group = await Group.create({
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      created_by: createdBy,
      status: "ACTIVE",
    });
    res.status(201).json({ message: "Group created successfully", group });
  } catch (err) {
    next(err);
  }
};

/**
 * 👥 Add participants to group
 */
export const addParticipantsToGroup = async (req, res, next) => {
  try {
    const { participantId, groupId } = req.body;
    await ParticipantGroup.create({ participant_id: participantId, group_id: groupId });
    res.json({ message: "Participant added to group" });
  } catch (err) {
    next(err);
  }
};

/**
 * 📋 Get all groups
 */
export const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

/**
 * 🔍 Get group by ID
 */
export const getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    next(err);
  }
};

/**
 * ✏️ Update group
 */
export const updateGroup = async (req, res, next) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    await group.update({
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    });

    res.json({ message: "Group updated successfully", group });
  } catch (err) {
    next(err);
  }
};

/**
 * 🗑️ Delete group
 */
export const deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    await group.destroy();
    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * ❌ Remove participant from group
 */
export const removeParticipantFromGroup = async (req, res, next) => {
  try {
    const { groupId, participantId } = req.params;
    await ParticipantGroup.destroy({
      where: { group_id: groupId, participant_id: participantId },
    });
    res.json({ message: "Participant removed from group" });
  } catch (err) {
    next(err);
  }
};


// src/controllers/group.controller.js

/**
 * 📂 Get removed groups
 */
export const getRemovedGroups = async (req, res, next) => {
  try {
    // Assuming `Group` has a `deleted_at` and `removed_by` column
    const removedGroups = await Group.findAll({
      where: { deleted_at: { [sequelize.Op.ne]: null } },
      order: [['deleted_at', 'DESC']]
    });

    res.json(
      removedGroups.map(g => ({
        id: g.id,
        name: g.name,
        createdBy: g.created_by,
        removedBy: g.removed_by,
        createdAt: g.created_at,
        removedAt: g.deleted_at
      }))
    );
  } catch (err) {
    next(err);
  }
};


/**
 * 📦 Get uploaded participant batches
 */
export const getUploadedBatches = async (req, res, next) => {
  try {
    const batches = await ParticipantBatch.findAll({ order: [['created_at', 'DESC']] });
    res.json(batches);
  } catch (err) {
    next(err);
  }
};
