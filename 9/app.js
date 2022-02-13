var express = require("express");
var path = require("path");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/";
var app = express();
MongoClient.connect(url, (err, database) => {
    if (err) throw err;
    var dbo = database.db("signup");
    console.log("created db");
    app.get("/", (req, res) => {
        return res.redirect("/public/index.html");
    }).listen(3000);
    console.log("port 3000 is created");
    app.use("/public", express.static(path.join(__dirname , "/public")));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post("/success", (req, res) => {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var phone = req.body.phone;


        var data = {
            "name": name,
            "email": email,
            "password": password,
            "phone": phone
        }

        //CREATING A COLLECTION IN MONGODB USING NODE.JS
        dbo.collection("details").insertOne(data, (err, collection) => {
            if (err) throw err;
            console.log("Record inserted successfully");
            console.log(collection);
            database.close();
        });
        console.log("DATA is " + JSON.stringify(data));
        return res.redirect('/public/success.html');

    });

});
