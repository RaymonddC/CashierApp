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
    await queryInterface.bulkInsert("transactions", [
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-2"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction: 40000,
        transaction_date: new Date("2023-6-2"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-3"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-3"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-4"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-4"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-5"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-5"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-5"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-6"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-6"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-7"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-8"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-8"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-9"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-9"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-11"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-12"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-13"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-13"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        total_transaction:
          Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000,
        transaction_date: new Date("2023-6-13"),
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
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
