const db = require("../models");
const { transaction } = db;
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  createTransaction: async (req, res) => {
    try {
      const { transaction_date, total_transaction } = req.body;
      let result = await transaction.create({
        transaction_date,
        total_transaction,
      });

      res.status(201).send({
        isError: false,
        message: "Transaction Created!",
        data: null,
      });
      // console.log(transaction_date, total_transaction);
    } catch (error) {
      res.status(error.code || 500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },

  getTransaction: async (req, res) => {
    try {
      const { start, end } = req.query;

      // console.log(start, end);

      let length = Math.floor(
        (new Date(end + "") - new Date(start + "")) / (1000 * 60 * 60 * 24)
      );

      if (!start || !end || length < 0) {
        return res.status(400).send({
          isError: true,
          message: "Bad Request!",
          data: null,
        });
      }

      let where;

      if (start && end) {
        where = {
          transaction_date: {
            [Op.between]: [new Date(`${start} `), new Date(`${end} `)],
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

      if (length === 0) {
        return res.status(200).send({
          isError: false,
          message: "Get Data Transaction Success!",
          data: result,
        });
      }

      if (length === result.length - 1) {
        return res.status(200).send({
          isError: false,
          message: "Get Data Transaction Success!",
          data: result,
        });
      }

      let split = start.split("-");

      let day = split[2][0] === "0" ? Number(split[2][1]) : Number(split[2]);
      let month = split[1][0] === "0" ? Number(split[1][1]) : Number(split[1]);
      let year = Number(split[0]);

      let newResult = [];

      for (let i = 0; i <= length; i++) {
        let dateTemp;
        if (day < 10 && month < 10) {
          dateTemp = `${year}-0${month}-0${day}`;
        } else if (month < 10) {
          dateTemp = `${year}-0${month}-${day}`;
        } else {
          dateTemp = `${year}-${month}-${day}`;
        }
        if (
          new Date(dateTemp + "").toString() === "Invalid Date" &&
          month === 12
        ) {
          day = 1;
          month = 1;
          ++year;
          dateTemp = `${year}-0${month}-0${day}`;
        } else if (new Date(dateTemp + "").toString() === "Invalid Date") {
          ++month;
          day = 1;
          dateTemp = `${year}-${month < 10 ? `0${month}` : month}-0${day}`;
        }
        let tempObj;
        for (let j = 0; j < result.length; j++) {
          if (dateTemp === result[j].transaction_date) {
            tempObj = result[j];
            newResult.push(tempObj);
            dateTemp = null;
            continue;
          }
        }
        if (!dateTemp) {
          ++day;
          continue;
        }
        tempObj = {
          transaction_date: dateTemp,
          Total_Aggragate: "0",
        };
        newResult.push(tempObj);
        ++day;
      }

      return res.status(200).send({
        isError: false,
        message: "Get Data Transaction Success!",
        data: newResult,
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
