const { Command } = require('discord.js-commando');
const moment = require('moment')
const Discord = require('discord.js');
const fetch = require("node-fetch");
require('dotenv').config()
const GEOTOKEN = process.env.GEO_TOKEN;
const DSKEY = process.env.DS_SECRET_KEY

module.exports = class DiceRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            group: 'second',
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

    run(message, {address}) {
        const GeoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${GEOTOKEN}`
        
        fetch(GeoCodeURL)
            .then(res => {
                let lat = res.features[0].center[1];
                let long = res.features[0].center[0];

                return getWeatherData(lat, long)   
            });
    

        function getWeatherData(lat, long) {
            const WeatherURL = `https://api.darksky.net/forecast/${DSKEY}/${lat},${long}?units=si`

            fetch(WeatherURL)
                .then(res => {
                    let summary = res.body.daily.data[0].summary
                    let temp = res.body.currently.temperature
                    let precip = res.body.currently.precipProbability
                    let humidity = res.body.currently.humidity
                    let uvindex = res.body.currently.uvIndex
                    let visibility = res.body.currently.visibility
                    let windSpeed = res.body.currently.windSpeed
                    let dewPoint = res.body.currently.dewPoint
                    let ozone = res.body.currently.ozone
                    let cloudCover = res.body.currenly.cloudCover

                    return returnValues(summary, temp, precip, humidity, uvindex, visibility, windSpeed, dewPoint, ozone, cloudCover);
                })
        }

        function returnValues(sum, temp, precip, hum, uv, vis, wind, dew, oz, cloud)
        {
            let weatherEmbed = new Discord.MessageEmbed()
            .setColor("#c30000")
            .setTitle(`${message.author.username}'s Weather Report`)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .addFields(
                {name: 'Summary', value: sum},
                {name: 'Temperature', value: temp, inline: true},
                {name: 'Precipitation', value: precip, inline: true},
                {name: 'Humidity', value: hum, inline: true}
            )
            .addFields(
                {name: 'UV Index', value: uv, inline: true},
                {name: 'Visibility', value: vis, inline: true},
                {name: 'Wind Speed', value: wind, inline: true}
            )
            .addFields(
                {name: 'Dew Point', value: dew, inline: true},
                {name: 'Ozone', value: oz, inline: true},
                {name: 'Cloud Cover', value: cloud, inline: true}
            )
            .setFooter(`Date: ${moment().format('llll')}`)

            return weatherEmbed
        }

        
        

        return message.reply(returnValues())
    }
};