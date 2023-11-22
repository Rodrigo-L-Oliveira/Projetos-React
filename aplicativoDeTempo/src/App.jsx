import React, { useState } from "react"
const api = {
  key: "c933e4164f12251e9c6663e49180ac27",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric&lang=pt_br`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];
    let days = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];

    let day = days[d.getDay() - 1];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const translateWeather = (weather) => {
    const weatherTranslation = {
      // Variavel criada especialmente para traduzir o texto para pt-br, adicionar mais traduções conforme necessário
      "Clouds": "Nublado",
      "Sun": "Ensolarado",
      "Clear": "Limpo",
      "Rain": "Chuvoso",
      "Snow": "Neve",
      "Mist": "Névoa"
    };
    return weatherTranslation[weather] || weather;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Escreva sua cidade aqui"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyUp={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{translateWeather(weather.weather[0].main)}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App
