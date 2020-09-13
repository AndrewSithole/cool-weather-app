import {getTodayWeather} from "./api/weather";
import {getWeekWeather} from "./api/weather";

if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service_worker.js')
        .then(function() { console.log("Service Worker Registered"); });
}
let w = window.innerWidth;
let h = window.innerHeight;
function $(selector){
    return document.querySelectorAll(selector);
}
$('.hero')[0].style.height = h+"px";
if(w<=600)$('.hero')[0].style.height = (h-120)+"px";

function getDay(date){
    date = new Date(date*1000);
    return date.toString().split(' ')[0];
}


function displayData(result, res) {
    let template = ``;

    res.daily.forEach((day, i)=>{
        let dy = getDay(day.dt);
        if(i===7) return false;
        if(i===0){
            template = `
                    <div class="today forecast">
                        <div class="forecast-header">
                            <div class="day">${dy}</div>
                            <div class="date">6 Oct</div>
                        </div> <!-- .forecast-header -->
                        <div class="forecast-content">
                            <div class="location">${result.name}  -- ${res.timezone}</div>
                            <div class="degree">
                                <div class="num"><span class="temperature">${Math.round(res.current.temp)}</span><sup>o</sup>C</div>
                                <div class="forecast-icon">
                                <img src="/images/${day.weather[0].icon}.svg" alt="" width="80">
                                </div>
                            </div>
                            <span><img src="/images/umbrella.svg" alt="" width="30">20%</span>
                            <span><img src="/images/windy.svg" alt="" width="30">${day.wind_speed} m/s</span>
                            <span><img src="/images/compass.svg" alt="" width="30">East</span>
                        </div>
                    </div>                    
                    <div class="responsive_forecast">
`
        }else {
            template += `
                    <div class="forecast">
                        <div class="forecast-header">
                            <div class="degree">${Math.round(day.temp.day)}<sup>o</sup></div>
                        </div> <!-- .forecast-header -->
                        <div class="forecast-content">
                            <div class="forecast-icon">
                                <img src="/images/${day.weather[0].icon}.svg" alt="" width="40">
                            </div>
                            <div class="day">${dy}</div>
                        </div>
                    </div>
                    `;
        }
    });
    template += `</div>`
    $('.forecast-container')[0].innerHTML = template;
}
function getWeather(place){
    console.log("clicked");
        getTodayWeather({city:place, units:'metric'}).then(result => {
            getWeekWeather({lat:result.coord.lat, lon:result.coord.lon, units:'metric'}).then(res => {
                localStorage.setItem('lastFetchedData', JSON.stringify([result, res]));
                displayData(result, res);
            });
        })
}

let lastFetched = localStorage.getItem("lastFetchedData");
if(lastFetched){
    lastFetched = JSON.parse(lastFetched);
    if(lastFetched.length===2){
        console.dir(lastFetched);
        displayData(lastFetched[0], lastFetched[1]);
        getWeather(lastFetched[0].name);
    }
}

const form = document.getElementById('searchLocationForm');
form.addEventListener('submit', function (e){
    e.preventDefault();
    getWeather($('#txt_city')[0].value)
});

