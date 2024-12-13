const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=2fe336be3244a86cb9176e98a52f60a6'

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

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getWeatherData(input.value);
    input.value = '';
});

const renderData = (data) => {
    output.innerHTML = '';
    const cityName = document.createElement('h1');
    cityName.textContent = data.name;

    const tempC = document.createElement('h3');
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

        favCity.addEventListener('click', () => renderData(fav));

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