const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=2fe336be3244a86cb9176e98a52f60a6'
const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q='

const form = document.querySelector('.search')
const input = document.querySelector('.inp')
const output = document.querySelector('.output')
const favButton = document.querySelector('.show-favorites-btn')
const favoritesContainer = document.querySelector('.favorites')

let favorites = JSON.parse(localStorage.getItem('favorites')) || []

const renderLoading = () => {
    output.innerHTML = '';
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = `
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    output.append(spinner);
};

const getWeatherData = async (cityName) => {
    try {
        renderLoading();

        const url = API + cityName + apiKey
        const request = await fetch(url);

        if (!request.ok) {
            throw new Error('City not found');
        }

        const response = await request.json();
        renderData(response);
    } catch (error) {
        renderError(error.message);
    }
};


const getForecastData = async (cityName) => {
    try {
        const url = forecastAPI + cityName + apiKey;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found for forecast');
        }

        const data = await response.json();
        renderForecast(data);
    } catch (error) {
        output.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
};


form.addEventListener('submit', (event) => {
    event.preventDefault();
    getWeatherData(input.value);
    getForecastData(input.value);
    input.value = '';
});


const renderData = (data) => {
    output.innerHTML = '';
    const cityName = document.createElement('h1');
    cityName.textContent = data.name;

    const tempC = document.createElement('h2');
    tempC.textContent = `${Math.floor(data.main.temp - 273.15)}°C`;

    const weatherCondition = document.createElement('h3');
    weatherCondition.textContent = ` ${data.weather[0].main}`;

    const humidity = document.createElement('h5');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const windSpeed = document.createElement('h5');
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].main;

    const isCityInFavorites = favorites.some(fav => fav.name === data.name);

    const favoriteButton = document.createElement('button');
    favoriteButton.className = 'favourites_btn'
    favoriteButton.textContent = isCityInFavorites ? 'Remove from Favorites' : 'Add to Favorites';

    favoriteButton.addEventListener('click', () => {
        if (favoriteButton.textContent === 'Add to Favorites') {
            addToFavorites(data, favoriteButton);
        } else {
            removeFromFavorites(data, favoriteButton);
        }
    });

    output.append(cityName, tempC, weatherCondition, humidity, windSpeed, weatherIcon, favoriteButton);
};


const renderForecast = (data) => {
    const dailyData = {};
    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(' ')[0];
        if (!dailyData[date]) {
            dailyData[date] = [];
        }
        dailyData[date].push(entry);
    });

    const labels = Object.keys(dailyData);
    const temperatures = labels.map((date) =>
        Math.floor(
            dailyData[date].reduce((sum, item) => sum + (item.main.temp - 273.15), 0) /
            dailyData[date].length
        )
    );
    renderForecastChart(labels, temperatures);
};


const renderForecastChart = (labels, temperatures) => {
    const chartContainer = document.createElement('canvas');
    chartContainer.id = 'forecastChart';
    output.append(chartContainer);

    new Chart(chartContainer, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.raw}°C`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
            },
        },
    });
};


const renderError = (message) => {
    output.innerHTML = '';

    const errorMessage = document.createElement('h3');
    errorMessage.style.color = 'red';
    errorMessage.textContent = `${message}`;

    output.append(errorMessage);
};

const addToFavorites = (city, button) => {
    if (!favorites.some(fav => fav.name === city.name)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        button.textContent = 'Remove from Favorites';
        renderFavorites();
    }
};

const removeFromFavorites = (city, button) => {
    favorites = favorites.filter(fav => fav.name !== city.name);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    button.textContent = 'Add to Favorites';
    renderFavorites();
};

const renderFavorites = () => {
    favoritesContainer.innerHTML = '';
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorite cities added.</p>';
        return;
    }

    favorites.forEach(fav => {
        const favCity = document.createElement('div');
        favCity.className = 'fav-city';
        favCity.innerHTML = `
            <h4>${fav.name}</h4>
        `;

        favCity.addEventListener('click', () => {
            renderData(fav);
            getForecastData(fav.name);
        });

        favoritesContainer.append(favCity);
    });
};


const toggleFavorites = () => {
    favoritesContainer.classList.toggle('show');
    if (favoritesContainer.classList.contains('show')) {
        favButton.textContent = 'Hide Favorites';
    } else {
        favButton.textContent = 'Show Favorites';
    }
};


favButton.addEventListener('click', toggleFavorites);

renderFavorites();


const weatherWidget = document.querySelector('.weather-widget');

const renderWidgetWeather = (data) => {
    weatherWidget.innerHTML = `
        <h4>${data.name}</h4>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].main}">
        <p>${Math.floor(data.main.temp - 273.15)}°C</p>
        <p>${data.weather[0].main}</p>
    `;
};

const getWeatherByLocation = async ({ lat, lon }) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Unable to retrieve weather data.');
        }

        const data = await response.json();
        renderWidgetWeather(data);
    } catch (error) {
        weatherWidget.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
};

const initializeWidget = () => {
    const success = (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation({ lat: latitude, lon: longitude });
    };

    const error = () => {
        weatherWidget.innerHTML = `<p style="color: red;">Location access denied.</p>`;
    };

    navigator.geolocation.getCurrentPosition(success, error);
};

initializeWidget();