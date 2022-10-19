"use strict"
const sqlite3 = require('sqlite3').verbose();
const logger = require('winston');

async function testTwo() {

  try {

    logger.info('1.database connection');
let db = new sqlite3.Database('c:\\Users\\olexiy.klein\\JSAutomation\\JSTests\\Countries.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected database =>');
  });

let query = "SELECT SUM(Population) FROM Countries WHERE Population < 2000000000";

logger.info('1. The total population of all 4 countries is less than 2 billion people');
db.all(query, (err, result) =>{
    console.log(err);
    console.log(result);
});

logger.info('1. Population density below 50 people/sq.km.');

let query2 = "SELECT Country FROM Countries  WHERE Population/Area < 50";

db.all(query2, (err, result) =>{
    console.log(err);
    console.log(result);
});  

} finally {
}
};


testTwo();

