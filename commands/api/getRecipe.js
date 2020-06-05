const { Command } = require('discord.js-commando');
const moment = require('moment')
const Discord = require('discord.js');
const fetch = require("node-fetch");
require('dotenv').config()

module.exports = class getRecipeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'recipe',
      group: 'api',
      memberName: 'recipe',
      description: 'Get random recipe',
    //   args: [
    //     {
    //       key: 'address',
    //       prompt: 'Please enter the location',
    //       type: 'string',
    //     }
    //   ]
    })
  }

  run(message) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json()
        .then(data => {
            let title = data.meals[0].strMeal
            let category = data.meals[0].strCategory
            let image = data.meals[0].strMealThumb
            let youtube = data.meals[0].strYoutube
            let instructions = data.meals[0].strInstructions
            let ingredients = [
                data.meals[0].strIngredient1,
                data.meals[0].strIngredient2,
                data.meals[0].strIngredient3,
                data.meals[0].strIngredient4,
                data.meals[0].strIngredient5,
                data.meals[0].strIngredient6,
                data.meals[0].strIngredient7,
                data.meals[0].strIngredient8,
                data.meals[0].strIngredient9,
                data.meals[0].strIngredient10,
                data.meals[0].strIngredient11,
                data.meals[0].strIngredient12,
                data.meals[0].strIngredient13,
                data.meals[0].strIngredient14,
                data.meals[0].strIngredient15,
                data.meals[0].strIngredient16,
                data.meals[0].strIngredient17,
                data.meals[0].strIngredient18,
                data.meals[0].strIngredient19,
                data.meals[0].strIngredient20,
            ]
            let measurements = [
                data.meals[0].strMeasure1,
                data.meals[0].strMeasure2,
                data.meals[0].strMeasure3,
                data.meals[0].strMeasure4,
                data.meals[0].strMeasure5,
                data.meals[0].strMeasure6,
                data.meals[0].strMeasure7,
                data.meals[0].strMeasure8,
                data.meals[0].strMeasure9,
                data.meals[0].strMeasure10,
                data.meals[0].strMeasure11,
                data.meals[0].strMeasure12,
                data.meals[0].strMeasure13,
                data.meals[0].strMeasure14,
                data.meals[0].strMeasure15,
                data.meals[0].strMeasure16,
                data.meals[0].strMeasure17,
                data.meals[0].strMeasure18,
                data.meals[0].strMeasure19,
                data.meals[0].strMeasure20
            ]
        returnValues(title, category, image, youtube, instructions, ingredients, measurements);
        })).catch(err => message.channel.send(err))
    
    function returnValues(title, category, image, youtube, instructions, ingredients, measurements) {
        
        // let ingredientsString = 
        //     `${ingredients[0]}, ${ingredients[1]}, ${ingredients[2]}, ${ingredients[3]}, ${ingredients[4]}
        //     ${ingredients[5]}, ${ingredients[6]}, ${ingredients[7]}, ${ingredients[8]}, ${ingredients[9]}
        //     ${ingredients[10]},${ingredients[11]}, ${ingredients[12]}, ${ingredients[13]}, ${ingredients[14]}
        //     ${ingredients[15]}, ${ingredients[16]}, ${ingredients[17]}, ${ingredients[18]}, ${ingredients[19]}`

        const recipeEmbed = new Discord.MessageEmbed()
            .setColor("#f4f4f4")
            .setTitle(`${title} - Recipe`)
            .addFields(
                { name: 'Category', value: category},
                { name: "Youtube Link", value: youtube }
            )
            .setImage(image)
            .addFields(
                { name: "Instructions", value: instructions },
                { name: "Ingredients", value: ingredients },
                { name: "Measurements", value: measurements }
            )
            .setFooter(`Date ${moment().format('llll')}`);

    message.channel.send(recipeEmbed);
    }
  }
}