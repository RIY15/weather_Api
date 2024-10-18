
const weatherForm = document.querySelector('#weatherForm') 
const cityInput = document.getElementById('inputValue')
const card = document.querySelector('.card')
const apiKey = "66e22ec7582b5333b8a020481951c181"

weatherForm.addEventListener("submit",async  event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){

        try{

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)

        }catch(err){
            console.error(err);
            displayError(err);
        }
        
    }else {

        displayError("please Enter The City");

    }

});

async function  getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response =  await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("could not fetch weather Data")
    }

    return await response.json();

}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
    tempDisplay.classList.add("tempDisplay")
    card.appendChild(tempDisplay)

    humidityDisplay.textContent = `humidity: ${humidity}%`
    humidityDisplay.classList.add("humidityDisplay")
    card.appendChild(humidityDisplay)

    descDisplay.textContent = description
    descDisplay.classList.add("descDisplay")
    card.appendChild(descDisplay)

    weatherEmoji.textContent = getWeatherEmoji(id)
    weatherEmoji.classList.add("weatherEmoji")
    card.appendChild(weatherEmoji)

    // tempDisplay.textContent = main.temp;

}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"
        case (weatherId >= 700 && weatherId < 800):
            return "💨"
        case (weatherId === 800):
            return "☀️"
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"
        default:
            return "❓"
    }

}

function displayError(message){

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";  
    card.style.display = "flex"
    card.appendChild(errorDisplay)

}