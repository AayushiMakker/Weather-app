//http://api.weatherapi.com/v1/current.json?   key=b09ec08869e44987b04185709261503&q=Mumbai&aqi=no

const temperatureField = document.querySelector('.temp p');
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location p:last-of-type");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

let clockInterval;


form.addEventListener("submit", searchForLocation);

let target = 'Mumbai'

const fetchResults = async(targetLocation) =>{
    let url = `https://api.weatherapi.com/v1/current.json?key=b09ec08869e44987b04185709261503&q=${targetLocation}&aqi=no`

    const res = await fetch(url)

    const data = await res.json()
    
    console.log(data)


    let locationName = data.location.name
    let time = data.location.localtime
    let temp = data.current.temp_c
    let condition = data.current.condition.text
    //let icon = data.current.condition.icon
    updateDetails(temp, locationName, time, condition)
    updateClock(time);

}


function updateDetails (temp , locationName , time , condition) {
        const [datePart, timePart] = time.split(" ");
        let currentDay = fetchDayName(new Date(datePart).getDay());

        temperatureField.innerText = temp;
        locationField.innerText = locationName;
        dateandTimeField.innerText = `${timePart} - ${currentDay} ${datePart}`;
        conditionField.innerText = condition;
}

function updateClock(localtime) {
    if (clockInterval) {
        clearInterval(clockInterval);
    }

    const locationDate = new Date(localtime);

    clockInterval = setInterval(() => {
        locationDate.setSeconds(locationDate.getSeconds() + 1);

        const hours = String(locationDate.getHours()).padStart(2, '0');
        const minutes = String(locationDate.getMinutes()).padStart(2, '0');
        const timePart = `${hours}:${minutes}`;

        const year = locationDate.getFullYear();
        const month = String(locationDate.getMonth() + 1).padStart(2, '0');
        const day = String(locationDate.getDate()).padStart(2, '0');
        const datePart = `${year}-${month}-${day}`;
        
        const dayName = fetchDayName(locationDate.getDay());

        dateandTimeField.innerText = `${timePart} - ${dayName} ${datePart}`;
    }, 1000);
}
function searchForLocation(e){
    e.preventDefault()

    target = searchField.value 

    fetchResults(target)

}

fetchResults(target)

function fetchDayName(number){
    switch(number){
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        
    }
}