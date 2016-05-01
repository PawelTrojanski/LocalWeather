var tempUnit = 'metric';

function getWeatherForPosition(position) {
	$.get('http://api.openweathermap.org/data/2.5/weather?APPID=72cd9e72c32c775f68beaba69e19e23a&units=' + tempUnit + '&lang=pl&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, '', function(response){
		parseWeather(response);
	});
}

function parseWeather(data) {
	var city = data.name;
	var country = data.sys.country;
	var temp = Math.round(data.main.temp);
	var desc = data.weather[0].description;

	$('#desc').html(desc);
	$('#icon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
	$('#city').html(city);
	$('#country').html(country);
	$('#temp').html(temp);
}

function getWeather(unit) {
	tempUnit = (unit == 'celc' ? 'metric' : 'imperial');
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeatherForPosition);
	}else {
		$('#desc').html('Geolocation is not supported by this browser, sorry.');
	}
}

function toggleUnit() {
	if(tempUnit == 'metric') {
		getWeather('fahr');
		$('#temp').addClass('fahr');
	}else {
		getWeather('celc');
		$('#temp').removeClass('fahr');
	}
}

$(document).ready(function(){
	getWeather('celc');
});
