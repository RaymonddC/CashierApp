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
        price: 20000,
        stock: 100,
        product_image: "IMG1685973920711.png",
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Pizza Mozarella",
        price: 50000,
        stock: 100,
        product_image: "IMG1685974088353.png",
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "French Fries",
        price: 10000,
        stock: 100,
        product_image: "IMG1685948609056.png",
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Coca Cola",
        price: 10000,
        stock: 100,
        product_image: "IMG1685974633294.png",
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Coffee Latte",
        price: 20000,
        stock: 100,
        product_image: "IMG1685974664327.png",
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_name: "Ice Cream",
        price: 20000,
        stock: 100,
        product_image: "IMG1685974813616.png",
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
