'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [
      {
        username: 'AdminMekdi',
        email: 'AdminMekdi@gmail.com',
        role_id: 1,
        password: '$2b$10$fkne8kAVULIQDAzQxjbEL.B9CvLqzuFVSkWTYC1fOuidheUF5RHnC',
        status: 'Enable',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'CashierMekdi',
        email: 'CashierMekdi@gmail.com',
        role_id: 2,
        password: '$2b$10$WK1I0YRi9lEBDTvNCuTmV.62RlCEJ4wdP6Bhyojlg54jXNHL.CKsa',
        status: 'Disable',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
