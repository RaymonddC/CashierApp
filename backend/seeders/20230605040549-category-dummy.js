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
    await queryInterface.bulkInsert('categories', [
      {
        category_name: 'Burger',
        category_image: 'burger.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Pizza',
        category_image: 'pizza.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Snack',
        category_image: 'snack.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Soft Drink',
        category_image: 'softDrink.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Coffee',
        category_image: 'coffee.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Ice Cream',
        category_image: 'eskrim.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Beer',
        category_image: 'hardDrink.png',
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
    await queryInterface.bulkDelete('categories', null, {});
  },
};
