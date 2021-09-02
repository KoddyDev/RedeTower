const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const db = require("quick.db")

module.exports = {
    name: 'minerar',
    aliases: ['abc'], 
    categories : 'Economia', 
    description: 'Minere items',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let user = interaction.user;
        const mining = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setDescription(` \n <:aviso:854929386394615848> Você está minerando... \n`)
            .setColor('ORANGE')
            .setImage('https://imgur.com/p1Yzkz9.gif') 
        
        let sempicareta = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("<a:picareta:854928624183672883> **MINERAÇÃO!**")
            .setDescription(` \n <:aviso:854929386394615848> Você não pode minerar sem ter uma picareta! \n <:Dinheiro:717542627645325332> Digite **t.loja** caso queira comprar uma. \n `)
            .setTimestamp(new Date())
    
        const mining1 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:carvao:859789129326657574> Você minerou um **Carvão**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')
        
        const mining2 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:Ouro:859789095815479337> Você minerou um **Ouro**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')    
            
        const mining3 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:ferro:859789055179620383> Você minerou um **Ferro**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')
            
        const mining5 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:killer:859789451920277535> Você minerou um **Ruby**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')
            
        const mining4 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:NetherStart:859788804789108797> Você minerou um **Crystal**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')

        const mining6 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:Diamante:859788648085061702> Você minerou um **Diamante**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')
            
        const mining7 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:Stone:859788495739945016> Você minerou uma **Pedra**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')
    
        const mining8 = new Discord.MessageEmbed()
            .setTitle('<a:picareta:854928624183672883> **MINERAÇÃO!**')
            .setColor('ORANGE')
            .setDescription('<:Esmeralda:859788561564958751> Você minerou uma **Esmeralda**. \n <a:minecraft_chest:810634241067057193> Digite **t.mochila**, caso queira ver seus minérios.')

        let picareta = db.get(`picareta_${user.id}`)

        if(picareta != null){
            const random = [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
            ]
            interaction.editReply({
                embeds: [mining]
            })
            .then(msg => {
                setTimeout(function(){
                    
                    const resposta = random[Math.floor(Math.random() * random.length)];
            
                    if(resposta == 1){
                        interaction.editReply({embeds: [mining1]})
                        db.add(`carvao_${user.id}`, 1)
                    }else if(resposta == 2){
                        interaction.editReply({embeds: [mining2]})
                        db.add(`ouro_${user.id}`, 1)
                    }else if(resposta == 3){
                        interaction.editReply({embeds: [mining3]})
                        db.add(`ferro_${user.id}`, 1)
                    }else if(resposta == 4){
                        interaction.editReply({embeds: [mining4]})
                        db.add(`crystal_${user.id}`, 1)
                    }else if(resposta == 5){
                        interaction.editReply({embeds: [mining5]})
                        db.add(`ruby_${user.id}`, 1)
                    }else if(resposta == 6){
                        interaction.editReply({embeds: [mining6]})
                        db.add(`diamante_${user.id}`, 1)
                    }else if(resposta == 7){
                        interaction.editReply({embeds: [mining7]})
                        db.add(`pedra_${user.id}`, 1)
                    }else if(resposta == 8){
                        interaction.editReply({embeds: [mining8]})
                        db.add(`esmeralda_${user.id}`, 1)
                    }
                }, 6000);
            })
        }else{
            interaction.editReply({
                embeds: [sempicareta]
            })
        }  
    }
}