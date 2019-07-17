const mysql = require("mysql");
const config = require("./config");
let db = mysql.createConnection(config);


// While deploying the app with clearDb in heroku, connection to mysql is disconnected continuously so codes below is the solution.
function handleDisconnect() {
    console.log('1. connecting to db:');
    db = mysql.createConnection(config);                         // Recreate the connection, since
										                         // the old one cannot be reused.

    db.connect((err) => {              	                         // The server is either down
        if (err) {                                               // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000);                  // Give it a dealy before attempting to reconnect,
        }                                     	                 // to avoid a hot loop, and to allow our node script to
    });                                     	                 // process asynchronous requests in the meantime.
    											                 // If you're also serving http, display a 503 error.
    db.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	         // Connection to the MySQL server is usually
            handleDisconnect();                      	         // lost due to either server restart, or a
        } else {                                                 // connnection idle timeout (the wait_timeout
            throw err;                                           // server variable configures this)
        }
    });
}

handleDisconnect();


module.exports = db;
