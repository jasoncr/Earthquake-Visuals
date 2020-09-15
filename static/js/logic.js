// Create intial map object
var myMap = L.map("map", {
  center: [36.77, -119.41],
  zoom: 5
  });

// Adding street map layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Link to the usgs.gov json data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// call the d3.json function
d3.json(url, function(data) {
  // basic style function which will call both the chooseColor and circleRad functions
  function styleInfo(feature) {
    return {
      fillOpacity: 1,
      fillColor: chooseColor(feature.properties.mag),
      color: "black",
      radius: circleRad(feature.properties.mag),
      weight: .5
    };
  };

  // This function adds noticible changes in radius based on magnitude
  // Also if the magnitude is zero this gives it a baseline
  function circleRad(magnitude) {
    if (magnitude === 0) {
      return .5;
    } else {
      return magnitude * 4;
    }
  };

  // This function determines the color of the circle based on the earthquake's magnitude
  function chooseColor(magnitude) {
    if (magnitude >= 5) {
      return "#3e2723";
    } else if (magnitude >= 4) {
      return "#bf360c";
    } else if (magnitude >= 3) {
      return "#e65100";
    } else if (magnitude >= 2) {
      return "#ff6f00";
    } else if (magnitude >= 1) {
      return "#f57f17";
    } else {
      return "#afb42b";
    }
  };
  // Grabbing geoJson data
  L.geoJSON(data, {
    // Adding circle markers to each location based on lat and long
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Using the styleInfo function to style the circles
    style: styleInfo,
    // Adding pop ups to each circle marker
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + 
      new Date(feature.properties.time) + "</p><hr><p><strong>Magnitude: </strong>" + 
      feature.properties.mag + "</p>");
    }
  }).addTo(myMap);

  // Creating Legend
  var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    labels = ['<strong>Magnitude</strong>'],
    categories = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+'];
    for (var i = 0; i < categories.length; i++) {
      div.innerHTML +=
      labels.push(
        '<i class="circle" style="background:' + chooseColor(i) + '"></i> ' +
        (categories[i] ? categories[i] : '+'));
      }
      div.innerHTML = labels.join('<br>');
    return div;
  };
  legend.addTo(myMap);
});