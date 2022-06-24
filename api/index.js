var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.static('public'));
app.use(cors());

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

//Timestamp Microservice

app.get("/api/:date?", (req, res) => {
    let {date} = req.params;
    if(!date) {
        return res.status(200).json(
            {
                "unix": new Date().getTime(),
                "utc": new Date().toUTCString()
            }
        );
    };

    if(new Date(parseInt(date)).toString() === 'Invalid Date') return res.status(400).json({ error : "Invalid Date" });
    
    let unix, utc
    
    if(date.includes('-') || date.includes(' ')) {
        unix = new Date(date).getTime();
        utc = new Date(date).toUTCString();
    } else {
        unix = new Date(parseInt(date)).getTime();
        utc = new Date(parseInt(date)).toUTCString();
    }

    res.json({unix, utc});
})

module.exports = app;

app.listen(process.env.PORT);