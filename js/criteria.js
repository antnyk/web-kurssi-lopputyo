const weatherTable = document.getElementById('weatherTable')
const countryTable = document.getElementById('countryTable')
// radioButtons
const cntAllRadioBtn = document.getElementById('cntAllRadioBtn')
const cntAsiaRadioBtn = document.getElementById('cntAsiaRadioBtn')
const cntEuropeRadioBtn = document.getElementById('cntEuropeRadioBtn')
const cntAfricaRadioBtn = document.getElementById('cntAfricaRadioBtn')
// buttons 
const alertButton = document.getElementById('alertBtn')
const timerStoptButton = document.getElementById('timerStoptBtn')
const timerStartButton = document.getElementById('timerStartBtn')
const resetWeatherTableButton = document.getElementById('resetWeatherTable')
//sorting
const weatherButtonAscending = document.getElementById('weatherASC')
const weatherButtonDescenging = document.getElementById('weatherDESC')
const cityButtonAscending = document.getElementById('cityAlphaASC')
const cityButtonDescending = document.getElementById('cityAlphaDESC')
// filtering
const inputWeatherValue = document.getElementById('weatherValue')

let timerOn
let weatherTableData
let sortWay
// object arrays
let originalObjWeatherArray = []
let objectWeatherArray = []
// html Criteria 4 arrays
let objectCityArray = [
    {continent: 'Europe', city: 'Helsinki'},
    {continent: 'Europe', city: 'Berlin'},
    {continent: 'Africa', city: 'Cairo'},
    {continent: 'Africa', city: 'Kampala'},
    {continent: 'Asia', city: 'Shenzhen'},
    {continent: 'Europe', city: 'Tallinn'},
]
const originalObjectCityArray = objectCityArray

// weather buttons
weatherButtonAscending.addEventListener('click', ()=>sorter('wasc', objectWeatherArray))
weatherButtonDescenging.addEventListener('click', ()=>sorter('wdesc', objectWeatherArray))
cityButtonAscending.addEventListener('click', ()=>sorter('casc', objectWeatherArray))
cityButtonDescending.addEventListener('click', ()=>sorter('cdesc', objectWeatherArray))
// radioButtons
cntAllRadioBtn.addEventListener('click', ()=> continentSelector('All'))
cntAsiaRadioBtn.addEventListener('click', ()=> continentSelector('Asia'))
cntEuropeRadioBtn.addEventListener('click', ()=> continentSelector('Europe'))
cntAfricaRadioBtn.addEventListener('click', ()=> continentSelector('Africa'))

inputWeatherValue.addEventListener('input', ()=>{
    updateWeatherValue()
    if (inputWeatherValue.value.length === 0){
        sorter('wasc', originalObjWeatherArray)
        inputWeatherValue.value = null
    }
})

resetWeatherTableButton.addEventListener('click', ()=>{
    sorter('wasc', originalObjWeatherArray)
    objectWeatherArray = originalObjWeatherArray
    inputWeatherValue.value = null
})

document.addEventListener('DOMContentLoaded', ()=>{
    getMultipleWeather()
    weartherTableInsert(objectCityArray, countryTable, 'continent', 'city')
    setTimeout(() => sorter('wasc', objectWeatherArray), 1000)
})

alertButton.addEventListener('click', ()=>{
    alert('This works, what a surprise.')
})

timerStartButton.addEventListener('click', ()=>{
    if (!timerOn){
        timerOn = setInterval(task1Timer, 1000)
    }
})

timerStoptButton.addEventListener('click', ()=>{
    clearInterval(timerOn)
    timerOn = null
})

function isBigEnough(value) {
    return value >= inputWeatherValue.value;
}

