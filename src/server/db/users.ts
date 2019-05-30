import { Connection } from './index';


export const all = async () =>{
    return new Promise((resolve, reject)=>{
        Connection.query('SELECT * FROM users', (err, results)=>{
            if(err){
                return reject(err);
            }
            resolve(results);
        });
    });
}

export async function comand(){
    console.log(key);
    return new Promise((resolve, reject)=>{
        Connection.query(key, (err, results)=>{
            if(err){
                return reject(err);
            }
            resolve(results);
        });
    });
}

export default {
    all
}
