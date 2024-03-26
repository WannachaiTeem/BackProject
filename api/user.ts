import express, { json } from "express";
import mysql from "mysql";
import { UserGetRequest } from "./model/UserGetRequest";
import { PassReaquest } from "./model/PassRequest";

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
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// router.get("/", (req, res) => {
//     res.send("Get in trip.ts");
//   });



// เช็คlogin
router.get("/checklog", (req, res) => {

    conn.query(
        'select * from User where username like ? AND password like ?',
        [req.query.username, req.query.password],
        (err, result, fields) => {
            if (err) {
                res.status(500).json({ "error": "Internal Server Error" });
                return;
            }

            if(result.length > 0){

                console.log("Success");
                res.status(200).json({"login": "true","result":result[0]});
                console.log(result);
            }else{
                res.status(200).json({"login": "false"});
            }

        }
    );
});

//สมัครสมาชิก
router.post("/addmember", (req, res) => {
    let adduser: UserGetRequest = req.body;
    console.log(adduser)
    let sql =
      "INSERT INTO `User`(`username`,`password`,`name`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
        adduser.username,
        adduser.password,
        adduser.name,
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });

//ค้นหา user ทั้งหมด
router.get("/", (req, res) => {
    conn.query('select * from User', (err, result, fields) => {
        res.json(result);
        console.log('success');
    });
});


//ค้นหา user ทั้งหมดที่ไม่ใช่ Admin
router.get("/Alluser/", (req, res) => {
    conn.query('select * from User where type != 1', (err, result, fields) => {
        res.json(result);
        console.log('success');
    });
});


//ค้นหา user จาก id
router.get("/:id", (req,res) => {
    conn.query("select * from User where UID = ?",
    [req.params.id], (err , result) => {
        if (err) {
            res.status(400).json(err);
        }
        else{
            res.status(200).json(result);
        }
    });
    // res.send('Call GET in trip.ts with ' + req.params.id);
});

//แก้ไขโปรไฟล์จากไอดี
router.put("/:id", (req, res) => {
    let id = +req.params.id;
    let updateuser: UserGetRequest = req.body;
    let sql =
      "update  `User` set `username`=?, `name`=?, `avatar`=? where `UID`=?";
    sql = mysql.format(sql, [
        updateuser.username,
        updateuser.name,
        updateuser.avatar,
        id
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows });
    });
  });





  //แก้ไขรหัสผ่านโปรไฟล์จากไอดี
router.put("/updatepass/:id", (req, res) => {
    console.log(req.body);
    let   reqData : PassReaquest = req.body;
    let id = +req.params.id;
    const oldPass = reqData.originalpassword;
    const newpass = reqData.newpass;
    const pass = reqData.pass;
    
    console.log("dfdfd: "+oldPass);
    console.log("dfdfd: "+newpass);
    console.log("dfdfd: "+id);
    console.log("dfdfd: "+pass);

    //res.json('ddddd');
//     console.log("1111111",newpass)
    let sql2 ="select * from User where `UID`=?";
    sql2 = mysql.format(sql2, [
      id
  ]);
//   console.log("9",sql2)
//   console.log("7777777777777",id)
  conn.query(sql2, (err, result) => {
//     console.log("33",newpass.originalpass)
//     console.log("44",result.password)
{}
if (err){
    res.json("ไม่เจอ") 
    throw err;
} 
else{
    const userGetRequest: UserGetRequest = {
        UID: result[0].UID,
        username: result[0].username,
        password: result[0].password,
        name: result[0].name,
        avatar: result[0].avatar,
        type: result[0].type
    };
    // const resu : UserGetRequest = result[0].body;
    console.log("result1  ",userGetRequest.password);
    // console.log("result",resu.UID);
    if (oldPass === userGetRequest.password) {
        //         console.log("55")
        console.log("33",oldPass + " ==== "+ userGetRequest.password)
        //     console.log("44",result.password)
                let sql =
                      "update  `User` set  `password`=? where `UID`=?";
                    sql = mysql.format(sql, [
                            newpass,
                            id
                        ]);
                        conn.query(sql, (err, result) => {
                              if (err){
                                  res.json("updateERRRR");
                                  throw err;

                              } 
                              res
                                .status(201)
                                .json({ affected_row: result.affectedRows });
                            });
                }
                else{
                    res.json({"Status" : 0}) 
                }
                        
                }
            });

});
                  
            
                    