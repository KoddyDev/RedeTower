const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'uban',
    aliases: ['abc'], 
    categories : 'adm', 
    description: 'Comando de desbanimento.',
    usage: '',
    options: [
        {
            name: "id",
            type: "STRING",
            description: "Selecione o id do usuario!",
            required: true
        },
        {
            name: "motivo",
            type: "STRING",
            description: "Selecione o porque o usuario deve ser desbanido!",
            required: true
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const member = interaction.options.get("usuario")
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.editReply("permissões insuficientes!") // caso o membro não possua a permissão 'BANIR_MEMBROS', vamos botar o erro
    
            if (!member.bannable) return interaction.editReply("<:aviso:854929386394615848> Não é possível banir esse usuário.") // caso o membro tenha um cargo acima do seu bot, ele não vai banir
            let motivo = interaction.options.get("motivo").value
            if (!motivo) motivo = "<:aviso:854929386394615848> Nenhuma razão fornecida" // requisitando um motivo desse banimento
            await member.ban({reason: `Por: ${interaction.user.tag} | Motivo: ${motivo}`,}) 
              .catch(error => interaction.editReply(`${interaction.user}, não foi possível completar esta punição devido ao erro: ${error}`)) // caso ocorra um erro no final, vamos filtrar e avisar qual foi
        
              let pEmbed = new Discord.MessageEmbed()
                  .setTitle(`<:grade:839619780654006274> BANIMENTO!`)
                  .setDescription(`<:alerta_h:854929287525957642> ➠ **Usuário banido:** ${member.user.tag} \n <:3857_pepe_police:854927430850445313> ➠ **Autor:** ${interaction.user.tag} \n <:NetherStart:859788804789108797> ➠ **Motivo:** ${motivo}`)
                  .setFooter(`${interaction.user.tag}`, interaction.user.displayAvatarURL())
                  .setColor("ORANGE")
        
                  interaction.guild.channels.cache.get(`844251449391448085`).send({
                    embeds: [pEmbed]
                })
          
          interaction.editReply("<:aviso:854929386394615848> Usuário punido com sucesso!")
    }
}