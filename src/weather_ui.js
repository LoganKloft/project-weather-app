var DAY_MAPPING_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export function generateDayUI(forecast, fahrenheit = true) {
    const day = DAY_MAPPING_SHORT[(new Date(forecast.date_epoch * 1000)).getDay()];
    const low = fahrenheit === true ? forecast.day.mintemp_f : forecast.day.mintemp_c;
    const high = fahrenheit === true ? forecast.day.maxtemp_f : forecast.day.maxtemp_f;
    const avg = fahrenheit === true ? forecast.day.avgtemp_f : forecast.day.avgtemp_c;
    const url = forecast.day.condition.icon;
    const condition = forecast.day.condition.text;

    const dayContainer = document.createElement('div');

    const dayText = document.createElement('p');
    dayText.innerText = day;

    const img = document.createElement('img');
    img.src = url;

    const conditionText = document.createElement('p');
    conditionText.innerText = condition;

    const temperatureContainer = document.createElement('div');
    const lowText = document.createElement('p');
    lowText.innerText = low;
    const avgText = document.createElement('p');
    avgText.innerText = avg;
    const highText = document.createElement('p');
    highText.innerText = high;

    temperatureContainer.appendChild(lowText);
    temperatureContainer.appendChild(avgText);
    temperatureContainer.appendChild(highText);

    dayContainer.appendChild(dayText);
    dayContainer.appendChild(img);
    dayContainer.appendChild(conditionText);
    dayContainer.appendChild(temperatureContainer);

    return dayContainer;
}