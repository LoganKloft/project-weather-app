export async function current(city) {
    let result = await fetch(`http://api.weatherapi.com/v1/current.json?key=557a1ca7fa86497ca89164150232308&q=${city}&aqi=no`, {
        mode: 'cors'
    });
    let json = await result.json();
    return json;
}

// returns a list of the last four forecasts
export async function history(city, date) {
    let result = await fetch(`http://api.weatherapi.com/v1/history.json?key=557a1ca7fa86497ca89164150232308&q=${city}&dt=${date}`, {
        mode: 'cors'
    });
    let json = await result.json();
    return json;
}

function convertDate(date) {
    let day = date.getDate().toString();
    if (day.length < 2) day = '0' + day;
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) month = '0' + month;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

var SECONDS_IN_DAY = 60 * 60 * 24;
export async function getLastDays(city, days) {
    let currentDate = new Date();
    let result = [];

    for (let i = 0; i < days; i++) {

        let oldDate = new Date();
        oldDate.setSeconds(currentDate.getSeconds() - i * SECONDS_IN_DAY);
        let oldForecast = await history(city, convertDate(oldDate));
        result.push(oldForecast);
    }

    return result.map((item) => {
        return item.forecast.forecastday[0];
    });
}

// returns a list of the next three forecasts, including today
export async function forecast(city) {
    let result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=557a1ca7fa86497ca89164150232308&q=${city}&days=3&aqi=no&alerts=no`, {
        mode: 'cors'
    });
    let json = await result.json();
    return json.forecast.forecastday;
}