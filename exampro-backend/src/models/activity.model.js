// src/models/activity.model.js

export default (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(150),
      },
      email: {
        type: DataTypes.STRING(150),
      },
      role: {
        type: DataTypes.STRING(50),
      },
      action: {
        type: DataTypes.STRING(255),
      },
      spent_time: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      logout_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "activity_logs",
      timestamps: false, // uses created_at only
    }
  );

  return Activity;
};
