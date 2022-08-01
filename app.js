const path = require('path');
const fs = require('fs');

const express = require('express');

const app = express();
const uuid = require('uuid');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.listen(3030);

// Museu
// function getHtmlFilePath(name){
//     return path.join(__dirname, 'views', name);
// }


app.get('/', function(req, res){
    res.render('index');
});

app.get('/restaurants', function(req, res){
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', {
         numberOfRestaurants: storedRestaurants.length,
         restaurants: storedRestaurants
        });
});

app.get('/restaurant/:id', function(req, res){
    const restaurantId = req.params.id;
    res.render('restaurant-detail', {rid: restaurantId});
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/confirm', function(req, res){
    res.render('confirm');
});

app.get('/recommend', function(req, res){
    res.render('recommend');
});

app.post('/recommend', function(req,res){
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect('/confirm')
});



