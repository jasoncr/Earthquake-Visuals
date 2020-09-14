
//   // Loop through the cities array and create one marker for each city object
//   for (var i = 0; i < countries.length; i++) {
  
//     // Conditionals for countries points
//     var color = "";
//     if (countries[i].points > 200) {
//       color = "yellow";
//     }
//     else if (countries[i].points > 100) {
//       color = "blue";
//     }
//     else if (countries[i].points > 90) {
//       color = "green";
//     }
//     else {
//       color = "red";
//     }
  
//     // Add circles to map
//     L.circle(countries[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: color,
//       // Adjust radius
//       radius: countries[i].points * 1500
//     }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
//   }


////-----------------------------Above is for colors---------------------------


/*
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Perform a GET request to the query URL
d3.json(url, function(data) {
  console.log(data)


  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>" + feature.properties.mag + "</p></hr>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  console.log(earthquakes)
  console.log("test")

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // // Create a baseMaps object to hold the lightmap layer
  var baseMap = {
    "Light Map": lightmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMap = {
    Earthquakes: earthquakes
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [baseMap, overlayMap]
  });

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  // var map = L.map("map", {
  //   center: [36.77, -119.41],
  //   zoom: 5,
  //   layers: [earthquakes]
  // });
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < earthquakes.length; i++) {

    // Conditionals for countries points
    var color = "";
    if (feature.properties.mag[i] >= 2) {
      color = "yellow";
    }
    // else if (countries[i].points < 200) {
    //   color = "blue";
    // }
    // else if (countries[i].points > 90) {
    //   color = "green";
    // }
    else {
      color = "red";
    }

    // Add circles to map
    L.circle(feature.properties.mag[i], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: feature.properties.mag[i] * 150000
    }).bindPopup("<h1>" + feature.properties.mag[i] + "</h1>").addTo(map);
  }
  

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(overlayMap, {
    collapsed: false
  }).addTo(map);
}

*/

var myMap = L.map("map", {
  center: [36.77, -119.41],
  zoom: 5
  });


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url, function(data) {
  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
      mag = feature.properties.mag;
      if (mag > 1) {
        console.log(mag)
      }

      layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + 
      new Date(feature.properties.time) + "</p><hr><p><strong>Magnitude: </strong>" + 
      feature.properties.mag + "</p>");
    }
  }).addTo(myMap);
});



