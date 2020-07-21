const spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/vimgg"
);
module.exports.getfullimgs = () => {
    return db.query(`SELECT *  FROM images `);
};
module.exports.addimg = (url, username, title, description) => {
    return db.query(
        `
    INSERT INTO images (url , username , title, description)
    VALUES ($1, $2,$3,$4)
    RETURNING id,url , username , title, description `,
        [url, username, title, description]
    );
};
module.exports.uploadc = (username, comments, id) => {
    console.log("this is my input", username, id, comments);

    return db.query(
        `
    INSERT INTO commenting (comment,username ,img_id)
    VALUES ($1, $2,$3)
    RETURNING comment ,username `,
        [comments, username, id]
    );
};
module.exports.getonerd = (id) => {
    return db.query(
        `SELECT commenting.comment,commenting.username FROM commenting 
         WHERE commenting.img_id =$1`,
        [id]
    );
};
