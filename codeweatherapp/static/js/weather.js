
// city searched will be kept here 
var city="";
// declare parameters 
var searchCity = $("#search-city");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var visibilityc=$("#visibility");
var pressurec=$("#pressure");

//API key which i got from the open weather api website
var APIKey="33eb2eb27a0fdc17401cfc8812ff05f8";

// Display the curent weather and other parameters when the search button is clicked 
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}
// Here we create the AJAX call
function currentWeather(city){
    // The url which we get from thw website 
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    // get request is being done 
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){

        // parse the response 
        // get the weather icon url so that it will look good to display like cloudy , rainy , sunny etc 
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
       
        var date=new Date(response.dt*1000).toLocaleDateString();
        //parse the response for name of city and concanatig the date and icon.
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        // parse the response to display the current temperature.
        // Convert the temp to fahrenheit

        // converting the temperature from Kelvin to fahrenheit 
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
        // Display the Humidity
        $(currentHumidty).html(response.main.humidity+"%");
        //Display Wind speed and convert to MPH
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");

        
        var visibilityInMeter = response.visibility; 
        $(visibilityc).html(visibilityInMeter+" meter");

        var pressureInMilliBar= response.main.pressure;
        $(pressurec).html(pressureInMilliBar+" MB(MilliBar)");
    });
}





//handler for click , jquery 
$("#search-button").on("click",displayWeather);













