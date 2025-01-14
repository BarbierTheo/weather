moment.locale('fr')

document.getElementById('time').innerHTML += moment().format('L') + " " + moment().format('LT')




// fetch("https://api.openweathermap.org/data/2.5/forecast?q=Le Havre&appid=9fcb5abd746684e23386f8e4aafe5c26&units=metric")
// .then ((response) => response.json())
// .then ((weather) => {

//     console.log(weather)




// })





fetch("https://api.openweathermap.org/data/2.5/weather?q=Le Havre&appid=9fcb5abd746684e23386f8e4aafe5c26&units=metric&lang=fr")
    .then((response) => response.json())
    .then((currentWeather) => {

        console.log(currentWeather)


        for (weather of currentWeather.weather) {
            // console.log(weather)
            document.getElementById('showicon').innerHTML += `<img src="./assets/img/openweather_icons/${weather.icon}_t@4x.png" class="w-[12rem]" alt="">`
            document.getElementById('description').innerHTML += weather.description
        }

        // for (main of currentWeather.main) {
        // console.log(main)
        // Objet pas array ?

        // }

        document.getElementById('temp').innerHTML = Math.round(10 * currentWeather.main['temp']) / 10 + "°c"
        document.getElementById('feel_like').innerHTML = `Ressenti : ${Math.round(10 * currentWeather.main['feels_like']) / 10} °c`
        document.getElementById('mintemp').innerHTML = `Min : ${Math.round(10 * currentWeather.main['temp_min']) / 10} °c`
        document.getElementById('maxtemp').innerHTML = `Max : ${Math.round(10 * currentWeather.main['temp_max']) / 10} °c`
        document.getElementById('humidity').innerHTML = `${currentWeather.main['humidity']} °c`

        const windspeed = Math.round(10 * (currentWeather.wind['speed'] * 3600 / 1000) / 10)
        document.getElementById('wind').innerHTML = `${windspeed} km/h`
        document.getElementById('windimg').classList.add(`rotate-[${currentWeather.wind['deg']}deg]`)




    })



