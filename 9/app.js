var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();
//enter the name of the database in the end 
var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    dbo = database.db("signup");
    console.log("database created successfully");


    app.get('/', function(req, res) {
        return res.redirect('/public/index.html');
    }).listen(3000);

    console.log("Server listening at : 3000");


    app.use('/public', express.static(path.join(__dirname, '/public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));

    // Sign-up function starts here. . .
    app.post('/success', function(req, res) {
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
