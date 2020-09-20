/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=';
let apiKey = '&appid=97f12895164614a390de4d0d2399bf71';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();
document.getElementById('generate').addEventListener('click', performAction);


function performAction(e) {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipcode, apiKey)
        .then(function (data) {
            // Add data
            postData('/weather', { temp: data.list[0].main.temp, date: newDate, user_response: feelings });
            updateUI()
        })
}

const getWeather = async (baseURL, zipcode, apikey) => {

    const res = await fetch(baseURL + zipcode + apikey)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: '+allData.date;
        document.getElementById('temp').innerHTML = 'Temprature: '+allData.temp;
        document.getElementById('content').innerHTML = 'Feelings: '+allData.user_response;

    } catch (error) {
        console.log("error", error);
    }
}



