const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();

//middlewares
app.use(bodyParser.json());

app.use(cors({
  domains: '*',
  methods: "*"
}));

//routes
app.get('/tipocambio', function (req, res) {
  let response = {};
  switch(req.query.type) {
    case 'usd':
      response = {
        "TipoCompraDolares" : "621",
        "TipoVentaDolares" : "621"
      }
    break;
    case 'eur':
      response = {
        "TipoCompraEuros" : "731.85",
        "TipoVentaEuros" : "761.9"
      }
    break;
    default:
      response = {
        "TipoCompraDolares" : "621",
        "TipoVentaDolares" : "621",
        "TipoCompraEuros" : "731.85",
        "TipoVentaEuros" : "761.9"
      }
    break;
  }
  res.json(response);
});

app.get('/paises', function (req, res) {
  let responsejson = {};
  //let taker = ajaxRequest.open("GET", "https://restcountries.com/v3.1/all");
  axios.get('https://restcountries.com/v3.1/all')
  .then(function (response) {
    // La solicitud fue exitosa, maneja los datos aquí
    //console.log(response.data);
    res.json(response.data);
  })
  .catch(function (error) {
    // Ocurrió un error en la solicitud, maneja el error aquí
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de los países' });
  });
  
});

//start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))
