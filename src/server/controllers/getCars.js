const dbConnection = require('../../database/db_connection')

let getCars = ( cb ) => {
  dbConnection.query('SELECT * FROM CARS WHERE type, price, manufacturer' )
}
