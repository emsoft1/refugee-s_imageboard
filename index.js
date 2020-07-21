const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const conf = require("./config.json");
app.use(express.static("public"));
app.use(express.json());
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.get("/cities", (req, res) => {
    db.getfullimgs()
        .then((resimg) => {
            //  console.log(resimg.rows);
            res.json(resimg.rows);
        })
        .catch((err) => {
            console.log(err);
        });
    // const cities = [
    //     {
    //         name: "BErlin",
    //         con: "germany",
    //     },
    //     {
    //         name: "tehran",
    //         con: "iran",
    //     },
    //     {
    //         name: "londen",
    //         con: "en",
    //     },
    // ];

    // res.json(cities);
});

app.get("/images", (req, res) => {});
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("regfile ", req.file);
    console.log("req.body ", req.body);
    if (req.file) {
        let url = conf.s3Url + req.file.filename;
        db.addimg(url, req.body.username, req.body.title, req.body.dis)
            .then((dbreturn) => {
                //   console.log("db return", dbreturn.rows);
                res.json(dbreturn.rows);
                // res.json({ success: true });
            })
            .catch((err) => {
                console.log("db erroor", err);
            });
    } else {
        res.json({ success: false });
    }
});
app.post("/onerd", (req, res) => {
    // console.log("regfile ", req.myCar);
    // console.log("req.body ", req.body);

    db.getonerd(req.body.myid)
        .then((dbreturn) => {
            console.log("db return", dbreturn.rows);
            res.json(dbreturn.rows);
            // res.json({ success: true });
        })
        .catch((err) => {
            console.log("db erroor", err);
        });
});
app.post("/cupload", (req, res) => {
    console.log("regfile ", req.myCar);
    console.log("req.body ", req.body);
    // res.json({ success: true });
    db.uploadc(req.body.username, req.body.comments, req.body.id)
        .then((dbreturn) => {
            console.log("db return", dbreturn.rows);

            res.json(dbreturn.rows);
            // res.json({ success: true });
        })
        .catch((err) => {
            console.log("db erroor", err);
        });
});
app.listen(8080, () => console.log("i am up"));