function updateWeatherValue(){
    // we filter trought the originalObjWeatherArray, that was made when whe fetched the weather data
    objectWeatherArray = originalObjWeatherArray

    let weatherList = []
    for (let i of objectWeatherArray){
        console.log(i.temperature)
        // adds data to weatherList if our data number is greater or equilavent to input number. Also checks that value has to be a number (what if the city is a number??? fix.)
        if (isBigEnough(i.temperature) && !isNaN(i.temperature)){
            weatherList.push(i)
            console.log(i)
        }
    }
    weartherTableInsert(weatherList, weatherTable, 'city', 'temperature')
    // we change the objectWeatherArray values here since we want them used in sorter()
    objectWeatherArray = weatherList
}

function weartherTableInsert(userArray, table, param1, param2){
    // this makes sure the first row isn't deleted. for example [City, Weather]
    while (table.rows.length > 1){
        table.deleteRow(1)
    }
    for(let i = 0; i < userArray.length; i++){
        // creates a row
        var row = table.insertRow(sortWay)
        // inserts the infos on the row
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        cell1.innerHTML = `${userArray[i][param1]}` 
        cell2.innerHTML = `${userArray[i][param2]}`
    }
}

function continentSelector(selectedContinent){
    if (selectedContinent !== 'All'){
        objectCityArray = originalObjectCityArray
        let assList = []
        for (let i of objectCityArray){
            if (i.continent===selectedContinent){
                assList.push(i)
            }
        }
        console.log(assList)
        weartherTableInsert(assList, countryTable, 'continent', 'city')
    }
    else{
        weartherTableInsert(originalObjectCityArray, countryTable, 'continent', 'city')
    }
}

function task1Timer(){
    let text = document.createElement('p')
    text.textContent = 'It took a second for this to show up.'
    const asyncCriteria1 = document.getElementById('asyncCriteria1')
    asyncCriteria1.append(text)
}

function sorter(type, userArray){
    // by city ascending
    if (type=='casc'){
        userArray.sort((a, b) => a.city.localeCompare(b.city))
        sortWay = -1
    }
    // by city descending
    else if (type=='cdesc'){
        userArray.sort((a, b) => a.city.localeCompare(b.city))
        sortWay = 1
    }
    // by weather ascending
    else if (type=='wasc'){
        userArray.sort((a, b) => a.temperature - b.temperature)
        sortWay = 1
    }
    // by weather descending
    else if (type=='wdesc'){
        userArray.sort((a, b) => a.temperature - b.temperature)
        sortWay = -1
    }
    weartherTableInsert(userArray, weatherTable, 'city', 'temperature')
}

async function getMultipleWeather(){
    citiesList = ['Helsinki', 'Melbourne', 'New York', 'Ankara', 'Norlisk']
    latitudeList = [60.192059, -37.840935, 40.730610, 39.925533, 69.3355265]
    longitudeList = [24.945831, 144.946457, -73.935242, 32.866287, 88.2243754]

    let url = (lat, lon) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`

    // we create a new list that stores all the urls that we want
    let lista = []
    for (let i = 0; i < latitudeList.length; i++){
        lista.push(url(latitudeList[i],longitudeList[i]))
    }
    
    try{
        // goes trought the list using map and gets the urls of the list
        // Promise.all is used since we want multiple fetches to run at the same time
        let res = await Promise.all(lista.map(url => fetch(url)))
        // Problem with this is that if one url is wrong the whole thing is wrong
        if (!res.every(i => i.ok)){
            console.log(lista[0].type)
            if (res.status == 429){
                throw new Error('Too many requests')
            }
            else {
                throw new Error ('Error in some url link')
            }
        }
        // goes trought the res in order for us to get the json data
        const data = await Promise.all(res.map(json => json.json()))

        weatherTableData = data
    }
    catch (e) {
        console.error(e.message)
    }

    for(let i = 0; i < weatherTableData.length; i++){
        let weatherObject = {city: citiesList[i], temperature: weatherTableData[i].current.temperature_2m + '°C'}
        objectWeatherArray.push(weatherObject)
    }
    objectWeatherArray.sort()
    originalObjWeatherArray = objectWeatherArray
    console.log(originalObjWeatherArray)
}