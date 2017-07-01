/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {

    /*----------------------------------------------------*/
    /*	gmaps settings
    ------------------------------------------------------*/

    var map;

    // main directions
    map = new GMaps({
        el: '#map',
        lat: 17.035730,
        lng: 54.145672,
        zoom: 14,
        zoomControl: true,
        zoomControlOpt: { style: 'SMALL', position: 'TOP_LEFT' },
        panControl: false,
        scrollwheel: false
    });

    map.drawOverlay({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
        content: '<i class="fa fa-map-marker"></i>',
        verticalAlign: 'top',
        horizontalAlign: 'center'
    });

    // The styles below present a simplified map. 
    // If you would like to use a normal coloured map, then please remove or comment the code below, from lines 128 to 148.
    var mapStyles = [
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                lightness: 100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }
    ];

    map.setOptions({
        styles: mapStyles
    });

    // map.addMarker({ 
    // lat: map.getCenter().lat(),
    //  lng: map.getCenter().lng(), 
    // title: '5th Avenue',
    //  	infoWindow: { content: '<p>You can add your address 1 here</p>' } 
    // });

});