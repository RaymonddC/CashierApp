const db = require("../models");
const { transaction } = db;
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  getTransaction: async (req, res) => {
    try {
      const { start, end } = req.query;

      let where;
      if (!start && !end) {
        where = {
          transaction_date: {
            [Op.between]: [new Date("2023-6-1"), new Date("2023-6-12")],
          },
        };
      }

      const result = await transaction.findAll({
        attributes: [
          "transaction_date",
          [
            sequelize.fn("SUM", sequelize.col("total_transaction")),
            "Total_Aggragate",
          ],
        ],
        where: where,
        group: ["transaction_date"],
      });

      return res.status(200).send({
        isError: false,
        message: "Get Data Transaction Success!",
        data: result,
      });
    } catch (error) {
      res.status(error.code || 500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },
};
