const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose')
const chartDataModel = require('./models/chartData_schema')
let url = 'mongodb://localhost:27017/mongo_pb';

var body_parser= require('body-parser');
app.use(body_parser.json());
app.use(cors());

app.use('/', express.static('public'));

app.get('/budget', (req,res)=>{

    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        chartDataModel.find({})
                    .then((data)=>{
                        res.json(data)
                        mongoose.connection.close()
                    })
                    .catch((connectionError)=>{
                        console.log(connectionError) 
                    });
    })
    .catch((connectionError)=> {
        console.log(connectionError)
    });
});

app.put('/addBudget', (req,res)=>{
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(req.body.title)
        console.log(req.body.budget)
        console.log(req.body.backgroundColor)
        let newChartData = new chartDataModel({
            backgroundColor: req.body.backgroundColor,
            title: req.body.title,
            budget: req.body.budget,
        });
        chartDataModel.insertMany(newChartData)
                        .then((data) => {
                            res.json(data);
                            mongoose.connection.close();
                            console.log("connection closed");
                        })
                        .catch((connectionError) =>{
                            console.log(connectionError)
                        })
    })
    .catch((connectionError) =>{
        console.log(connectionError)
    })



})




app.get('/hello', (req,res) =>{
    res.send('hello world!');
});

app.get('/budget', (req,res) =>{
    res.json(budget);
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
});