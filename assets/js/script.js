moment.locale('fr')

document.getElementById('time').innerHTML += moment().format('L') + " " + moment().format('LT')




// fetch("https://api.openweathermap.org/data/2.5/forecast?q=Le Havre&appid=9fcb5abd746684e23386f8e4aafe5c26&units=metric")
// .then ((response) => response.json())
// .then ((weather) => {

//     console.log(weather)




// })




let city = "Havre"
const apikey = "9fcb5abd746684e23386f8e4aafe5c26"


let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric&lang=fr`

// fetch("https://api.openweathermap.org/data/2.5/weather?q=Le Havre&appid=9fcb5abd746684e23386f8e4aafe5c26&units=metric&lang=fr")
fetch(url)
    .then((response) => response.json())
    .then((currentWeather) => {
        document.getElementById('cityname').innerText = city

        console.log(currentWeather)


        for (weather of currentWeather.list[0].weather) {
            // console.log(weather)
            document.getElementById('showicon').innerHTML += `<img src="./assets/img/openweather_icons/${weather.icon}_t@4x.png" class="w-[12rem]" alt="">`
            document.getElementById('description').innerHTML += weather.description
        }

        // for (main of currentWeather.main) {
        // console.log(main)
        // Objet pas array ?

        // }

        document.getElementById('temp').innerHTML = Math.round(10 * currentWeather.list[0].main['temp']) / 10 + "°c"
        document.getElementById('feel_like').innerHTML = `Ressenti : ${Math.round(10 * currentWeather.list[0].main['feels_like']) / 10} °c`
        document.getElementById('mintemp').innerHTML = `Min : ${Math.round(10 * currentWeather.list[0].main['temp_min']) / 10} °c`
        document.getElementById('maxtemp').innerHTML = `Max : ${Math.round(10 * currentWeather.list[0].main['temp_max']) / 10} °c`
        document.getElementById('humidity').innerHTML = `${currentWeather.list[0].main['humidity']} %`

        const windspeed = Math.round(10 * (currentWeather.list[0].wind['speed'] * 3600 / 1000) / 10)
        document.getElementById('wind').innerHTML = `${windspeed} km/h`
        document.getElementById('windimg').classList.add(`rotate-[${currentWeather.list[0].wind['deg']}deg]`)



        for (let i = 1; i <= 5; i++) {

            document.getElementById('nexthours').innerHTML += `<div class="flex flex-col">
                <p class="text-center">${moment(currentWeather.list[i].dt_txt).format('HH')} h</p>
                <div class="divider my-0"></div>
                <img src="./assets/img/openweather_icons/${currentWeather.list[i].weather[0].icon}_t@2x.png" alt="" class="w-14">
                <p class="text-center text-sm">${Math.round(currentWeather.list[i].main.temp)}°c</p>
            </div>`


            console.log(currentWeather.list[i].weather[0].icon)


        }
    })



