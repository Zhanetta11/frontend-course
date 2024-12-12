const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=2fe336be3244a86cb9176e98a52f60a6'

const form = document.querySelector('.search')
const input = document.querySelector('.inp')
const output = document.querySelector('.output')

const getWeatherData = async () => {
    const url = API + input.value + apiKey
    const request = await fetch(url)
    const response = await request.json()
    renderData(response);
    input.value = ''
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeatherData()

})

const renderData = (data) => {
    console.log(data);
    output.innerHTML = ''
    const cityName = document.createElement('h1')
    cityName.textContent = data.name

    const tempC = document.createElement('h3')
    tempC.textContent = `Temperature: ${Math.floor(data.main.temp - 273.15)}`

    const weatherCondition = document.createElement('h4')
    weatherCondition.textContent = `Weather Condition: ${data.weather[0].main}`;

    const humidity = document.createElement('h5');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const windSpeed = document.createElement('h5');
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].main;

    output.append(cityName, tempC, weatherCondition, humidity, windSpeed, weatherIcon)
}