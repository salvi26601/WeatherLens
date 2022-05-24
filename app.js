const APIs = {
    weatherKey: "16c618e4dad2979ef4e01d0a51e941ac"
}

const searchInputBox = document.getElementById("input-box");

// Event listener function on keypress
searchInputBox.addEventListener("keypress" , (event) => {

    if(event.keyCode == 13) {                                         //keycode for enter key = 13
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        //getCityPicture(searchInputBox.value);
        document.querySelector(".weather-body").style.display = "block";
    }

});

//Get weather report
function getWeatherReport(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIs.weatherKey}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);

}

//Show weather report
function showWeatherReport(weather) {

    console.log(weather);
    document.getElementById("city").innerText = `${weather.name}`;
    document.getElementById("country").innerText = `${weather.sys.country}`;
    document.getElementById("temperature").innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    document.getElementById("min-temp").innerHTML = `${weather.main.temp_min}&deg;C`;
    document.getElementById("max-temp").innerHTML = `${weather.main.temp_max}&deg;C`;
    document.getElementById("weather-status").innerText = `${weather.weather[0].main}`;
    
    let icon = weather.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    document.getElementById("icon").setAttribute("src", iconurl);

    let date = document.getElementById("date");
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

}

//Date manage
function dateManage(dateArg) {

    let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
    let months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${day} ${month} ${date}, ${year}`;
}