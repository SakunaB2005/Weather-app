const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3e7f4fa2d2acaac5669b24165b90e7b1";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data.")
    }

    return await response.json();
}

function displayWeatherInfo(data){
    
    const  {name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;

    card.textContent ="";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const desDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    desDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    desDisplay.classList.add("desDisplay");
    emojiDisplay.classList.add("wheatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desDisplay);
    card.appendChild(emojiDisplay);

}

function getWeatherEmoji(wheatherId){
    
    switch(true){
        case (wheatherId >= 200 && wheatherId < 300) :
            return "⛈";

        case (wheatherId >= 300 && wheatherId < 400) :
            return "🌨";
                
        case (wheatherId >= 500 && wheatherId < 600) :
            return "🌧";

        case (wheatherId >= 600 && wheatherId < 700) :
            return "❄";

        case (wheatherId >= 700 && wheatherId < 800) :
            return "🌫";

        case (wheatherId === 800) :
            return "☀";
        
        case (wheatherId >= 801 && wheatherId < 810) :
            return "☁";
        
        default :
            return "❔";
    }

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add(".errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}