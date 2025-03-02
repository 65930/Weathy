// script.js
const api_key = '0588c58c78d3f3b99489e0abf4b5aeeb';
// const api_key = process.env.OPEN_API_KEY;

// Function to fetch weather data
function fetchWeatherData() {
    const city = document.getElementById('city-input').value;


    if (!city) {
        alert('Please enter a city');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            displayCountryTime(data);
        })
        .catch(error => console.error('Error fetching weather data:', error)); 
} 
// Function to display weather data
function displayWeatherData(data) {
    // Weather information
    const cityName = data.name;
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const weatherCondition = data.weather[0].main.toLowerCase();

    // Display city name and weather description
    document.getElementById('city-name').textContent = `Weather in ${cityName}`;
    document.getElementById('weather-description').textContent = weatherDescription;
    document.getElementById('temp-value').textContent = `${temperature}°C`;

    // Set the appropriate weather icon based on the condition
    const weatherImages = {
        clear: 'images/sunny.png', // Sunny icon
        clouds: 'images/cloudy.png', // Cloudy icon
        rain: 'images/rainy.png', // Rainy icon
        thunderstorm: 'images/thunderstorm.png', // Thunderstorm icon
        snow: 'images/snowy.png', // Snowy icon
        default: 'images/default.png' // Default icon if no match
    };

    // Choose the correct weather icon
    const iconPath = weatherImages[weatherCondition] || weatherImages.default;
    document.getElementById('weather-icon').src = iconPath;
}

// Function to display country time and date based on the timezone offset
function displayCountryTime(data) {
    const timezoneOffset = data.timezone; // Timezone offset in seconds from UTC
    const currentTime = new Date(new Date().getTime() + timezoneOffset * 1000);

    // Format the time and date
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const countryTime = currentTime.toLocaleTimeString([], timeOptions);
    const countryDate = currentTime.toLocaleDateString([], dateOptions);

    // Display the time and date
    document.getElementById('country-time').textContent = `Current Time: ${countryTime}`;
    document.getElementById('country-date').textContent = `Date: ${countryDate}`;
}


