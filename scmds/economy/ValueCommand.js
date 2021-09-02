const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'valores',
    categories : 'Economia', 
    description: 'Exibe o preço dos items que podem ser vendidos',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let Embed = new Discord.MessageEmbed()
        .setTitle(`💰 VALORES!`)
        .setDescription(`\n🐟 **Valores de Peixes!** \n\n 🐢 Tartaruga ➠ 1$ \n 🦑 Lula ➠ 2$\n 🐙 Polvo ➠ 5$\n🦞 Lagosta ➠ 8$\n🦐 Camarão ➠ 11$\n🦀 Siri ➠ 14$\n🐡 Baiacu ➠ 6$\n🐠 Peixe Tropical ➠ 4$\n🐟 Peixe Comum ➠ 3$\n \n<a:block:855048383147933716> **Valores de Minérios!** \n\n <:Stone:859788495739945016> Pedra ➠ 2$\n<:carvao:859789129326657574> Carvão ➠ 3$\n<:ferro:859789055179620383> Ferro ➠ 5$\n<:Ouro:859789095815479337> Ouro ➠ 6$\n<:Diamante:859788648085061702> Diamante ➠ 7$\n<:Esmeralda:859788561564958751> Esmeralda ➠ 9$\n<:killer:859789451920277535> Ruby ➠ 12$ \n<:NetherStart:859788804789108797> Crystal ➠ 14$\n \n`)
        .setColor(`ORANGE`)

        interaction.editReply({
            embeds: [Embed]
        })
    }
}