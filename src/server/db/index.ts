import * as mysql from 'mysql';
import config from '../config';
import users from './users'
import selector from './selector';

export const Connection=mysql.createConnection(config.mysql);

Connection.connect(err=>{
    if(err) console.log(err);
});

export default{
    users,
    selector
};