const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const db = require("quick.db")

module.exports = {
    name: 'daily',
    aliases: ['abc'], 
    categories : 'Economia', 
    description: 'Receba sua recompensa diaria.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let amount = Math.floor(Math.random() * 300);;
	let user = interaction.user;
      
	var day = new Date().getDate();
	var month = new Date().getMonth();
      
	let jacoleto = new Discord.MessageEmbed()
		.setTitle(`<:Ouro:859789095815479337> DAILY!`)
		.setDescription('<a:naoo:859777462615539712> Você já pegou seus coins diários! \n <:aviso:854929386394615848> Volte em 24 horas para coletar novamente.')
		.setColor('RED')
    
	let coletou = new Discord.MessageEmbed()
		.setTitle(`<:Ouro:859789095815479337> DAILY!`)
		.setDescription('<a:certo:859799628597952512> Você coletou seus **' + amount + ' coins** diários. \n <:aviso:854929386394615848> Volte em 24 horas para pegar sua recompensa diária novamente.')
		.setColor('GREEN')
    
	let recoDailyD = await db.fetch(`recodailyd_${user.id}`);
		if (recoDailyD === null) recoDailyD = 0;
		let recoDailyM = await db.fetch(`recodailym_${user.id}`)
		if (recoDailyM === null) recoDailyM = 0;
      
	if (recoDailyD === day && recoDailyM === month) {
		interaction.editReply({
            embeds: [jacoleto]
        })
	} else {
		db.set(`recodailyd_${user.id}`, day);
		db.set(`recodailym_${user.id}`, month);
		interaction.editReply({
            embeds: [coletou]
        })
		db.add(`coins_${user.id}`, amount)
	}    
    }
}