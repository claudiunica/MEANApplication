var express = require('express');
var app = express();
const cors = require('cors');
app.use(express.static(__dirname + './app/public'));


var port = 3000;
app.use(cors({
    origin: ['http://localhost:4200', 'http://109.100.42.38:4201', 'http://192.168.8.36:4201', 'http://127.0.0.1:4201'],
    credentials: true,
}));
app.use(function (err, req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');
})

app.use(express.json());
app.use(express.urlencoded());

var employees = require('./controllers/employee.js');
var users = require('./controllers/users.js');


app.use('/employees', employees);
app.use('/users',users);
app.listen(3000, () => { console.log('Server started at 3000') });