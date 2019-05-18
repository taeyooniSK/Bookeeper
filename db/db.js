const mysql = require("mysql");
const config = require("./config");
const connection = mysql.createConnection(config);

connection.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("DB is connected..");
    }

    
});



module.exports = connection;