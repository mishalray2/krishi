const mysql = require('mysql')
const cors = require('cors');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');

const port = 4000;
var corsOptions = {
    origin: 'http://localhost:4200/login'
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204?
  }
// app.use(cors());

const con = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'root',
    database:'krishi'
});

con.connect(err=>{
    if (err) throw err;
    console.log("Connected!");
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.post('/login',(req, res) => {
    // let password = 'admin123';
    let password = req.body.password;
    let squery = "select username from user_details where password = ?";
    con.query(squery,[password],(err,results)=>{
        if(err) throw err;
        let s = JSON.stringify(results);
        let object = JSON.parse(s);
        var username;
        // res.send(results);
        object.forEach(key => {
            this.username = key.username;
        });
        if(this.username != null) {

            res.send(this.username+',200');
            res.status(200);
        }
        else{
            console.log('check username and passsword');
            res.status(401);
        }
    })
});
app.listen(port, () => {
    console.log(`Server started on port`);
});