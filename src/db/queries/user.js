const db = require("../connection");
const bcrypt = require("bcrypt");

function authenticateUser(login, password) {
  return new Promise((resolve, reject) => {
    const request = "SELECT * FROM USER WHERE userLogin = ?";
    const row = db.prepare(request).bind(login).get();
    if (row === undefined) {
      resolve(row);
    } else {
      bcrypt.compare(password, row.userPassword, function (err) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(row);
        }
      });
    }
  });
}

function findAllUsers() {
  return new Promise((resolve) => {
    const request = "SELECT * FROM USER ORDER BY userProfile";
    const rows = db.prepare(request).all();
    resolve(rows);
  });
}

function findUser(id) {
  return new Promise((resolve) => {
    const request = "SELECT * FROM USER WHERE userID = ?";
    const row = db.prepare(request).bind(id).get();
    resolve(row);
  });
}

function createUser(user) {
  const {
    userID,
    userGivenName,
    userSurname,
    userLogin,
    userPassword,
    userProfile,
  } = user;

  return new Promise((resolve, reject) => {
    bcrypt.hash(userPassword, 13, (err, hash) => {
      const request = "INSERT INTO USER VALUES (?, ?, ?, ?, ?, ?)";
      const countRowInserted = db
        .prepare(request)
        .run(
          userID,
          userGivenName,
          userSurname,
          userLogin,
          hash,
          userProfile,
        ).changes;

      if (err) {
        reject(new Error(err));
      } else {
        resolve(countRowInserted);
      }
    });
  });
}

function resetUserPassword(user) {
  const {
    userPassword,
    userID,
    userGivenName,
    userSurname,
    userLogin,
    userProfile,
  } = user;

  return new Promise((resolve, reject) => {
    bcrypt.hash(userPassword, 13, (err, hash) => {
      const request = `UPDATE USER SET userPassword = ? WHERE userGivenName = ? AND userSurname = ?
                                   AND userLogin = ? AND userProfile = ? AND userID = ?`;
      const countRowUpdated = db
        .prepare(request)
        .run(
          hash,
          userGivenName,
          userSurname,
          userLogin,
          userProfile,
          userID,
        ).changes;

      if (err) {
        reject(new Error(err));
      } else {
        resolve(countRowUpdated);
      }
    });
  });
}

function updateUser(user) {
  const { userGivenName, userSurname, userLogin, userProfile, userID } = user;

  return new Promise((resolve) => {
    const request =
      "UPDATE USER SET userGivenName = ?, userSurname = ?, userLogin = ?, userProfile = ? WHERE userID = ?";
    const countRowUpdated = db
      .prepare(request)
      .run(userGivenName, userSurname, userLogin, userProfile, userID).changes;
    resolve(countRowUpdated);
  });
}

function deleteUser(id) {
  return new Promise((resolve) => {
    const request = "DELETE FROM USER WHERE userID = ?";
    const countRowDeleted = db.prepare(request).run(id).changes;
    resolve(countRowDeleted);
  });
}

module.exports = {
  authenticateUser,
  findAllUsers,
  findUser,
  createUser,
  resetUserPassword,
  updateUser,
  deleteUser,
};
