const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const rl = require("../../cmdMnger")

module.exports = {
    name: 'reiniciar',
    aliases: [''], 
    categories : 'adm', 
    description: 'Comando de reiniciar TODOS os comandos.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

  if (interaction.member.roles.cache.has('787816334565572639')){

   
client.srequires.map(v =>
   { 
    delete require.cache[require.resolve(v)];})

   rl(client)
   interaction.editReply("Comandos sendo recarregados! Só aguardar.")

}else{
    interaction.editReply('<:teste:708434665421144224> Você não possui permissão.')
  }
    }
}