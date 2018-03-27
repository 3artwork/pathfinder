const express = require('express');
const router = express.Router();

// declare axios for making http requests=
const sql = require('mssql');

var config = {
    user: 'fetcher',
    password: 'password1',
    server: 'localhost\\SQL2014',
    database: 'Experiments'
}

router.get('/getNotes', (req, res) => {
  console.log("Getting Notes");
  const pool = new sql.ConnectionPool(config);
  pool.connect().then(() => {
      let request = new sql.Request(pool);
      request.query("SELECT Author, Type, Number, Latitude, Longitude FROM Notes")
        .then((response) => {
          res.send(response.recordset);
          pool.close();
      }).catch((err) => {
        console.log(err);
        pool.close();
      });
    }).catch((err) => {
      console.log(err);
    });
});

router.get('/getDossiers', (req, res) => {
  console.log("Getting Dossiers");
  const pool = new sql.ConnectionPool(config);
  pool.connect().then(() => {
      let request = new sql.Request(pool);
      request.query("SELECT Name, Latitude, Longitude FROM Dossiers")
        .then((response) => {
          res.send(response.recordset);
          pool.close();
      }).catch((err) => {
        console.log(err);
        pool.close();
      });
    }).catch((err) => {
      console.log(err);
    });
});

module.exports = router;