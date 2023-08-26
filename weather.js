require('dotenv').config();

export async function current(city) {
    let result = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`, {
        mode: 'cors'
    });
    let json = result.json();
    return json;
}

export async function history(city) {

}

export async function forecast(city) {

}