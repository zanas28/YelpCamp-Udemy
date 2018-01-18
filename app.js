var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/yelp_camp');

// let grab us body from the form method POST
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.set('view engine', 'ejs');

//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    // Get all Campgrounds from DB
    Campground.find({}, (err, camps) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: camps});
            // res.json(camps);
        }
    })
});

app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampgrounds = {name: name, image: image, description: description};
    
    Campground.create(newCampgrounds, (err, camps) => {
        if (err) {
            console.log(err);
        } else {
            // redirect to campgrounds page
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

// SHOW DETAILS INFO
app.get('/campgrounds/:id', (req, res) => {
    //find campgrounds based on id
    Campground.findById(req.params.id, (err, foundCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            //render show template
            res.render('show', {campgrounds: foundCampgrounds});
        }
    })
})

app.listen(3000, () => {
    console.log('The Server has been running in localhost:3000');
});