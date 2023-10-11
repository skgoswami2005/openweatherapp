const apiKey = "120f26457a5cb4d216eb6ff9f368808a";
let symbol = document.getElementById('symbol');

function convertTemperature(unit, tempInCelsius) {
    const tempValueElement = document.getElementById('currentTempValue');
    const tempUnitElement = document.getElementById('currentTempUnit');
    
    if (unit === 'F') {
        tempValueElement.innerText = (tempInCelsius * 9/5 + 32).toFixed(2);
        tempUnitElement.innerText = "°F";
    } else {
        tempValueElement.innerText = tempInCelsius;
        tempUnitElement.innerText = "°C";
    }
}



function fetchWeather() {
    const location = document.getElementById("location").value.trim();
    if (location === '') {
        alert("Please enter a location.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }
        return response.json();
    })
    .then(data => {
        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Current Temperature: <span id="currentTempValue">${data.main.temp}</span><span id="currentTempUnit">°C</span> 
            <button class="btn btn-primary" type="button" onclick="convertTemperature('C', ${data.main.temp})">°C</button>
            <button class="btn btn-primary" type="button" onclick="convertTemperature('F', ${data.main.temp})">°F</button></p>
            <p>Min Temperature: ${data.main.temp_min}°C</p>
            <p>Max Temperature: ${data.main.temp_max}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("weatherData").innerHTML = weatherHTML;
    })
    .catch(error => {
        alert(error.message);
    });
}

// Handle the "Enter" key press for the location input
document.getElementById("location").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        fetchWeather();
    }
});
