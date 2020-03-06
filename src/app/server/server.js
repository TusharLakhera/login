const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', function(req, res) {
	res.send('Hello from server')
})

app.post('/enroll', function(req, res) {
  console.log(req.body)
  res.status(200).send({"message": "Data received"});
})

app.listen(PORT, function(){
  console.log("Server running on localhost:" + PORT);
});
const mysql = require('mysql');
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'info'

  
});
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});
app.get('/database', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS info'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});
app.get('/createUserInfotable', (req, res) => {
    let sql = 'CREATE TABLE UserInfo(Username VARCHAR(255), password VARCHAR(255),email VARCHAR(255), PRIMARY KEY(email))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('UserInfo table created...');
    });
});

// app.post('/enroll',(req,res)=>{
    
// });
app.post('/enroll',(req,res)=>{
    let sql="INSERT INTO 'UserInfo'('Username','password','confirmpassword','email')"+
    "VALUES('"+req.body.Username+"','"+req.body.password+"','"+req.body.email+"');";
    Connection.query(sql,function(err,result,field){
        if(result!=null){
            res.json({msg:"Inserted"});

        }
        else{
            res.json({msg: "not inserted"});
        }
    })

}
);
