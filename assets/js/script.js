moment.locale('fr')

document.getElementById('time').innerHTML += moment().format('L') + " " + moment().format('LT')




fetch("https://api.openweathermap.org/data/2.5/forecast?q=Le Havre&appid=9fcb5abd746684e23386f8e4aafe5c26&units=metric")
.then ((response) => response.json())
.then ((weather) => {

    console.log(weather)




})






