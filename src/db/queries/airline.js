const db = require("../connection");
const bcrypt = require("bcrypt");

function findAllAirlines() {
  return new Promise((resolve) => {
    const request = "SELECT * FROM AIRLINE";
    const rows = db.prepare(request).all();
    resolve(rows);
  });
}

function findAirline() {
  return new Promise((resolve) => {
    const request =
      "SELECT * FROM AIRLINE WHERE airlineID = '01973a9b-309b-73d4-bf59-c42b0accdafe'";
    const row = db.prepare(request).get();
    resolve(row);
  });
}

function updateAirline(airline) {
  const { airlineICAO, airlineName, airlineNationality, airlineLogo } = airline;

  return new Promise((resolve) => {
    const request =
      "UPDATE AIRLINE SET airlineICAO = ?, airlineName = ?, airlineNationality = ?, airlineLogo = ? WHERE airlineID = '01973a9b-309b-73d4-bf59-c42b0accdafe'";
    const countRowUpdated = db
      .prepare(request)
      .run(airlineICAO, airlineName, airlineNationality, airlineLogo).changes;
    resolve(countRowUpdated);
  });
}

module.exports = { findAllAirlines, findAirline, updateAirline };
