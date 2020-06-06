const { Command } = require('discord.js-commando');
const moment = require('moment')
const Discord = require('discord.js');
const fetch = require("node-fetch");
require('dotenv').config()
const GEOTOKEN = process.env.GEO_TOKEN;
const DSKEY = process.env.DS_SECRET_KEY

module.exports = class getWeatherCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'weather',
      group: 'api',
      memberName: 'weather',
      description: 'Get weather report.',
      args: [
        {
          key: 'address',
          prompt: 'Please enter the location',
          type: 'string',
        }
      ]
    })
  }

  run(message, { address }) {
    const GeoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${GEOTOKEN}`;

    fetch(GeoCodeURL)
      .then(res => res.json().then(data => {
        let lat = data.features[0].center[1];
        let long = data.features[0].center[0];

        return getWeatherData(lat, long);
      })).catch(err => console.log(err));

    function getWeatherData(lat, long) {
      const WeatherURL = `https://api.darksky.net/forecast/${DSKEY}/${lat},${long}?units=si`

      fetch(WeatherURL)
        .then(res => res.json()
          .then(data => {
            let summary = data.daily.data[0].summary
            let temp = data.currently.temperature
            let precip = data.currently.precipProbability
            let humidity = data.currently.humidity
            let uvindex = data.currently.uvIndex
            let visibility = data.currently.visibility
            let windSpeed = data.currently.windSpeed
            let dewPoint = data.currently.dewPoint
            let ozone = data.currently.ozone
            let cloudCover = data.currently.cloudCover

          returnValues(summary, temp, precip, humidity, uvindex, visibility, windSpeed, dewPoint, ozone, cloudCover);
        })).catch(err => message.channel.send(err));
    }

    function returnValues(sum, temp, precip, hum, uv, vis, wind, dew, oz, cloud) {
      const weatherEmbed = new Discord.MessageEmbed()
        .setColor("#c30000")
        .setTitle(`${message.author.username}'s Weather Report`)
       
        .addFields(
          { name: 'Summary', value: sum },
          { name: 'Temperature', value: temp, inline: true },
          { name: 'Precipitation', value: precip, inline: true },
          { name: 'Humidity', value: hum, inline: true }
        )
        .addFields(
          { name: 'UV Index', value: uv, inline: true },
          { name: 'Visibility', value: vis, inline: true },
          { name: 'Wind Speed', value: wind, inline: true }
        )
        .addFields(
          { name: 'Dew Point', value: dew, inline: true },
          { name: 'Ozone', value: oz, inline: true },
          { name: 'Cloud Cover', value: cloud, inline: true }
        )
        .setFooter(`Date: ${moment().format('llll')}`);

      message.channel.send(weatherEmbed);
    }
  }
};