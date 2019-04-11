let express = require('express');
let router = express.Router();
const config = require('../config');
const db = require('../db');

router.post('/print', async function (req, res, next) {
    console.warn(req.body);
    let array = [
        [1, req.body.transport.brand, req.body.transport.model],
        [0, req.body.transport2.brand, req.body.transport2.model]
    ];
    await db.q(`insert into transport (type, brand, model) values ?`, [array]);
    return res.json({
        status: 'ok',
        data: [],
        message: 'Ошибка при получении списка транспортных средств'
    })
});
router.get('/list', async function (req, res, next) {
    try {
        let sqlResult = await db.q(`select * from transport order by brand, model, type`, []);
        return res.json({
            status: 'ok',
            data: sqlResult[0]
        })
    } catch (err) {
        console.warn(err);
        return res.json({
            status: 'error',
            data: [],
            message: 'Ошибка при получении списка транспортных средств'
        })
    }
});
router.get('/trainList', async function (req, res, next) {
    try {
        let sqlResult = await db.q(`select * from train order by id`, []);
        return res.json({
            status: 'ok',
            data: sqlResult[0]
        })
    } catch (err) {
        console.warn(err);
        return res.json({
            status: 'error',
            data: [],
            message: 'Ошибка при получении списка транспортных средств'
        })
    }
});

router.get('/info', async function (req, res, next) {
    let transportId = req.query.transport_id;
    try {
        let transport = await db.q(`
            select *
            from transport
            where id = ?
            limit 1
        `, [transportId]);

        transport = transport[0][0];

        return res.json({
            status: 'ok',
            data: {
                transport: transport,
            }
        })
    } catch (err) {
        console.warn(err);
        return res.json({
            status: 'error',
            data: {},
            message: 'Ошибка при получении данных о поезде'
        })
    }
});

router.get('/trainInfo', async function (req, res, next) {
    let trainId = req.query.train_id;
    try {
        let result = await db.q(`
            select axle, norm, axleLength, axleType, truck
            from norm
            where train_id = ?
            order by truck, axle
        `, [trainId]);




        let axleType = [],  axleLength = [], norm = [], truck = [];
        for (let i in result[0]) {
            axleType.push(result[0][i].axleType);
            axleLength.push(result[0][i].axleLength);
            norm.push(result[0][i].norm);
            truck.push(result[0][i].truck);
        }
        let data = {
            // transport: transport,
            axleType: axleType,
            axleLength: axleLength,
            norm: norm,
            truck: truck
        };
        res.json({
            status: 'ok',
            data: data
        })
    } catch (err) {
        console.warn(err);
        return res.json({
            status: 'error',
            data: {},
            message: 'Ошибка при получении данных о поезде'
        })
    }
});

router.post('/saveTrain', async function (req, res, next) {
console.log(req.body);
    try {
        let result = await db.q(`insert into train (name) values (?)`, [req.body.name]);
        let trainId = result[0].insertId;
        let norm = [];
        let n = 1;
        for(let i in req.body.data) {
            let truck = i.match(/\d+/)[0];
            for(let j in req.body.data[i]) {
                norm.push([trainId, n, req.body.data[i][j].norm, req.body.data[i][j].axleLength, req.body.data[i][j].axleType, truck]);
                n++;
            }
        }
        await db.q(`insert into norm (train_id, axle, norm, axleLength, axleType, truck) values ?`, [norm]);
        return res.json({
            status: 'ok',
            data: {}
        })
    } catch (err) {
        return res.json({
            status: 'error',
            data: {},
            message: 'Ошибка при сохранении транспорта'
        })
    }
});
router.post('/save', async function (req, res, next) {
    try {
        await db.q(`insert into transport (type, brand, model) values (?, ?, ?)`, [req.body.type || 0, req.body.brand, req.body.model]);
        return res.json({
            status: 'ok',
            data: {}
        })
    } catch (err) {
        return res.json({
            status: 'error',
            data: {},
            message: 'Ошибка при сохранении транспорта'
        })
    }
});

module.exports = router;
