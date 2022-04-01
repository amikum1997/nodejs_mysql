
import query from "./dbHelper"

export const initializeDB = () => {
    query('show tables;',{}, (err:any , row:any)=>{
        if(err){
            return err
        }
        if(row.length === 0){
            console.log('Initializing Database');
        }
    })
}