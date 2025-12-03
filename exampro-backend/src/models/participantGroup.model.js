// src/models/participantGroup.model.js  join table participant_groups

export default (sequelize, DataTypes) => {
  const ParticipantGroup = sequelize.define(
    "ParticipantGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "participant_groups",
      timestamps: false,
    }
  );

  return ParticipantGroup;
};
