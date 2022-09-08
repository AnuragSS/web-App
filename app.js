const express = require(`express`);
const app = express();
const port = 3000;
const bodyParser =require(`body-parser`);
const http = require(`https`);
const request = require(`request`);
const { response } = require("express");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(`public`));
const serverMessage = () =>{
    console.log(`Server is running successfully\nlocalhost:${port}`);
};

app.get(`/`,(req,res)=>{
    res.sendFile(__dirname +`/index.html`);
    
});

app.post(`/weather.html`,(req,res)=>{
   // res.sendFile(__dirname+ `/weather.html`);
    const cityName = req.body.cityName;
    console.log(cityName);
    const appId = `9d1f47567fdb62f43c1d722ea4b02df9`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=metric`;
    http.get(url,(response)=>{
        console.log("Weather api status:"+ response.statusCode);
        response.on(`data`,(data)=>{
            const weatherData = JSON.parse(data);
            const skyCondition =weatherData.weather[0].main;
            const temp =weatherData.main.temp;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;


            res.send(`<h1>Selected City: ${cityName}</h1>
            <hr>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
            <br>
            <h2>Current temperature:  ${temp} Celsius</h2>
            <br>
            <h2>Sky condition:  ${skyCondition}</h2>
            <br>
            <h2>Pressure :  ${pressure} hPa</h2>
            <br>
            <h2>Description:  ${description}</h2>
            <br>
            <h2>Humidity:  ${humidity} %</h2>
            <br>
            <h2>Wind-Speed:  ${windSpeed} meters/sec</h2>
           


            <style>
            body{
                text-align:center;
                background: rgb(63,94,251);
                background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
            }
            h1{
                font-family:Georgia, 'Times New Roman', Times, serif;
            }
            h2{
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            }
            </style>`);
            
        });
        //res.sendFile(__dirname +`/weather.html`);
    })
     
});

app.post(`/joke.html`,(req,res)=>{
    const url =`https://v2.jokeapi.dev/joke/Dark?type=single`;
    http.get(url,(response)=>{
        console.log(`\n\nJoke Api status:${response.statusCode}`);
        response.on(`data`,(data)=>{
            const jokeApi = JSON.parse(data);
            console.log(jokeApi);
            const darkJoke = jokeApi.joke;

            res.send(`
        <h1>Dark Humour</h1>
        <hr>
        <br>
        <h1>Joke:</h1>
        <h1 style="color:white"> ${darkJoke}</h1>
        <br>
        <hr>

        <style>
        body{
            text-align:center;
            word-spacing:7px;           
            background: rgb(131,58,180);
            background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);            
        }
        h1{
            font-family:Georgia, 'Times New Roman', Times, serif;
        }

        </style>
        `);
            
        });       
    });
});


app.post(`/forex.html`,(req,res)=>{
    const forex1= req.body.forex1;
        const forex2 = req.body.forex2;
    request.get({
        url: `https://api.api-ninjas.com/v1/exchangerate?pair=${forex1}_${forex2}`,
        headers: {
          'X-Api-Key': 'PdNunXCBLK+XNP/bi5av9Q==kEtKcxdupl7ESK2n'
        },
      }, (error, response, body)=> {
        if(error) return console.error('Request failed:', error);
        else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else console.log(body);
        const exchangeData = JSON.parse(body);
        const currencyPair = exchangeData.currency_pair;
        const forexRate = exchangeData.exchange_rate;
        console.log(currencyPair);
        res.send(`<br>
        <h1>Forex Rates from ${forex1} to ${forex2}:</h2><br><hr><br>
        <h1 class="rate">Current Forex Rate:${forexRate}</h1><br>
        <h1 class="rate">1 ${forex1}  = ${forexRate} ${forex2}</h1> 
        <br><hr>

        <style>
        body{
            text-align:center;
            background: rgb(34,193,195);
            background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
        }
        .rate{
            font-family:cursive;
        }

        </style>
        `);
        
      });
    })




app.listen(process.env.PORT || port,serverMessage);



//open weathermap apikey = 9d1f47567fdb62f43c1d722ea4b02df9

//API NINJAS apiKey = PdNunXCBLK+XNP/bi5av9Q==kEtKcxdupl7ESK2n