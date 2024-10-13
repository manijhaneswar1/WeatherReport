function getWeather(){
    const apikey='77dc043334af42c9e09833f619c9a052';
    const city=document.getElementById('city').value;

    if(!city){
        alert("Please enter a valid city");
    }

    const currentWeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data=>{
            displayWeather(data);
        })
        .catch(error=>{
            console.error('Error fetching weather',error);
            alert('Something went wrong!');
        });
}

function displayWeather(data){
    const tempDivInfo=document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weather-info');
    const hourlyForecastDiv=document.getElementById('hourly-forecast');


    if(data.code === '404'){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`
    }else{
        const cityName=data.name;
        const temperature=Math.round(data.main.temp - 273.15);
        const description =data.weather[0].description;

        const temperatureHtml=`
        <p>${temperature}<sup>o</sup>C</p>`;

        const weatherHtml=`
            <p>${cityName}</p>
            <p>${description}</p>
        `;
         tempDivInfo.innerHTML=`temperature: ${temperatureHtml}`;
         weatherInfoDiv.innerHTML=`weather: ${weatherHtml}`;
    }
}