"use strict"
const sqlite3 = require('sqlite3').verbose();
const logger = require('winston');
const assert = require('chai').assert;

async function testTwo() {

  try {

    logger.info('1. Database connection ang get data');
    const db = new sqlite3.Database('C:\\Users\\Alekseii\\js\\Cypress\\Countries.db');
    const query = "SELECT * FROM Countries";

    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }

      logger.info('2. Checking population density below 50 people/sq.km and Checking total population less than 2 billion people.');
      let totalPopulation = 0;
      let isUSADensityBelow50 = false;

      rows.forEach((row) => {
        const country = row.Country;
        const population = row.Population;
        const area = row.Area;
        const density = population / area;

        totalPopulation += population;

        if (country === 'USA' && density < 50) {
          isUSADensityBelow50 = true;
        }
      });

      const isTotalPopulationLessThan2Billion = totalPopulation < 2000000000;
      assert.isTrue(isUSADensityBelow50, 'The population density is not below 50 people/sq.km. in the USA');
      assert.isTrue(isTotalPopulationLessThan2Billion, 'The total population of all 4 countries is not less than 2 billion people');

      logger.info('3. Closing database connection');
      db.close();
    });

  } finally {
  }
};

testTwo();

