const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const data = require('./InitialData')

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student', (res, req) => {
    req.json(data)
})
app.get('/api/student/:id', (req, res) => {
    if (req.params.id > data.length) {
        res.json('invalid id')
    }
    else {
        const sam = data.findIndex(e => e.id == req.params.id)
        let student = data[sam]
        res.json(student)
    }
})
app.post('/api/student', (req, res) => {
    let stdID = data.length + 1
    data.push({
        id: stdID,
        name: req.body.name,
        currentClass: req.body.currentClass,
        division: req.body.division
    })
    res.json(stdID)
    // console.log(data)

})
app.delete("/api/student/:id", (req, res) => {
    if (req.params.id > data.length) {
        res.json('invalid id status' + " " + 404)
    }
    else {
        data.splice(Number(req.params.id) - 1, 1)
        res.json(data)
    }

    // // console.log(Number(req.params.id))
    // // console.log(data)
    // 
})
app.put("/api/student/:id", (req, res) => {
    if (req.params.id > data.length) {
        res.json('invalid id status' + " " + 404)
    }
    else {
        if (req.body.currentClass > 10 || req.body.division.length > 1) {
            res.json("invalid format")
        }
        else {
            let op = data[req.params.id - 1]
            op.name = req.body.name
            op.currentClass = req.body.currentClass
            op.division = req.body.division
            res.json(data)
        }

    }

})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   