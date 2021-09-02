const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const db = require("quick.db");
module.exports = {
    name: 'loja',
    aliases: ['abc'], 
    categories : 'Economia', 
    description: 'Abre o menu da loja.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let user = interaction.user;
    
        let jatemvara = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("<:mercadominecraft:859803599852273734> LOJA!")
            .setDescription(`<:aviso:854929386394615848> Você pode ter apenas **uma** vara de pesca.`)
            .setTimestamp(new Date())
          
        let jatempicareta = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("<:mercadominecraft:859803599852273734> LOJA!")
            .setDescription(`<:aviso:854929386394615848> Você pode ter apenas **uma** picareta.`)
            .setTimestamp(new Date())
          
        let itemvarasucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle("<:mercadominecraft:859803599852273734> LOJA!")
            .setDescription(`<:fisherman:854928922532773909> Você comprou uma **vara de pesca** com sucesso.`)
            .setTimestamp(new Date())
          
        let itempicaretasucess = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle("<:mercadominecraft:859803599852273734> LOJA!")
            .setDescription(`<a:picareta:854928624183672883> Voce comprou uma **picareta** com sucesso.`)
            .setTimestamp(new Date())
          
        let nocoin = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("<:mercadominecraft:859803599852273734> LOJA!")
            .setDescription(`<:aviso:854929386394615848> Você não tem coins suficientes! Recolha sua recompensa diária. (**t.daily**)`)
            .setTimestamp(new Date())
               
        const loja = new Discord.MessageEmbed()
            .setTitle(`<:mercadominecraft:859803599852273734> LOJA!`)
            .setColor("ORANGE") 
            .setDescription('<:aviso:854929386394615848> Escolha uma categoria da loja. \n \n **Produtos:** \n <:pesca:837411840341704704> ➠ 20 coins. \n <a:picareta:854928624183672883> ➠ 50 coins.\n')
    
        let varadepesca = db.get(`varadepesca_${user.id}`)
            if(varadepesca === null) varadepesca = "0" 
          
            let picareta = db.get(`picareta_${user.id}`)
            if(picareta === null) picareta = "0" 
          
            let coin = db.get(`coins_${user.id}`)
            if(coin === null) coin = "0" 
          
        interaction.editReply({embeds: [loja]}).then(msg => {
                msg.react('837411840341704704');
                msg.react('854928624183672883');
                const filter = (r, u) => (r.emoji.name === '🎣', '⛏') && (u.id !== client.user.id && u.id === interaction.user.id)
                const collector = msg.createReactionCollector({filter})
                    collector.on("collect", r => {
                        switch (r.emoji.name) {
                            case 'pesca':
                                if(coin >= 20){
                                    if(varadepesca == null || varadepesca == 0){
                                        let money = coin-20;
                                        db.set(`varadepesca_${user.id}`, 1)
                                        db.set(`coins_${user.id}`, money)
                                        
                                        interaction.editReply({embeds: [itemvarasucess]})
                                        msg.reactions.removeAll();
                                    }else{
                                        
                                        interaction.editReply({embeds: [jatemvara]})
                                        msg.reactions.removeAll();
                                    }
                                }else{
                                    
                                    interaction.editReply(nocoin)
                                    msg.reactions.removeAll();
                                    msg.reactions.removeAll();
                                }
                            break;
                            case 'picareta':
                                if(coin >= 50){
                                    if(picareta == null || picareta == 0){
                                        let money = coin-50;
                                        db.set(`picareta_${user.id}`, 1)
                                        db.set(`coins_${user.id}`, money)
                                        
                                        interaction.editReply({embeds: [itempicaretasucess]})
                                        msg.reactions.removeAll();
                                    }else{
                                        
                                        interaction.editReply({embeds: [jatempicareta]})
                                        msg.reactions.removeAll();
                                    }
                                }else{
                                    
                                    interaction.editReply({embeds: [nocoin]})
                                    msg.reactions.removeAll();
                                }
                            break;
                        }
                    })
            });    
    
    }
}