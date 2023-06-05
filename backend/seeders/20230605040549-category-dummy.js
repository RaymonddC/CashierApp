"use strict";

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
    await queryInterface.bulkInsert("categories", [
      {
        category_name: "Burger",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Pizza",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Snack",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Soft Drink",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Coffee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Ice Cream",
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
