const Sequelize = require(`sequelize`);
const dao = require(`../database_access_object`);

// Initialize UserStepEntry
class UserStepEntry extends Sequelize.Model {}

UserStepEntry.init({
    row_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(2000),
        allowNull: false,
    },
    date: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    steps: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    calories: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
}, {
    sequelize: dao,
    modelName: `user_steps`
});

module.exports = UserStepEntry;