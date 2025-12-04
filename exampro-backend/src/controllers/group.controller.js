// src/controllers/group.controller.js
import { Group,Admin, SuperUser } from "../models/index.js";
import { Op } from "sequelize";

/** Create new group */
export const createGroup = async (req, res, next) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const { id: createdBy, organizationId } = req.user;
    const group = await Group.create({
      name, description, start_date: startDate, end_date: endDate, created_by: createdBy, organization_id: organizationId, status: "ACTIVE", });
    res.status(201).json({ message: "Group created successfully", group });
  } catch (err) {
    next(err);
  }
};

/** Get all groups for the logged-in user's organization */
export const getGroups = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const groups = await Group.findAll({
      where: { organization_id: organizationId ,  deleted_at: null,}, order: [["created_at", "DESC"]],
    });

    // Map creator names dynamically
    const mappedGroups = await Promise.all(
      groups.map(async (g) => {
        let creatorName = "Unknown";
        const admin = await Admin.findByPk(g.created_by);
        if (admin) {
          creatorName = admin.name;
        } else {
          const superUser = await SuperUser.findByPk(g.created_by);
          if (superUser) creatorName = superUser.name;
        }

        return {
          id: g.id,
          name: g.name,
          description: g.description,
          participants: g.participants_count || 0, 
participants_count: g.participants_count || 0, 
          start: g.start_date ? g.start_date.toISOString().split("T")[0] : "",
end: g.end_date ? g.end_date.toISOString().split("T")[0] : "",

          status: g.status === "ACTIVE" ? "Active" : g.status,
          createdBy: creatorName,
          createdAt: g.created_at ? new Date(g.created_at).toLocaleDateString() : "",
          updatedAt: g.updated_at ? new Date(g.updated_at).toLocaleDateString() : "",
        };
      })
    );
    res.json(mappedGroups);
  } catch (err) {
    next(err);
  }
};

/** Get group by ID */
export const getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    next(err);
  }
};

/** Update group*/
export const updateGroup = async (req, res, next) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    await group.update({ name, description, start_date: startDate, end_date: endDate, status, });

    res.json({ message: "Group updated successfully", group });
  } catch (err) {
    next(err);
  }
};

// DELETE GROUP
export const deleteGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const userId = req.user.id;

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await group.update({
      deleted_at: new Date(),
      deleted_by: userId,
      status: "DELETED"
    });

    return res.json({ success: true, message: "Group deleted successfully" });
  } catch (err) {
    next(err);
  }
};

/** Remove participant from group */
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
/** Get removed groups */
export const getRemovedGroups = async (req, res, next) => {
  try {
    const removedGroups = await Group.findAll({
      where: { deleted_at: { [Op.ne]: null } },
      order: [["deleted_at", "DESC"]],
    });
    const mappedGroups = await Promise.all(
      removedGroups.map(async (g) => {
        let creatorName = "Unknown";
        let deleterName = "Unknown";
        const admin = await Admin.findByPk(g.created_by);
        if (admin) creatorName = admin.name;
        else {
          const superUser = await SuperUser.findByPk(g.created_by);
          if (superUser) creatorName = superUser.name;
        }
        const deletedByAdmin = await Admin.findByPk(g.deleted_by);
        if (deletedByAdmin) deleterName = deletedByAdmin.name;
        else {
          const deletedBySuperUser = await SuperUser.findByPk(g.deleted_by);
          if (deletedBySuperUser) deleterName = deletedBySuperUser.name;
        }

        return {
          id: g.id,
          name: g.name,
          description: g.description,
          start: g.start_date ? new Date(g.start_date).toLocaleDateString() : "",
          end: g.end_date ? new Date(g.end_date).toLocaleDateString() : "",
          createdBy: creatorName,
          deletedBy: deleterName,
          deletedAt: g.deleted_at ? new Date(g.deleted_at).toLocaleDateString() : "",
        };
      })
    );
    res.json(mappedGroups);
  } catch (err) {
    next(err);
  }
};

/** Get uploaded participant batches */
export const getUploadedBatches = async (req, res, next) => {
  try {
    const batches = await ParticipantBatch.findAll({ order: [['created_at', 'DESC']] });
    res.json(batches);
  } catch (err) {
    next(err);
  }
};