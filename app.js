//Importação de módulos externos
const path = require('path');
const fs = require('fs');

const express = require('express');

const app = express();
const uuid = require('uuid');

//Importação Funções de fileRead e writeFile
const resData = require('./util/restaurantData');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.listen(3000);

// Museu
// function getHtmlFilePath(name){
//     return path.join(__dirname, 'views', name);
// }



app.get('/', function(req, res){
    res.render('index');
});


//Lista de Restaurantes
app.get('/restaurants', function(req, res){
    
    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', {
         numberOfRestaurants: storedRestaurants.length,
         restaurants: storedRestaurants
        });
});

//Filtrar restaurante por id
app.get('/restaurant/:id', function(req, res){
    const restaurantId = req.params.id;
    // res.render('restaurant-detail', {rid: restaurantId});

    const restaurants = resData.getStoredRestaurants();

    for ( const restaurant of restaurants){
        if (restaurant.id === restaurantId){
            res.render('restaurant-detail', {restaurant: restaurant});
        }
    }

    res.status(404).render('404');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/confirm', function(req, res){
    res.render('confirm');
});

//Endpoints de recomendação do restaurante
app.get('/recommend', function(req, res){
    res.render('recommend');
});

app.post('/recommend', function(req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRestaurant(storedRestaurants);

    res.redirect('/confirm')
});


app.use(function(req, res){
    res.status(404).render('404');
});

app.use(function(error, req, res, next){
    res.status(500).render('500');
});


