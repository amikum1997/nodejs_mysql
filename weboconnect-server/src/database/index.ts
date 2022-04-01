import mysql from 'mysql'

export const connection = mysql.createPool({
    'host': 'localhost',
    'user': 'amit',
    'password': 'Amikum@123',
    'database': 'weboconnect',
})

