export const table = [
    {
        tableName : 'user',
        tableItems : [
            {
                itemName : 'userId',
                itemType : 'INT',
                itemLength : 200,
                isPrimaryKey : true,
                isAutoIncrement : true
            },
            {
                itemName : 'userName',
                itemType : 'VARCHAR',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            {
                itemName : 'email',
                itemType : 'VARCHAR',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            {
                itemName : 'gender',
                itemType : 'VARCHAR',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            {
                itemName : 'phone',
                itemType : 'VARCHAR',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            {
                itemName : 'password',
                itemType : 'VARCHAR',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            {
                itemName : 'status',
                itemType : 'ENUM',
                options : ['pending' , 'active' , 'deactivated'],
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            {
                itemName : 'date',
                itemType : 'DATE',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },

        ]
    },
    {
        tableName : 'user_session',
        tableItems : [
            {
                itemName : 'sessionId',
                itemType : 'INT',
                itemLength : 200,
                isPrimaryKey : true,
                isAutoIncrement : true
            },
            {
                itemName : 'userId',
                itemType : 'INT',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            {
                itemName : 'userSession',
                itemType : 'VARCHAR',
                itemLength : 200,
                isPrimaryKey : false,
                isAutoIncrement : false,
                isNull : false
            },
            
        ]
    }
]