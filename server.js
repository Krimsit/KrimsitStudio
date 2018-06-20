const nodemailer = require('nodemailer');
const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');

var app = express();
var port = Number(process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
    res.render('index');
    console.log('Nodemailer reading console log...' + req.url);
});


app.post('/send', function(req, res){
    if(req.body.email == "" || req.body.name == ""){
        res.send('Error: Email & Name не заполнены!');
        return false;
    }
    
    let transporter = nodemailer.createTransport({
        service: 'Yandex.ru',
        port: 465,
        secure: false,
        auth: {
            user: 'KrimsitDjenkis@yandex.ru',
            pass: 'ituj55hfll'
        }
    });

    let mailOptions = {
        from: 'KrimsitDjenkis@yandex.ru',
        to: req.body.email,
        subject: req.body.name,
        text: 'Hello world!',
        html: req.body.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
});

var server = http.createServer(app).listen(port, function(){
    console.log('Server Running on' + port);
});