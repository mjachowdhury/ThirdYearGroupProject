var contactLatitude = 51.8860;
var contactLongitude = -8.5336;

function initialize() 
{
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), 
  {
   zoom: 14,
   center: {lat: contactLatitude, lng: contactLongitude}
  });
  directionsDisplay.setMap(map);
  initAutocomplete();

  var onChangeHandler = function() 
  {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });
  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'DRIVING'
  }, function(response, status) 
  {
    if (status === 'OK') 
    {
      directionsDisplay.setDirections(response);
      document.getElementById('notice').innerHTML = '';
    } 
    else 
    {
      //window.alert('Directions request failed due to ' + status);
      document.getElementById('notice').innerHTML = 'Directions request failed due to ' + status;
    }
  });
}

function computeTotalDistance(result) 
{
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) 
  {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  var dist = document.getElementById('total').innerHTML = total + ' km';
  dbRef = firebase.database().ref('test/')
  dbRef.update
  ({
    "distanceTest" : dist
  })
}

// Auto complete related variables
var placeSearch, autocomplete;

var componentForm = 
{
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
};

function initAutocomplete() 
{
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
  /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
  {types: ['geocode']});
  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() 
{
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

	for (var component in componentForm) 
	{
     	document.getElementById(component).value = '';
   		document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
	for (var i = 0; i < place.address_components.length; i++) 
	{
     	var addressType = place.address_components[i].types[0];
			if (componentForm[addressType]) 
			{
          var val = place.address_components[i][componentForm[addressType]];
          document.getElementById(addressType).value = val;
     	}
  }
}

google.maps.event.addDomListener(window, 'load', initialize);