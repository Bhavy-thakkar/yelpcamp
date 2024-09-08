maplibregl.config.apiKey = mapTiler;
const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets/style.json?key=${mapTiler}`,
    center: campground.geometry.coordinates,
    zoom: 10
});

map.addControl(new maplibregl.NavigationControl());

// Add a scale control to the map.
map.addControl(new maplibregl.ScaleControl());

// Add a fullscreen control to the map.
map.addControl(new maplibregl.FullscreenControl());

// Add geolocation control to the map.
map.addControl(new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: false
}));

const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
}).setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`) 
  
const marker = new maplibregl.Marker()
    .setLngLat(campground.geometry.coordinates) 
    .addTo(map);

marker.getElement().addEventListener('mouseenter', () => {
    popup.addTo(map);
    popup.setLngLat(marker.getLngLat());
});
  
marker.getElement().addEventListener('mouseleave', () => {
    popup.remove();
});


  