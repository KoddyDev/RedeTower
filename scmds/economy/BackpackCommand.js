const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

const db = require("quick.db")

module.exports = {
    name: 'inventario',
    aliases: ['abc'], 
    categories : 'Economia', 
    description: 'Visualize seu inventario.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let user = interaction.user
        let itens = db.fetch(user.id)
    
        let tartaruga = db.get(`tartaruga_${user.id}`)
        if(tartaruga === null) tartaruga = "<:discordo:860311683578462268>"
    
        let lula = db.get(`lula_${user.id}`)
        if(lula === null) lula = "<:discordo:860311683578462268>" 
    
        let polvo  = db.get(`polvo_${user.id}`)
        if(polvo === null) polvo = "<:discordo:860311683578462268>" 
    
        let lagosta = db.get(`lagosta_${user.id}`)
        if(lagosta === null) lagosta = "<:discordo:860311683578462268>" 
    
        let camarao = db.get(`camarao_${user.id}`)
        if(camarao === null) camarao = "<:discordo:860311683578462268>"
    
        let siri = db.get(`siri_${user.id}`)
        if(siri === null) siri = "<:discordo:860311683578462268>"
    
        let baiacu = db.get(`baiacu_${user.id}`)
        if(baiacu === null) baiacu = "<:discordo:860311683578462268>"
    
        let peixetropical = db.get(`peixetropical_${user.id}`)
        if(peixetropical === null) peixetropical = "<:discordo:860311683578462268>"
    
        let peixecomum = db.get(`peixecomum_${user.id}`)
        if(peixecomum === null) peixecomum = "<:discordo:860311683578462268>"
    
        let varadepesca = db.get(`varadepesca_${user.id}`)
        if(varadepesca === null) varadepesca = "❌ não possui."
    
        let picareta = db.get(`picareta_${user.id}`)
        if(picareta === null) picareta = "<:discordo:860311683578462268>"
    
        let carvao = db.get(`carvao_${user.id}`)
        if(carvao === null) carvao = "<:discordo:860311683578462268>"
    
        let ouro = db.get(`ouro_${user.id}`)
        if(ouro === null) ouro = "<:discordo:860311683578462268>"
        
        let ferro = db.get(`ferro_${user.id}`)
        if(ferro === null) ferro = "<:discordo:860311683578462268>"
        
        let crystal = db.get(`crystal_${user.id}`)
        if(crystal === null) crystal = "<:discordo:860311683578462268>"
        
        let ruby = db.get(`ruby_${user.id}`)
        if(ruby === null) ruby = "<:discordo:860311683578462268>"
        
        let diamante = db.get(`diamante_${user.id}`)
        if(diamante === null) diamante = "<:discordo:860311683578462268>"
        
        let pedra = db.get(`pedra_${user.id}`)
        if(pedra === null) pedra = "<:discordo:860311683578462268>"
        
        let esmeralda = db.get(`esmeralda_${user.id}`)
        if(esmeralda === null) esmeralda = "<:discordo:860311683578462268>"
    
        const mochila = new Discord.MessageEmbed()
            .setTitle(`<a:minecraft_chest:810634241067057193> **MOCHILA!**`)
            .setDescription('<:aviso:854929386394615848> Selecione abaixo uma categoria da mochila. \n \n <a:picareta:854928624183672883> ➠ Ferramentas. \n 🐟  ➠ Peixes. \n <a:block:855048383147933716> ➠ Minérios. \n \n ')
            .setColor('ORANGE')
			
        const utilitarios = new Discord.MessageEmbed()
            .setTitle(`<a:minecraft_chest:810634241067057193> FERRAMENTAS!`)
            .setDescription('Você está na categoria de Ferramentas. \n \n <:pesca:837411840341704704> ➠ **Vara de Pesca:** '+varadepesca+'\n <a:picareta:854928624183672883> ➠ **Picareta:** '+picareta+'\n \n ')
            .setColor('ORANGE')
	
        const pescas = new Discord.MessageEmbed()
            .setTitle(`<a:minecraft_chest:810634241067057193> PEIXES!`)
            .setDescription('Você está na categoria de Peixes. \n \n 🐢 ➠ **Tartaruga:** '+tartaruga+'\n 🦑 ➠ **Lula:** '+lula+'\n 🐙 ➠ **Polvo:** '+polvo+'\n 🦞 ➠ **Lagosta:** '+lagosta+'\n 🦐 ➠ **Camarão:** '+camarao+'\n 🦀 ➠ **Siri:** '+siri+'\n 🐡 ➠ **Baiacu:** '+baiacu+'\n 🐠 ➠ **Peixe Tropical:** '+peixetropical+'\n 🐟 ➠ **Peixe Comum:** '+peixecomum+'\n \n ')
			.setColor('ORANGE')
		
        const minerios = new Discord.MessageEmbed()
            .setTitle(`<a:minecraft_chest:810634241067057193> MINÉRIOS!`)
            .setDescription('Você está na categoria de Minérios. \n \n <:carvao:859789129326657574> ➠ **Carvão:** '+carvao+'\n <:Ouro:859789095815479337> ➠ **Ouro:** '+ouro+'\n <:ferro:859789055179620383> ➠ **Ferro:** '+ferro+'\n <:NetherStart:859788804789108797> ➠ **Cystal:** '+crystal+' \n <:killer:859789451920277535> ➠ **Ruby:** '+ruby+'\n <:Diamante:859788648085061702> ➠ **Diamante:** '+diamante+'\n <:Stone:859788495739945016> ➠ **Pedra:** '+pedra+'\n <:Esmeralda:859788561564958751> ➠ **Esmeralda:** '+esmeralda+' \n \n ')
            .setColor(`ORANGE`)
        
            let bFerramentas = new Discord.MessageButton()
            .setCustomId("ferramentas")
            .setEmoji("854928624183672883")
            .setStyle("DANGER")
            .setLabel("Ferramentas")

            let bPeixes = new Discord.MessageButton()
            .setCustomId("peixes")
            .setEmoji("🐟")
            .setStyle("DANGER")
            .setLabel("Peixes")

            let bMinerios = new Discord.MessageButton()
            .setCustomId("minerios")
            .setEmoji("855048383147933716")
            .setStyle("DANGER")
            .setLabel("Minerios")
    
        interaction.editReply({
            embeds: [mochila],
            components: [new Discord.MessageActionRow().addComponents(bFerramentas).addComponents(bPeixes).addComponents(bMinerios)]
        }).then(msg => { 
             const filter2 = (b) => b.user.id === interaction.user.id
            let col = msg.createMessageComponentCollector({ filter: filter2, time: 150000})
                col.on('collect', async (b) => {
                    
                    if(b.isButton()) {
                        await b.deferReply()
                        await b.deleteReply()
                        if(b.customId === "ferramentas") {
                            interaction.editReply({embeds: [minerios],
                                components: [new Discord.MessageActionRow().addComponents(bFerramentas.setStyle("SUCCESS")).addComponents(bPeixes.setStyle("DANGER")).addComponents(bMinerios.setStyle("DANGER"))]
                            })
                        }
                        if(b.customId === "peixes") {
                            interaction.editReply({embeds: [pescas],
                                components: [new Discord.MessageActionRow().addComponents(bFerramentas.setStyle("DANGER")).addComponents(bPeixes.setStyle("SUCCESS")).addComponents(bMinerios.setStyle("DANGER"))]
                            })
                        }
                        if(b.customId === "minerios") {
                            interaction.editReply({embeds: [minerios],
                                components: [new Discord.MessageActionRow().addComponents(bFerramentas.setStyle("DANGER")).addComponents(bPeixes.setStyle("DANGER")).addComponents(bMinerios.setStyle("SUCCESS"))]
                            })
                        }
                }
            })
        });
    }
}