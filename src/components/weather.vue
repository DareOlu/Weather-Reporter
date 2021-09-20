<template>
  <div>
    <p>Enter the city name</p>

    <section class="w-input">
      <input type="text" v-model="query">
      <button :disabled="!query.length" @click="showWeather">Check</button>
    </section>

    <section v-if="error" class="w-error">
      There is no such city in the database
    </section>

    <section v-if="city.length" class="w-result">
      <h1 >{{city}}, {{country}}</h1>
      
      <div class="w-main-result">
        <img :src="icon" alt="Weather icon">
        <div class="current-temp">
          {{temp}}&deg;C
        </div>
         <p class="weather-description">{{weatherDescription}}</p>        
      </div>

      <div class="w-main-details">
       
        <p><a class="descriptor">Minimum Temperature:</a> <a class="value">{{tempMin}}&deg;C</a></p>
        <p><a class="descriptor">Maximum Temperature:</a> <a class="value">{{tempMax}}&deg;C</a></p>
        <p><a class="descriptor">Feel Like Temperature:</a> <a class="value">{{tempFeel}}&deg;C</a></p>
        <p><a class="descriptor">Humidity:</a> <a class="value">{{humidity}}&deg;C</a></p>
        
      </div>
    </section>
    
  </div>
</template>

<script>
export default {
  name: 'weather',
  data() {
    return {
      query: '',
      error: false,
      city: '',
      country: '',
      weatherDescription: '',
      temp: null,
      tempMin: null,
      tempMax: null,
      tempFeel: null,
      humidity: null,
      icon: '',
    };
},
methods: {
  showWeather() {
    const API_KEY = ''
    this.$http
      .get(`/weather?q=${this.query}&units=metric&&appid=${API_KEY}`)
      .then(response => {
        this.city = response.data.name;
        this.country = response.data.sys.country;
        this.weatherDescription = response.data.weather[0].description;
        this.temp = response.data.main.temp;
        this.tempMin = response.data.main.temp_min;
        this.tempMax = response.data.main.temp_max;
        this.tempFeel = response.data.main.feels_like;
        this.humidity = response.data.main.humidity;
        this.icon = `http://openweathermap.org/img/w/${
          response.data.weather[0].icon
        }.png`;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.city = '';
      });
  },
},
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-main-result{
  float: left;
  width: 50%;
  padding: 20% 0 20% 0;
}
.w-main-details{
  float: left;
  width: 45%;
  padding: 10% 0 10% 0;
}
.current-temp{
  font-size: 40px;
  font-weight: 900;
}
.weather-description {
  font-size: 18px;
  font-weight: 400;
}
.descriptor{
  font-size: 12px;
  font-weight: 200;
}
.vlue{
  font-size: 16px;
  font-weight: 700;
}
</style>
