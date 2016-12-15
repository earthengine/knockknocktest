'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

var fib = function(n){
    if(n===1) return 1;
    else if(n==2) return 1;
    return fib(n-1) + fib(n-2);
}

var checkint = function(res, n){
    if(n!=parseInt(n))
        res.status(400).json(new {message:"The request is invalid."});
}

app.get('/api/Fibonacci', (req, res) => {
    var n = req.query.n
    checkint(res, n);
    res.status(200).send("" + fib(parseInt(n)));
});

var revWords = function(ws){
    var result = [];
    for(var i=0;i<ws.length;++i)
        result[i] = ws[i].split("").reverse().join("");
    return result.join(" ");
}

app.get('/api/ReverseWords', (req, res) => {
    var s = req.query.sentance;
    var ws = s.split(" ");
    res.status(200).send(revWords(ws));
});

app.get('/api/Token', (req, res) => {
    res.status(200).send("\"bdaf1bbc-ae9e-490b-850a-8bb71fd76964\"");
});

var TriangleTypes = [
    "Error",
    "Eqialateral",
    "Isosceles",
    "Scalene",    
]

var triType = function(a,b,c){
    if(a>b){var r=a;a=b;b=r;}
    if(a>c){var r=a;a=c;c=r;}
    if(b>c){var r=b;b=c;c=r;}
    if(a+b<=c) return "Error";
    if(a==b&&b==c&&c==a) return "Eqialateral";
    if(a==c||b==c||c==a) return "Isosceles";
    return "Scalene";
}

app.get('/api/TriangleType', (req, res) => {
    var a = req.query.a;
    checkint(res, a);
    var b = req.query.b;
    checkint(res, b);
    var c = req.query.c;
    checkint(res, c);
    res.status(200).send(triType(parseInt(a),parseInt(b),parseInt(c)));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
