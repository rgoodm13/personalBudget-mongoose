const mongoose = require('mongoose')
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

const chartDataSchema = new mongoose.Schema({
    backgroundColor: {
        type: String,
        max: 6,
        validator: [colorValidator,'Invalid Color'],
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    },
    budget: {
        type: Number,
        trim: true,
        required: true,
    }
},
{collection: 'chartData'})

module.exports = mongoose.model('chartData', chartDataSchema)