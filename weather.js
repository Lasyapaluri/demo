
// JSPage.js
//const apiKey = '06d20636d699a370c5981990cc2a1e1b';
const apiKey="88fb5329bf11e277242f84a183872b70"
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const weatherChartCanvas = document.getElementById('weather-chart');

// Event listener for form submission
locationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

// Fetch weather data from API
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            displayChart(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Display error message to the user
            weatherInfo.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching weather data. Please try again.</div>';
            weatherInfo.style.display = 'block';
        });
}

// Display weather information
function displayWeather(data) {
    weatherInfo.innerHTML = `
        <div class="weather-info">
            <h2>${data.name}</h2>
            <p>Temperature: ${Math.round(data.main.temp)}°C</p>
            <p>Description: ${data.weather[0].description}</p>
        </div>`;
    weatherInfo.style.display = 'block';
}

// Display weather chart
function displayChart(data) {
    const weatherChartCtx = weatherChartCanvas.getContext('2d');

    const weatherChart = new Chart(weatherChartCtx, {
        type: 'bar',
        data: {
            labels: ['Temperature', 'Humidity', 'Pressure'],
            datasets: [{
                label: 'Weather Information',
                data: [
                    data.main.temp,
                    data.main.humidity,
                    data.main.pressure
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}