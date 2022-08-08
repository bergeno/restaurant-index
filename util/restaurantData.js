const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..','data', 'restaurants.json');

function getStoredRestaurants(){
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

function storeRestaurant(storedRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
}


module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurant: storeRestaurant
}