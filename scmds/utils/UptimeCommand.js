const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const os = require("os")
var os2 = require('os-utils');

module.exports = {
    name: 'uptime',
    aliases: ['abc'], 
    categories : 'Utils', 
    description: 'Ver o tempo online que estou desde quando comecei a trabalhar.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  
  

        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
      
        let uptime = `<:h_heart:854929181133766676> ➠ **__${days.toFixed()}__** dias, **__${hours.toFixed()}__** horas, **__${minutes.toFixed()}__** minutos e **__${seconds.toFixed()}__** segundos.`;
      
        const Embed = new Discord.MessageEmbed()
          .setTitle(`<:clock2:823869785703972894> TEMPO ONLINE!`)
          .setThumbnail("https://imgur.com/4CPctGN.gif")
          .setColor("ORANGE")
          .setDescription(`<:bussola:854928664893980672> **Estou online há:**\n \n ${uptime}
                           CPU: ${os.cpus()[0].model}
                           Nucleos: ${os.cpus().length}
                           Memoria RAM: ${parseInt(os2.freemem().toPrecision().toString()).toFixed(0)}/${parseInt(os2.totalmem().toPrecision().toString()).toFixed(0)}
                           RAM Livre: ${parseInt(os2.freememPercentage().toPrecision().toString())}%`)

                           console.log(process.cpuUsage().user.toPrecision())
      
 await interaction.editReply({
     embeds: [Embed]
 }); 

}
}