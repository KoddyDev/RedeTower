const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ajuda',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Visualizar o comando de ajuda',
    usage: '',
        /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        let categoriasEmbed = new Discord.MessageEmbed()
        .setTitle(`<:duvida:839654180981178388> AJUDA!`)
        .setDescription(` \n Selecione abaixo uma categoria de comandos. \n \n <:mineplaneta:855440184014012427> ➠ Utilidades. \n <:NetherStart:859788804789108797> ➠ Diversão. \n <:dinheiro:788215923986399243> ➠ Economia. \n <:machado:856293916341174312> ➠ Administração. \n`)
        .setColor('ORANGE')

    const utilidadesEmbed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle('<:mineplaneta:855440184014012427> UTILIDADES!')
        .addField('t.avatar (usuário)', 'Obtenha a foto de perfil de um usuário.')
        .addField('t.ip', 'Obtenha o endereço de IP do servidor*(MC)*.')
        .addField('t.links', 'Obtenha os links das redes sociais do servidor.')
        .addField('t.mchead (nickname)', 'Obtenha a cabeça da conta de Minecraft do nick informado.')
        .addField('t.mcskin (nickname)', 'Obtenha a skin da conta de Minecraft do nick informado.')
        .addField('t.mcstatus', 'Obtenha informações do Servidor*(MC)*.')
        .addField('t.membros', 'Obtenha a quantidade de membros do Servidor (Discord).')
        .addField('t.ping', 'Obtenha a latência *(ping)* do BOT.')
        .addField('t.ticket ajuda', 'Obtenha a lista dos comandos do sistema de ticket.')
        .addField('t.denunciar', 'Denúncie um usuário para o servidor.')
        .addField('t.pesquisar (pesquisa)', 'Pesquise algo no Google pelo BOT.')
        .addField('t.serverinfo', 'Obtenha informações do Servidor. *(Discord)*')
        .addField('t.sugerir', 'Faça uma sugestão para o servidor.')
        .addField('t.uptime', 'Obtenha o uptime *(tempo online)* do BOT.')
        .addField('t.userinfo (usuário)', 'Obtenha informações de um usuário.')
    const diversaoEmbed = new Discord.MessageEmbed() 
        .setColor('ORANGE')
        .setTitle('<:NetherStart:859788804789108797> DIVERSÃO!')
        .addField('t.8ball (pergunta)', 'Faça uma pergunta ao BOT.')
        .addField('t.coinflip (cara/coroa)', 'Aposte na cara ou coroa.')
        .addField('t.ejetar (usuário)', 'Ejete um usuário como no Among Us.')
        .addField('t.atirar (usuário)', 'Dê um tiro em algum usuário.')
        .addField('t.tableflip', 'Faça uma animação com o BOT.')

    const economiaEmbed = new Discord.MessageEmbed() 
        .setColor('ORANGE')
        .setTitle('<:dinheiro:788215923986399243> ECONOMIA!')
        .addField('t.mochila', 'Veja informações da sua mochila.')
        .addField('t.coins ajuda', 'Veja o menu de ajuda sobre os coins.')
        .addField('t.daily', 'Recolha uma recompensa diária.')
        .addField('t.pescar', 'Pesque e ganhe peixes.')
        .addField('t.minerar', 'Minere e ganhe minérios.')
        .addField('t.vender', 'Venda os seus peixes e minérios e ganhe coins.')

	const adminEmbed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle('<:machado:856293916341174312> ADMINISTRAÇÃO!')
        .addField('t.anunciar', 'Faça o BOT anunciar uma mensagem.')
        .addField('t.ban (usuário) (motivo)', 'Aplique um banimento em um usuário.')
        .addField('t.unban (ID)', 'Desbana um usuário que foi banido.')
        .addField('t.kick (usuário) (motivo)', 'Expulse um usuário do servidor.')
        .addField('t.limpar (valor)', 'Limpe mensagens do chat com o BOT.')
        .addField('t.say (mensagem)', 'Faça que o BOT fale algo por você.')
        .addField('t.embed (mensagem)', 'Faça que o BOT fale algo por você em uma embed.')
        .addField('t.sorteio', 'Faça um que o BOT inicie um sorteio.')
        .addField('t.mute (usuário) (tempo) (motivo)', 'Faça que o BOT mute um usuário temporariamente.')
        .addField('t.unmute (usuário)', 'Faça que o BOT desmute um usuário.')
        .addField('t.lock', 'Faça que o BOT bloqueie o chat do canal que você estiver.')
        .addField('t.unlock', 'Faça que o BOT desbloqueie o canal que você estiver')
        .addField('t.addcoins (usuário) (quantia)', 'Adicione coins para um usuário.')
        .addField('t.removecoins (usuário) (quantia)', 'Remova coins de um usuário.')
        .addField('t.enquete', 'Faça que o BOT crie uma nova enquete.')
        .addField('t.changelog', 'Crie uma changelog com o BOT.')
        .addField('t.captcha', 'Crie a mesagem do captcha.')
        .addField('t.reload (comando)', 'Faça que o BOT recarregue o comando informado.')


	

        interaction.editReply({
        embeds: [categoriasEmbed]
    }).then(msg => {
        msg.react('855440184014012427');
        msg.react('859788804789108797');
		msg.react('788215923986399243');
        msg.react('856293916341174312');
        const collector = msg.createReactionCollector((r, u) => u.id === interaction.user.id)
        collector.on("collect", (reaction, user) => {
            
            reaction.users.remove(interaction.user.id)

            if(user.bot) return;

            switch (reaction.emoji.name) {
                case 'mineplaneta':
                    interaction.editReply({embeds: [utilidadesEmbed]})
                    break;
                case 'NetherStart':
                    interaction.editReply({embeds: [diversaoEmbed]})
                    break;
                case 'dinheiro':
                    interaction.editReply({embeds: [economiaEmbed]})
                    break;
                case 'machado':
                    interaction.editReply({embeds: [adminEmbed]})
                    break;
                defualt : null
                break;
                }
            })
        });
    }
}