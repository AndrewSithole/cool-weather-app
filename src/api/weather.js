import 'whatwg-fetch'

export function getTodayWeather(options) {
    return get(`https://api.openweathermap.org/data/2.5/weather?q=${options.city}&units=${options.units}&appid=f16b5b11d45fae7731e545ca034d3b44`);
}

export function getWeekWeather(options) {
    return get(`https://api.openweathermap.org/data/2.5/onecall?lat=${options.lat}&lon=${options.lon}&
exclude=minutely,hourly&units=${options.units}&appid=f16b5b11d45fae7731e545ca034d3b44`);
}

function get(url) {
    return fetch(url)
        .then(onSuccess,onError)
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    return console.log(error);
}
