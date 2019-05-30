import * as express from 'express';

import DB from './db';

const router = express.Router();


router.get('/api/users', async (req, res) => {
    try {
        let website = await DB.users.all();
        res.json(website);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }

})

router.get('/api/search', async (req, res) => {
    try {
        let website = await DB.users.comand();
        res.json(website);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }

})
export default router;