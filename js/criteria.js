const weatherTable = document.getElementById('weatherTable')
// buttons 
const alertButton = document.getElementById('alertBtn')
const timerStoptButton = document.getElementById('timerStoptBtn')
const timerStartButton = document.getElementById('timerStartBtn')
// buttons to sort the weather table
const weatherButtonAscending = document.getElementById('weatherASC')
const weatherButtonDescenging = document.getElementById('weatherDESC')
const cityButtonAscending = document.getElementById('cityAlphaASC')
const cityButtonDescending = document.getElementById('cityAlphaDESC')

let timerOn
let weatherTableData

weatherButtonAscending.addEventListener('click', ()=>sorter('wasc', weatherTableData))
weatherButtonDescenging.addEventListener('click', ()=>sorter('wdesc', weatherTableData))
cityButtonAscending.addEventListener('click', ()=>sorter('casc', weatherTableData))
cityButtonDescending.addEventListener('click', ()=>sorter('cdesc', weatherTableData))

document.addEventListener('DOMContentLoaded', ()=>{
    getMultipleWeather()
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

function task1Timer(){
    let text = document.createElement('p')
    text.textContent = 'It took a second for this to show up.'
    const asyncCriteria1 = document.getElementById('asyncCriteria1')
    asyncCriteria1.append(text)

}

function sorter(type, data){
    console.log(weatherTable.rows.length)
    //weatherTable.replaceChildren()
    while (weatherTable.rows.length > 1){
        weatherTable.deleteRow(1)
    }
    let sortWay
    const mapToBeSorted = new Map()
    let sortedArray
    for(let i = 0; i < data.length; i++){
        mapToBeSorted.set(citiesList[i], data[i].current.temperature_2m)
    }
    if (type=='casc'){
        sortedArray = Array.from(mapToBeSorted).sort()
        sortWay = -1
    }
    else if (type=='cdesc'){
        sortedArray = Array.from(mapToBeSorted).sort()
        sortWay = 1
    }
    else if (type=='wasc'){
        sortedArray = Array.from(mapToBeSorted).sort((a, b) => a[1] - b[1])
        sortWay = 1
    }
    else if (type=='wdesc'){
        sortedArray = Array.from(mapToBeSorted).sort((a, b) => a[1] - b[1])
        sortWay = -1
    }
    console.log(sortedArray)
    for(let i = 0; i < data.length; i++){
        // creates a row
        var row = weatherTable.insertRow(sortWay)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        cell1.innerHTML = `${sortedArray[i][0]}` 
        cell2.innerHTML = `${sortedArray[i][1]}°C`
    }

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

    for (let i of lista){
        console.log(i)
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
        // testing setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        // goes trought the res in order for us to get the json data
        const data = await Promise.all(res.map(json => json.json()))

        /*
        for(let i = 0; i < data.length; i++){
            // creates a row
            var row = weatherTable.insertRow(1)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            cell1.innerHTML = `${citiesList[i]}` 
            cell2.innerHTML = `${data[i].current.temperature_2m}°C`
        }
        //listItem.textContent = data.map(i => i.current.temperature_2m)
        */
        weatherTableData = data
    }
    catch (e) {
        console.error(e.message)
    }
    
}