var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// let grab us body of the form
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

let campgrounds = [
    {name: 'Green Hill', image: 'https://farm5.staticflickr.com/4079/4805487492_618e66b63b.jpg'},
    {name: 'Sapudi Island', image: 'https://farm9.staticflickr.com/8311/8021906474_d68de19953.jpg'},
    {name: 'Raas Island', image: 'https://farm5.staticflickr.com/4134/4901707346_ec6b7d676a.jpg'}
]

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, () => {
    console.log('The Server has been running in localhost:3000');
});