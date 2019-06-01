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

router.get('/api/selector', async (req, res) => {
    try {
        const {
            query
        } = req;
        let selectedData = await DB.selector.comand(query);
        res.json({ TOP: selectedData });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

export default router;