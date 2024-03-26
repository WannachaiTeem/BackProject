import express, { json } from "express";
import mysql from "mysql";
import { VoteGetRequest } from "./model/VoteGetRequest";
import { EloRateRequest } from "./model/EloRateRequest";
import { TimevoteGetRequest } from "./model/TimeVotegetRequest";

export const conn = mysql.createPool({
  // connectionLimit: 10,
  // host: "sql6.freemysqlhosting.net",
  // user: "sql6688515",
  // password: "M2fmddayIi",
  // database: "sql6688515",

  connectionLimit: 10,
  host: "202.28.34.197",
  user: "web65_64011212155",
  password: "64011212155@csmsu",
  database: "web65_64011212155",
});


export const router = express.Router();

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://backproject-4100.onrender.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




//ค้นหา Time ทั้งหมด
router.get("/", (req, res) => {
    conn.query('select * from TimeVote', (err, result, fields) => {
        res.json(result);
        console.log('success');
    });
});


//แก้ไขเวลาจาก Tid
router.put("/:id", (req, res) => {
    let id = +req.params.id;
    let updatetime: TimevoteGetRequest = req.body;
    let sql =
      "update  `TimeVote` set `counter`=? where `Tid`=?";
    sql = mysql.format(sql, [
        updatetime.counter *1000,
        id
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows });
    });
  });





