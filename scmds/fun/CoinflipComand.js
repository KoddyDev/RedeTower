const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { random } = require("../../db/DatabaseLogin");

module.exports = {
    name: 'coinflip',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Jogar Cara ou Coroa comigo!',
    usage: '',
    options: [
        {
            name: "valor",
            description: "Selecione cara ou coroa para jogar!",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Cara",
                    value: "cara"
                },
                {
                    name: "Coroa",
                    value: "coroa"
                }
            ]
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        let valor;
        if(interaction.options.get("valor")) {
            valor = interaction.options.get("valor").value
        }
        const array1 = ["cara", "coroa"]
        var rand = Math.floor(Math.random() * array1.length);

        console.log()
       if (valor == "coroa") {
           if(array1[rand] === "coroa") {
           interaction.editReply("<:girassol:839616839386005565> Eu joguei **2**, você jogou \`"+valor+"\`, você ganhou dessa vez, aff!");
        } 
    }
      else if (valor != array1[rand]) {
        interaction.editReply("<:girassol:839616839386005565> Eu joguei **" + array1[rand] + "**, você jogou \`"+valor+"\`, você perdeu dessa vez! Ganhei hehe."
          );
        }
    }
}