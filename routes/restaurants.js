const express = require('express');

const router = express.Router();

const resData = require('../util/restaurantData');
const uuid = require('uuid');
const fs = require('fs');

//Lista de Restaurantes
router.get('/restaurants', function(req, res){
    
    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', {
         numberOfRestaurants: storedRestaurants.length,
         restaurants: storedRestaurants
        });
});

//Filtrar restaurante por id
router.get('/restaurant/:id', function(req, res){
    const restaurantId = req.params.id;
    // res.render('restaurant-detail', {rid: restaurantId});

    const restaurants = resData.getStoredRestaurants();

    for ( const restaurant of restaurants){
        if (restaurant.id === restaurantId){
            const comments = restaurant.comments;
            res.render('restaurant-detail', {restaurant: restaurant, comments: comments});
        }
    }

    res.status(404).render('404');
});

router.post('/restaurant/:id', function(req, res){
    const restaurantId = req.params.id;
    const storedRestaurants = resData.getStoredRestaurants();

    const comment = req.body.comment

    res.redirect(restaurantId)

    for ( const restaurant of storedRestaurants){
        if (restaurant.id === restaurantId){
            restaurant.comments.push(comment)
            resData.storeRestaurant(storedRestaurants);
        }
    }
});

//Endpoints de recomendação do restaurante
router.get('/recommend', function(req, res){
    res.render('recommend');
});

router.post('/recommend', function(req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRestaurant(storedRestaurants);

    res.redirect('/confirm')
});

router.get('/confirm', function(req, res){
    res.render('confirm');
});


module.exports = router