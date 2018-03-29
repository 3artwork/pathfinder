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

router.post('/getNotes', (req, res) => {
  console.log("Getting Notes");
  let q = "SELECT Author, Type, Number, Latitude, Longitude FROM Notes";
  if(req.body.subsurface === false)
        q += " WHERE Subsurface = 'FALSE'";
  const pool = new sql.ConnectionPool(config);
  pool.connect().then(() => {
      let request = new sql.Request(pool);
      request.query(q)
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

router.post('/getDossiers', (req, res) => {
  console.log("Getting Dossiers");
  let q = "SELECT Name, Latitude, Longitude FROM Dossiers";
  if(req.body.subsurface === false)
    q += " WHERE Subsurface = 'FALSE'";
  const pool = new sql.ConnectionPool(config);
  pool.connect().then(() => {
      let request = new sql.Request(pool);
      request.query(q)
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