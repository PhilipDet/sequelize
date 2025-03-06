import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { db } from "../config/db.js";

/**
 *
 * @param {string} filename
 * @returns {Promise}
 */
export const GetCsvData = async (filename) => {
    console.log("GetCsvData -> filename", filename);
    console.log(typeof filename);

    const csvPath = path.resolve(`./data/${filename}`);
    const data = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (row) => data.push(row))
            .on("end", () => resolve(data))
            .on("error", (error) => reject(error));
    });
};

/**
 *
 * @param {string} filename
 * @param {Object} model
 */
export const SeedFromCsv = async (filename, model) => {
    const transaction = await db.transaction();

    try {
        const data = await GetCsvData(filename);
        console.log(data);

        await model.bulkCreate(data, { transaction });

        await transaction.commit();
        console.log(`Seeding ${filename} successful!`);
    } catch (error) {
        await transaction.rollback();
        console.log("Seeding Error:", error);
    }
};
