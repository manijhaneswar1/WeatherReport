 function displayWeather(data){
    const tempDivInfo=document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weather-info');
    const image=document.getElementById('image');
    const windSpeed=document.getElementById('wind-speed');


    if(data.code === '404'){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`
    }
    else{
        const temperature=Math.round(data.main.temp - 273.15);
        const cityName=data.name;
        const description =data.weather[0].description;
        const windData=data.wind.speed;
        const couData=data.sys.country;


        const windHtml=`<p>Wind Speed : ${windData}</p>`;
        const imageHtml=`<img src="./weatherpng.jpg" class="w-64 h-40" alt="image not found"/>`
        const temperatureHtml=`<p class="text-md">Temperature : ${temperature}<sup>o</sup>C</p>`;
        const weatherHtml=`<p>${cityName},${couData}</p> <p>${description}</p>`;


         windSpeed.innerHTML=windHtml;
         image.innerHTML=imageHtml;
         tempDivInfo.innerHTML=`${temperatureHtml}`;
         weatherInfoDiv.innerHTML=`${weatherHtml}`;
    }
}
 async function getWeather(){
    const apikey='77dc043334af42c9e09833f619c9a052';
    const city=document.getElementById('city').value;

    if(!city){
        alert("Please enter a valid city");
    }

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
        .then(response => response.json())
        .then(data=>{
            displayWeather(data);
             console.log(data)
        })
        .catch(error=>{
            console.error('Error fetching weather',error);
            alert('Something went wrong!');
        });
}
