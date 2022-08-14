//Importação de módulos externos
const path = require('path');


const express = require('express');

const app = express();

//Importação Funções de fileRead e writeFile
const defaultRoutes =   require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

let port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

app.listen(port);

// Museu
// function getHtmlFilePath(name){
//     return path.join(__dirname, 'views', name);
// }


app.get('/confirm', function(req, res){
    res.render('confirm');
});



app.use(function(req, res){
    res.status(404).render('404');
});

app.use(function(error, req, res, next){
    res.status(500).render('500');
});




