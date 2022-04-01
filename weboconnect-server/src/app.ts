import { initializeDB } from './database/dbInitializer';
import app from "./config/express";
import { connection } from "./database";
// SQL CONNECTION

connection.getConnection(function (err, conn) {
    if (err) {
        return err
    }
    if (conn) {
        conn.query('USE ' + process.env.SQL_DATABASE, function () {
            conn.release();
        });
        initializeDB()
        console.log('Connection Established');
    }
});


// SERVER 
app.listen(process.env.PORT,
    () => console.log(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`)
);

