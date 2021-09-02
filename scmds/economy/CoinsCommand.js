const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const db = require("quick.db")

module.exports = {
    name: 'coins',
    aliases: ['abc'], 
    categories : 'Economia', 
    description: 'Veja quantos coins você tem!',
    usage: '',
    options: [
        {
            name: "valor",
            description: "Selecione oque deseja fazer!",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Ver coins",
                    value: "ver"
                },
                {
                    name: "Enviar coins",
                    value: "transferir"
                },
                {
                    name: "TOP coins",
                    value: "top"
                },
                {
                    name: "Remover coins",
                    value: "remover"
                },
                {
                    name: "Adicionar coins",
                    value: "adicionar"
                }
                
            ]
        },
        {
            name: "usuario",
            description: "Selecione um usuario caso necessario!",
            type: "USER",
            required: false,
        },
        {
            name: "quantia",
            description: "Selecione uma quantia de dinheiro caso necessario!",
            type: "INTEGER",
            required: false,
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const valorA = interaction.options.get("valor")

        if(valorA.value === "ver") {
            let user;
            if(interaction.options.get("usuario")) {
                user = client.users.cache.get(interaction.options.get("usuario").value)
            } else {
                user = interaction.user
            }
      
    	let coin = db.get(`coins_${user.id}`)
    	if(coin === null) coin = "0" 
    
		let coinembed = new Discord.MessageEmbed()
			.setTitle(`<:Ouro:859789095815479337> COINS!`)
			.setDescription(`<:dinheiro:788215923986399243> Coins de ${user}: **__`+coin.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`__** coins.`)
			.setFooter(`Use: '/coins' para mais comandos de economia.`, client.user.avatarURL())
			.setColor("ORANGE")
		interaction.editReply({
            embeds: [coinembed]
        });
        }

        if(valorA.value === "transferir") {
            let user = interaction.user;
    	let nick2 = interaction.options.get("usuario");

        let quantia = interaction.options.get("quantia");
        
    	let embedError1 = new Discord.MessageEmbed()
        	.setTitle(`<a:errado:706332824466227260> ERRO!`)
        	.setDescription(`Você deve inserir um usuário válido!`)
        	.setColor(`RED`)
    	if (!nick2 || nick2.user.id === interaction.user.id) return interaction.editReply({ embeds: [embedError1]})
        let nick3 = nick2.user
    	let enviar = interaction.user;
    	let enviarcoins = db.get(`coins_${user.id}`)
    	if(enviarcoins === null) enviarcoins = "0"
    	let embedError2 = new Discord.MessageEmbed()
        	.setTitle(`<a:errado:706332824466227260> ERRO!`)
        	.setDescription(`Você deve informar a quantia que deseja enviar.`)
        	.setColor(`RED`)
    	if (!quantia) return interaction.editReply({ embeds: [embedError2]})
        quantia = quantia.value
        let embedError4 = new Discord.MessageEmbed()
        	.setTitle(`<a:errado:706332824466227260> ERRO!`)
        	.setDescription(`Você não tem dinheiro suficiente.`)
        	.setColor(`RED`)
        if (enviarcoins < quantia) return interaction.editReply({ embeds: [embedError4]})
        let confirmacaoEmbed = new Discord.MessageEmbed()
        	.setTitle('<:alavanca:839619726535557120> CONFIRMAR!')
        	.setDescription('🤔 Você tem certeza que deseja realizar essa transação?\n\nReaja abaixo com <:correto:707762526917754940> para confirmar.\n\nReaja abaixo com <:errado:707762832929980486> para cancelar.')
        	.setFooter('Essa transação não pode ser desfeita após confirmada.')  
        	.setColor('#ffa000')
        
        interaction.channel.send({ embeds: [confirmacaoEmbed],
            components: [new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton({
                    emoji: {
                        animated: true,
                        id: "859799628597952512",
                        name: "certo"
                    },
                    customId: "sim",
                    style: "SUCCESS",
                    label: "Confirmar"
                }))
                .addComponents(new Discord.MessageButton({
                emoji: {
                    animated: true,
                    id: "859799628597952512",
                    name: "certo"
                }
            })
            .setCustomId("não")
            .setStyle("DANGER")
            .setLabel("Cancelar"))]
        }).then(async confirmar => {
            const filter2 = (b) => b.user.id === interaction.user.id
            let col = confirmar.createMessageComponentCollector({ filter: filter2, time: 150000})
                col.on('collect', async (b) => {
                    
                    if(b.isButton()) {
                        await b.deleteReply()

    			if (b.customId === "sim") {
                    let enviarcoins = db.get(`coins_${user.id}`)
                    if(enviarcoins === null) enviarcoins = "0"
                    let embedError4 = new Discord.MessageEmbed()
                    .setTitle(`<a:errado:706332824466227260> ERRO!`)
                    .setDescription(`Você não tem dinheiro suficiente.`)
                    .setColor(`RED`)
                    if (enviarcoins < quantia){
                    interaction.channel.send({ embeds: [embedError4]})
                    } else {
        			db.add(`coins_${nick3.id}`, quantia)
  					db.subtract(`coins_${user.id}`, quantia)
        			let embedSucesso = new Discord.MessageEmbed()
        				.setTitle(`<:correto:707762526917754940> SUCESSO!`)
        				.setDescription(`Você enviou **${quantia.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} coins** para <@!${nick3.id}>!`)
        				.setColor(`GREEN`)
        			interaction.channel.send({
                        embeds: [embedSucesso]
                    })
        }
    }

        if (b.customId === "não") {
        	let naoEnviadoEmbed = new Discord.MessageEmbed()
        		.setTitle(`<:alavanca:839619726535557120> SUCESSO!`)
        		.setDescription('Transação cancelada.')
        		.setColor('RED')
            interaction.channel.send({
                embeds: [naoEnviadoEmbed]
            })
        }
    }
       })
      })
        }

        if(valorA.value === "adicionar") {
            let semPerm = new Discord.MessageEmbed()
            .setTitle(`<a:errado:706332824466227260> ERRO!`)
            .setDescription(`Você não tem permissão para isso.`)
            .setColor(`RED`)
            
        if (!interaction.member.roles.cache.has('787816334565572639')) return interaction.editReply({
            embeds: [semPerm]
        })
        let user = interaction.user;
        const nick4 = interaction.options.get("usuario");


        let embedError1 = new Discord.MessageEmbed()
            .setTitle(`<a:errado:706332824466227260> ERRO!`)
            .setDescription(`Você deve mencionar ou informar um ID de usuário válido!`)
            .setColor(`RED`)
            
        if (!nick4 || !nick4.user) return interaction.editReply({
            embeds: [embedError1]
        })
        const nick5 = nick4.user
        let quantia = interaction.options.get("quantia")
        let embedError2 = new Discord.MessageEmbed()
            .setTitle(`<a:errado:706332824466227260> ERRO!`)
            .setDescription(`Você deve informar a quantia que deseja adicionar.`)
            .setColor(`RED`)
            
        if (!quantia) return interaction.editReply({
            embeds: [embedError2]
        })
        quantia = quantia.value
        let confirmacaoEmbed = new Discord.MessageEmbed()
            .setTitle('<:alavanca:839619726535557120> CONFIRMAR!')
            .setDescription('🤔 Você tem certeza que deseja realizar essa operação?\n\nReaja abaixo com <:correto:707762526917754940> para confirmar.\n\nReaja abaixo com <:errado:707762832929980486> para cancelar.')
            .setFooter('Essa operação não pode ser desfeita após confirmada.')  
            .setColor('#ffa000')
        
        interaction.editReply({
            embeds: [confirmacaoEmbed],
            components: [new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton({
                    emoji: {
                        animated: true,
                        id: "859799628597952512",
                        name: "certo"
                    },
                    customId: "sim",
                    style: "SUCCESS",
                    label: "Confirmar"
                }))
                .addComponents(new Discord.MessageButton({
                emoji: {
                    animated: true,
                    id: "859799628597952512",
                    name: "certo"
                }
            })
            .setCustomId("não")
            .setStyle("DANGER")
            .setLabel("Cancelar"))]
        }).then(async confirmar => {
            const filter2 = (b) => b.user.id === interaction.user.id
            let col = confirmar.createMessageComponentCollector({ filter: filter2, time: 150000})
                col.on('collect', async (b) => {
                    
                    if(b.isButton()) {
                        await b.deleteReply()

    			if (b.customId === "sim") {
                    db.add(`coins_${nick5.id}`, quantia)
                    let embedSucesso = new Discord.MessageEmbed()
                        .setTitle(`<:correto:707762526917754940> SUCESSO!`)
                        .setDescription(`Você adicionou **${quantia.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} coins** para ${nick5}!`)
                        .setColor(`GREEN`)
                    interaction.channel.send({
                        embeds: [embedSucesso]
                    })
        }

        if (b.customId === "não") {
            let naoEnviadoEmbed = new Discord.MessageEmbed()
                .setTitle(`<:alavanca:839619726535557120> SUCESSO!`)
                .setDescription('Operação cancelada.')
                .setColor('RED')
            
            interaction.editReply({
                embeds: [naoEnviadoEmbed]
            })
        }
       }
    })
      })
        }
        if(valorA.value === "remover") {
            let semPerm = new Discord.MessageEmbed()
        	.setTitle(`<a:errado:706332824466227260> ERRO!`)
        	.setDescription(`Você não tem permissão para isso.`)
        	.setColor(`RED`)
        	.setFooter(`Use: 't.coins ajuda' para mais comandos de economia.`, client.user.avatarURL())
        if (!interaction.member.roles.cache.has('787816334565572639')) return interaction.channel.send({
            embeds: [semPerm]
        })
    	let user = interaction.user;
        let nick4 = interaction.options.get("usuario");

    	let embedError1 = new Discord.MessageEmbed()
        	.setTitle(`<a:errado:706332824466227260> ERRO!`)
        	.setDescription(`Você deve mencionar ou informar um ID de usuário válido!`)
        	.setColor(`RED`)

            if (!nick4 || !nick4.user) return interaction.editReply({
                embeds: [embedError1]
            })

            nick4 = nick4.user
    	let embedError2 = new Discord.MessageEmbed()
        	.setTitle(`<a:errado:706332824466227260> ERRO!`)
        	.setDescription(`Você deve informar a quantia que deseja remover.`)
        	.setColor(`RED`)
            let quantia = interaction.options.get("quantia")

    	if (!quantia) return interaction.editReply({
            embeds: [embedError2]
        })
        quantia  = quantia.value

        let embedError4 = new Discord.MessageEmbed()
        	.setTitle(`<a:errado:706332824466227260> ERRO!`)
        	.setDescription(`Você quer remover mais dinheiro do que o coitado tem?`)
        	.setColor(`RED`)


        let coitado = db.get(`coins_${nick4.id}`)
        

        let confirmacaoEmbed = new Discord.MessageEmbed()
        	.setTitle('<:alavanca:839619726535557120> CONFIRMAR!')
        	.setDescription('🤔 Você tem certeza que deseja realizar essa operação?\n\nReaja abaixo com <:correto:707762526917754940> para confirmar.\n\nReaja abaixo com <:errado:707762832929980486> para cancelar.')
        	.setFooter('Essa operação não pode ser desfeita após confirmada.')  
        	.setColor('#ffa000');


            
        (coitado < quantia ?  (
            await interaction.editReply({
            embeds: [embedError4],
            components: [new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton({
                    emoji: {
                        animated: true,
                        id: "859799628597952512",
                        name: "certo"
                    },
                    customId: "sim",
                    style: "SUCCESS",
                    label: "Confirmar"
                }))
                .addComponents(new Discord.MessageButton({
                emoji: {
                    animated: true,
                    id: "859799628597952512",
                    name: "certo"
                }
            })
            .setCustomId("não")
            .setStyle("DANGER")
            .setLabel("Cancelar"))]
        }).then(async confirmar => {
            const filter2 = (b) => b.user.id === interaction.user.id
            let col = confirmar.createMessageComponentCollector({ filter: filter2, time: 150000})
                col.on('collect', async (b) => {
                    
                    if(b.isButton()) {
                        await b.deleteReply()

    			if (b.customId === "sim") {
        			confirmar.delete
  					db.subtract(`coins_${nick4.id}`, quantia)
        			let embedSucesso = new Discord.MessageEmbed()
        				.setTitle(`<:correto:707762526917754940> SUCESSO!`)
        				.setDescription(`Você removeu **${quantia} coins** de <@!${nick4.id}>!`)
        				.setColor(`GREEN`)
        			interaction.channel.send({
                        embeds: [embedSucesso]
                    })
        }

        if (b.customId === "não") {
        	let naoEnviadoEmbed = new Discord.MessageEmbed()
        		.setTitle(`<:alavanca:839619726535557120> SUCESSO!`)
        		.setDescription('Operação cancelada.')
        		.setColor('RED')
            confirmar.delete
            interaction.channel.send({
                embeds: [naoEnviadoEmbed]
            })
        }
    }
       })
      }) ) : ( msg = await interaction.editReply({
            embeds: [confirmacaoEmbed],
            components: [new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton({
                    emoji: {
                        animated: true,
                        id: "859799628597952512",
                        name: "certo"
                    },
                    customId: "sim",
                    style: "SUCCESS",
                    label: "Confirmar"
                }))
            .addComponents(new Discord.MessageButton({
                emoji: {
                    animated: true,
                    id: "859777462615539712",
                    name: "naoo"
                }
            })
            .setCustomId("não")
            .setStyle("DANGER")
            .setLabel("Cancelar"))]
        }).then(async confirmar => {
            const filter2 = (b) => b.user.id === interaction.user.id
            let col = confirmar.createMessageComponentCollector({ filter: filter2, time: 150000})
                col.on('collect', async (b) => {
                    
                    if(b.isButton()) {
                        await b.deferReply()
                        await b.deleteReply()

    			if (b.customId === "sim") {
        			confirmar.delete
  					db.subtract(`coins_${nick4.id}`, quantia)
        			let embedSucesso = new Discord.MessageEmbed()
        				.setTitle(`<:correto:707762526917754940> SUCESSO!`)
        				.setDescription(`Você removeu **${quantia} coins** de <@!${nick4.id}>!`)
        				.setColor(`GREEN`)
        			interaction.channel.send({
                        embeds: [embedSucesso]
                    })
        }

        if (b.customId === "não") {
        	let naoEnviadoEmbed = new Discord.MessageEmbed()
        		.setTitle(`<:alavanca:839619726535557120> SUCESSO!`)
        		.setDescription('Operação cancelada.')
        		.setColor('RED')
            confirmar.delete
            interaction.channel.send({
                embeds: [naoEnviadoEmbed]
            })
        }
    }
       })
      })
      )

        )


        

        
    }
        if(valorA.value === "top") {
            let user = interaction.user;
    	let guild = interaction.guild;
    	const coins = db
    		.all()
   			.filter((data) => data.ID.startsWith(`coins`))
    		.sort((a, b) => b.data - a.data);
  		const userBalance = await db.fetch(`coins_${user.id}`);
  		coins.length = 10;
  		let finalLb = "";
        for (let i in coins) {
    		if (coins[i].data === null) coins[i].data = 0;
    		let userData = client.users.cache.get(coins[i].ID.split("_")[1])
      		? client.users.cache.get(coins[i].ID.split("_")[1]).tag
      		: "Ninguém";
  
    		finalLb += `**${coins.indexOf(coins[i]) + 1}º** ${userData} ➠ \`${
      			coins[i].data.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    		}\` coins.\n`;
  		}
  
  		let embed = new Discord.MessageEmbed()
    		.setTitle(`<:mineplaneta:855440184014012427> TOP RANKING!`)
    		.setDescription( `${finalLb ? finalLb : "Nenhum para listar."}`)
    		.setColor("BLUE")
    		.setFooter(`Seu saldo: ${userBalance ? userBalance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : 0} coins.`);
        interaction.editReply({embeds: [embed]});
        }
    }
}