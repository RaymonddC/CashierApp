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
    await queryInterface.bulkInsert("products", [
      {
        product_name: "Burger",
        stock: 100,
        product_image: "IMG1685948529817.png",
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Pizza Mozarella",
        stock: 100,
        product_image: "IMG1685948562121.png",
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "French Fries",
        stock: 100,
        product_image: "IMG1685948609056.png",
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Coca Cola",
        stock: 100,
        product_image: "IMG1685948680758.png",
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Coffee Latte",
        stock: 100,
        product_image: "IMG1685948745481.png",
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Ice Cream",
        stock: 100,
        product_image: "IMG1685948821624.png",
        category_id: 6,
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
    await queryInterface.bulkDelete("products", null, {});
  },
};
