const discord = require('discord.js')

const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const lyricsFinder = require("lyrics-finder");

const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'lyrics',
    aliases: ['abc'], 
    categories : 'Musica', 
    description: 'Busque a letra de uma musica!',
    usage: '',
    options: [
        {
            name: "parametros-pesquisa",
            description: "Nome da musica",
            type: "STRING",
            required: true
        }
    ],

     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {

        let lyrics = null;

        let option = interaction.options.get("parametros-pesquisa").value
    
        try {
          lyrics = await lyricsFinder(option, "");
          
          console.log(lyrics2)
          if (!lyrics2) lyrics = `Nenhuma musica encontrada para ${option} :(`;
        } catch (error) {
          lyrics = `Nenhuma musica encontrada para ${option} :(`;
        }
    
        let lyricsEmbed = new MessageEmbed()
          .setTitle(`Letra da musica ${option}`)
          .setDescription(lyrics.toString())
          .setFooter(interaction.guild.name + " - © 2021").setColor("#00ffff").setTimestamp();
          
    
        if (lyricsEmbed.description.length >= 2048)
          lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
        return interaction.editReply({
            embeds: [lyricsEmbed]
        }).catch(console.error);
      }
    }