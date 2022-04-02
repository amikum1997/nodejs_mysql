import { connection } from ".";

// Returns a connection to the db
var getConnection = function(callback : any) {
    connection.getConnection(function(err:any, conn:any) {
    callback(err, conn);
  });
};

// Helper function for querying the db; releases the db connection
// callback(err, rows)
var query = function(queryString:string, params:any, callback:any) {
  getConnection(function(err:any, conn:any) {
    if (err)
      return callback(err);
    conn.query(queryString, params, function(err:any, rows:any) {
      conn.release();

      if (err)
        return callback(err);

      return callback(err, rows);
    });
  });
};

// function to keep the connection to the database up
var keepAlive = function() {
  getConnection(function(err:any, conn:any) {
    if (err)
      return;

    conn.ping();
    conn.release();
  });
};

// Set up a keepalive
setInterval(keepAlive, 30000);

export default query;