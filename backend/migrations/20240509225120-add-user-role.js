'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('users', 'role', {
    type: Sequelize.DataTypes.ENUM,
    values: [
      'reviewer',
      'admin',
    ],
    defaultValue: 'reviewer'
  });
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.removeColumn('users', 'role');
}
