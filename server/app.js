const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { Report_Product, Store, Product, Store_Account, Store_Area, Product_Brand } = require('./models');
const { Op, Sequelize } = require("sequelize");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        console.log('in Server')
        let { area, dateFrom, dateTo } = req.query;
        console.log(area, dateFrom, dateTo)
        area = area.split(',');
        dateTo = new Date(dateTo);
        console.log(area)
        let objArr = [];
        let dynamicConditions = [];
        for (let i = 0; i < area.length; i++) {
            dynamicConditions.push({
                [Op.or]: [{ area_id: +area[i] }],
            });
        }
        if (dynamicConditions.length) {
            objArr.push({
                [Op.or]: dynamicConditions
            });
        }
        let reportProduct = await Report_Product.findAll({
            // attributes: [['Store.Store_Area.area_name', 'areaName'], [( (Sequelize.fn('count', Sequelize.col('itemId'))) / (Sequelize.fn('count', Sequelize.col('itemId'))) * 100 ), 'Nilai']],
            // group: ['Store.Store_Area.area_name'],
            where: {
                tanggal: {
                    [Op.between]: [dateFrom, dateTo]
                }
            },
            include: [
                { model: Store, where: { [Op.and]: objArr }, include: [Store_Account, Store_Area] },
                { model: Product, include: [Product_Brand] }
            ]
        });
        res.status(200).json(reportProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})