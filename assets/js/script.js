moment.locale('fr')


const params = new URLSearchParams(document.location.search);
let citySearch = params.get("city")


if (citySearch == "" || citySearch == null) {
    citySearch = "havre"
}


const apikey = "9fcb5abd746684e23386f8e4aafe5c26"

let url = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apikey}&units=metric&lang=fr`

// fetch("https://api.openweathermap.org/data/2.5/weather?q=Le Havre&appid=9fcb5abd746684e23386f8e4aafe5c26&units=metric&lang=fr")
fetch(url)
    .then((response) => response.json())
    .then((currentWeather) => {

        if (citySearch == "havre" || citySearch == "Havre") {
            citySearch = "Le Havre"
        }

        if (currentWeather.cod == 404) {

            document.getElementById('cityname').innerText = "Erreur"
            document.getElementById('time').innerHTML = "Veuillez taper une nouvelle ville"
            document.getElementById('hidden404').classList.add('hidden')
            document.getElementById('404').classList.remove('hidden')


        } else {
            document.getElementById('hidden404').classList.remove('hidden')
            document.getElementById('404').classList.add('hidden')
            document.getElementById('cityname').innerText = citySearch
            document.getElementById('time').innerHTML = moment().format('L') + " " + moment().format('LT')
            console.log(currentWeather)
    
    
            document.getElementById('showicon').innerHTML += `<img src="./assets/img/openweather_icons/${currentWeather.list[0].weather[0].icon}_t@4x.png" class="w-[12rem]" alt="">`
            document.getElementById('description').innerHTML += currentWeather.list[0].weather[0].description
    
            // for (weather of currentWeather.list[0].weather) {
            //     // console.log(weather)
            //     document.getElementById('showicon').innerHTML += `<img src="./assets/img/openweather_icons/${weather.icon}_t@4x.png" class="w-[12rem]" alt="">`
            //     document.getElementById('description').innerHTML += weather.description
            // }
    
            document.getElementById('temp').innerHTML = (currentWeather.list[0].main['temp']).toPrecision(1) + "°c"
            document.getElementById('feel_like').innerHTML = `Ressenti : ${currentWeather.list[0].main['feels_like'].toPrecision(1)} °c`
            document.getElementById('mintemp').innerHTML = `Min : ${(currentWeather.list[0].main['temp_min']).toPrecision(1)} °c`
            document.getElementById('maxtemp').innerHTML = `Max : ${currentWeather.list[0].main['temp_max'].toPrecision(1)} °c`
            document.getElementById('humidity').innerHTML = `${currentWeather.list[0].main['humidity']} %`
    
            // console.log(currentWeather.city.sunset)  lever de soleil
            // console.log(currentWeather.city.sunrise)    coucher de soleil
    
            let sunset = new Date(currentWeather.city.sunset * 1000)
            let sunrise = new Date(currentWeather.city.sunrise * 1000)
    
            console.log(moment(sunset).format('LT'))
            console.log(moment().format('LT'))
    
            if (moment(sunrise).format('LT') > moment().format('LT')) {
                document.getElementById('sunmoment').innerHTML = `
                                        <i class='bx bxs-moon text-5xl'></i>
                            <div>
                                <p class="text-white self-center">${moment(sunrise).format('LT')}</p>
                                <p class="text-white self-center font-semibold text-sm">Lever du soleil</p>
                            </div>`
            } else {
                document.getElementById('sunmoment').innerHTML = `
                            <i class='bx bxs-sun text-5xl'></i>
                <div>
                    <p class="text-white self-center">${moment(sunset).format('LT')}</p>
                    <p class="text-white self-center font-semibold text-sm">Coucher du soleil</p>
                </div>`
            }
    
    
    
            const windspeed = Math.round(10 * (currentWeather.list[0].wind['speed'] * 3600 / 1000) / 10)
            document.getElementById('wind').innerHTML = `${windspeed} km/h`
            // document.getElementById('windimg').classList.add(`rotate-[${currentWeather.list[0].wind['deg']}deg]`)
            document.getElementById('windsvg').innerHTML = `
                                 <svg class="w-[48px] h-[48px] text-gray-50 self-center" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24" id="windimg" style="transform: rotate(${currentWeather.list[0].wind['deg']}deg);">
                                    <path fill-rule="evenodd"
                                        d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
                                        clip-rule="evenodd" />
                                 </svg>`
    
            for (let i = 1; i <= 5; i++) {
                document.getElementById('nexthours').innerHTML += `<div class="flex flex-col">
                        <p class="text-center">${moment(currentWeather.list[i].dt_txt).format('HH')} h</p>
                        <div class="divider my-0"></div>
                        <img src="./assets/img/openweather_icons/${currentWeather.list[i].weather[0].icon}_t@2x.png" alt="" class="w-14">
                        <p class="text-center text-sm">${Math.round(currentWeather.list[i].main.temp)}°c</p>
                    </div>`
            }
    
    
    
            // PREVISIONS 5 jours
    
            console.log(currentWeather.list.length)
            let dayscount = 0
            let days = ''
            for (let i = 0; i <= currentWeather.list.length; i++) {
                if (moment(currentWeather.list[i].dt_txt).format('LT') == "12:00") {
                    dayscount++
                    if (dayscount == 1) {
                        days = "Demain"
                    }
                    if (dayscount == 2) {
                        days = "Après-demain"
                    }
                    if (dayscount > 2) {
                        days = moment(currentWeather.list[i].dt_txt).format('L')
                    }
                    console.log(currentWeather.list[i].main.temp.toPrecision(1))
                    document.getElementById('nextdays').innerHTML += `
                            <tr class="hover:bg-indigo-600/50 duration-200">
                                <th>${days}</th>
                                <td><img src="./assets/img/openweather_icons/${currentWeather.list[i].weather[0].icon}_t@4x.png" class="w-12" alt=""></td>
                                <td class="">${currentWeather.list[i].weather[0].description}</td>
                                <td>${currentWeather.list[i].main.temp.toPrecision(2)}°c</td>
                            </tr>`
                }
            }
        }

        








    })

let searchmenu = 0
function togglemenu() {
    searchmenu++
    if (searchmenu%2!==0) {
        document.getElementById('searchsection').classList.remove('hidden')
        document.getElementById('searchsection').classList.add('flex')
        document.getElementById('iconmenu').classList.add('rotate-[90deg]')
    } else {
        document.getElementById('searchsection').classList.remove('flex')
        document.getElementById('searchsection').classList.add('hidden')
        document.getElementById('iconmenu').classList.remove('rotate-[90deg]')
    }
}

    document.getElementById('togglemenu').addEventListener('click', togglemenu)

