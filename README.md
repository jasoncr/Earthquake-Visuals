# leaflet-challenge

In this challenge I took on the roll of a developer who will visualize a dynamic dataset in geojson format about the most recent earthquakes from the past week. The data was pulled from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php. 

I wanted to visualize the earthquakes on a mapbox map. I wanted each earthquake to be a circle with a radius that is determined by the magnitude. Also I wanted to color code the earthquake markers on a scale of 0-1, 1-2, 2-3, 3-4, 4-5, and 5+. I added popups to each of the markers that display where the earthquake was, the time, and the magnitude. I also included a legend to help the user. 

To complete this task, I used an html to display, a small amount of css to style, and a JavaScript file. The JS file uses mapbox so to run it, you will need a mapbox API. The website is responsive to user input of zooming and dragging the map. Below is an image of the webpage. 
