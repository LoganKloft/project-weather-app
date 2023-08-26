import { forecast, getLastDays } from './weather.js';
import { generateDayUI } from './weather_ui.js';

async function getSevenDay(city) {
    let nextThree = await forecast('london');
    let lastFour = await getLastDays('london', 4);
    let forecasts = [...nextThree, ...lastFour];
    forecasts.sort((forecast1, forecast2) => {
        if (forecast1.date_epoch < forecast2.date_epoch) return -1;
        if (forecast1.date_epoch === forecast2.date_epoch) return 0;
        return 1;
    })
    return forecasts;
}

async function displaySevenDay(city, fahrenheit = true) {
    const container = document.querySelector('#container');

    // reset container
    container.innerHTML = '';

    // OPTIONAL: show loading icons

    // get history + forecast data from the api
    const days = await getSevenDay(city);

    // OPTIONAL: remove loading icons

    // create and append ui elelements
    days.forEach(day => {
        container.appendChild(generateDayUI(day));
    })
}

displaySevenDay('london');