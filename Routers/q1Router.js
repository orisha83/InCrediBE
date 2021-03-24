const express = require('express');
const router = express.Router();
const q1BL = require('../BL/BL')

router.route('/')
    .get( async function(req,resp)
    {
        let q1Data = await q1BL.getq1ResData()
        console.log("router")
        console.log(q1Data)
        return resp.json(q1Data);
    })


router.route('/')
    .get( async function(req,resp)
    {
        let q1Data = await q1BL.getq2InitData()
        console.log("router")
        console.log(q1Data)
        return resp.json(q1Data);
    })    

    module.exports = router;