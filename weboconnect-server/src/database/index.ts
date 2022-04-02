import mysql from 'mysql'

export const connection = mysql.createPool({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'weboconnect',
})

