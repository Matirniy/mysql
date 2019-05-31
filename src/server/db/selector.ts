import { Connection } from './index';

export async function comand(query){
    return new Promise((resolve, reject)=>{
        Connection.query(query.selection, (err, results)=>{
            if(err){
                return reject(err);
            }
            resolve(results);
        });
    });
}

export default {
    comand
}
