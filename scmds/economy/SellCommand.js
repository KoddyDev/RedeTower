const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'vender',
    aliases: ['abc'], 
    categories : 'Economia', 
    description: 'Venda seus items.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let user = interaction.user;
    
        let tartaruga = db.get(`tartaruga_${user.id}`)
        if(tartaruga === null) tartaruga = "0"
    
        let lula = db.get(`lula_${user.id}`)
        if(lula === null) lula = "0" 
    
        let polvo  = db.get(`polvo_${user.id}`)
        if(polvo === null) polvo = "0" 
    
        let lagosta = db.get(`lagosta_${user.id}`)
        if(lagosta === null) lagosta = "0" 
    
        let camarao = db.get(`camarao_${user.id}`)
        if(camarao === null) camarao = "0"
    
        let siri = db.get(`siri_${user.id}`)
        if(siri === null) siri = "0"
    
        let baiacu = db.get(`baiacu_${user.id}`)
        if(baiacu === null) baiacu = "0"
    
        let peixetropical = db.get(`peixetropical_${user.id}`)
        if(peixetropical === null) peixetropical = "0"
    
        let peixecomum = db.get(`peixecomum_${user.id}`)
        if(peixecomum === null) peixecomum = "0" 
    
        let carvao = db.get(`carvao_${user.id}`)
        if(carvao === null) carvao = "0" 
    
        let ouro = db.get(`ouro_${user.id}`)
        if(ouro === null) ouro = "0" 
    
        let ferro = db.get(`ferro_${user.id}`)
        if(ferro === null) ferro = "0" 
    
        let crystal = db.get(`_${user.id}`)
        if(crystal === null) crystal = "0" 
    
        let ruby = db.get(`ruby_${user.id}`)
        if(ruby === null) ruby = "0" 
    
        let diamante = db.get(`diamante_${user.id}`)
        if(diamante === null) diamante = "0" 
    
        let pedra = db.get(`pedra_${user.id}`)
        if(pedra === null) pedra = "0" 
    
        let esmeralda = db.get(`esmeralda_${user.id}`)
        if(esmeralda === null) esmeralda = "0" 
    
        let vender = new Discord.MessageEmbed()
            .setTitle(`💰 VENDER!`)
            .setColor('ORANGE')
            .setDescription('<:aviso:854929386394615848> Seleciona abaixo uma categoria para vender. \n \n 🐟 ➠ Peixes. \n <a:block:855048383147933716> ➠ Minérios. \n \n ')
    
        let sempeixe = new Discord.MessageEmbed()
            .setTitle(`💰 VENDER!`)
            .setDescription('<:aviso:854929386394615848> Pesque antes, para depois poder vender.')
            .setColor('ORANGE')
    
        let semminerios = new Discord.MessageEmbed()
            .setTitle(`💰 VENDER!`)
            .setDescription('<:aviso:854929386394615848> Minere antes, para depois poder vender.')
            .setColor('ORANGE')
    
        interaction.editReply({
            embeds: [vender]
        }).then(msg => {
            msg.react('🐟');
            msg.react('855048383147933716');
            const filter = (r, u) => (r.emoji.name === '🐟', ':block:') && (u.id !== client.user.id && u.id === interaction.user.id)
            const collector = msg.createReactionCollector({filter})
            collector.on("collect", r => {
                switch (r.emoji.name) {
                    case '🐟':
                        if(tartaruga >0 || lula >0 || polvo >0 || lagosta >0 || camarao >0 || siri >0 || baiacu >0 || peixetropical >0 || peixecomum >0){
                            let vtartaruga = tartaruga*1;
                            let vlula = lula*2;
                            let vpolvo = polvo*5;
                            let vlagosta = lagosta*8;
                            let vcamarao = camarao*11;
                            let vsiri = siri*14;
                            let vbaiacu = baiacu*3;
                            let vpeixecomum = peixecomum*1;
                            let vpeixetropical = peixetropical*4;
                    
                            let valor = vtartaruga+vlula+vpolvo+vlagosta+vcamarao+vsiri+vbaiacu+vpeixecomum+vpeixetropical;
                            db.add(`coins_${user.id}`, valor)
                            db.set(`tartaruga_${user.id}`,0)
                            db.set(`lula_${user.id}`,0)
                            db.set(`polvo_${user.id}`,0)
                            db.set(`lagosta_${user.id}`,0)
                            db.set(`camarao_${user.id}`,0)
                            db.set(`siri_${user.id}`,0)
                            db.set(`baiacu_${user.id}`,0)
                            db.set(`peixecomum_${user.id}`,0)
                            db.set(`peixetropical_${user.id}`,0)
                    
                            let vendeupescas = new Discord.MessageEmbed()
                                .setTitle(`🐟 VENDA PEIXES!`)
                                .setDescription(`\n<a:minecraft_chest:810634241067057193> Saldo anterior: \n 🐢 ➠ **Tartaruga:** ${tartaruga} \n 🦑 ➠ **Lula:** ${lula}\n 🐙 ➠ **Polvo:** ${polvo}\n🦞 ➠ **Lagosta:** ${lagosta}\n🦐 ➠ **Camarão:** ${camarao}\n🦀 ➠ **Siri:** ${siri}\n🐡 ➠ **Baiacu:** ${baiacu}\n🐠 ➠ **Peixe Tropical:** ${peixetropical}\n🐟 ➠ **Peixe Comum:** ${peixecomum}\n \n <:dinheiro:788215923986399243> ➠ Você vendeu tudo por: **$${valor}**`)
                                .setColor("ORANGE")
                                
                            interaction.editReply({
                                embeds: [vendeupescas]
                            })
                        }else{
							
                            interaction.editReply({
                                embeds: [sempeixe]
                            })
                        }
                        msg.reactions.removeAll();
                    break;
                    case 'block':
                        if(pedra >0 || carvao >0 || ferro >0 || ouro >0 || diamante >0 || esmeralda >0 || ruby >0 || crystal >0){
                            let vpedra = pedra*2;
                            let vcarvao = carvao*3;
                            let vferro = ferro*5;
                            let vouro = ouro*6;
                            let vdiamante = diamante*7;
                            let vesmeralda = esmeralda*9;
                            let vruby = ruby*12;
                            let vcrystal= crystal*14;
                    
                            let valor = vpedra+vcarvao+vferro+vouro+vdiamante+vesmeralda+vruby+vcrystal;
                            db.add(`coins_${user.id}`, valor)
                            db.set(`pedra_${user.id}`,0)
                            db.set(`carvao_${user.id}`,0)
                            db.set(`ferro_${user.id}`,0)
                            db.set(`ouro_${user.id}`,0)
                            db.set(`diamante_${user.id}`,0)
                            db.set(`esmeralda_${user.id}`,0)
                            db.set(`ruby_${user.id}`,0)
                            db.set(`crystal_${user.id}`,0)
                    
                            let vendeuminerios = new Discord.MessageEmbed()
                                .setTitle(`<a:block:855048383147933716> VENDA MINÉRIOS!`)
                                .setDescription(`\n <a:minecraft_chest:810634241067057193> Saldo anterior: \n<:Stone:859788495739945016> ➠ **Pedra:** ${pedra}\n<:carvao:859789129326657574> ➠ **Carvão:** ${carvao}\n<:ferro:859789055179620383> ➠ **Ferro:** ${ferro}\n<:Ouro:859789095815479337> ➠ **Ouro:** ${ouro}\n<:Diamante:859788648085061702> ➠ **Diamante:** ${diamante}\n<:Esmeralda:859788561564958751> ➠ **Esmeralda:** ${esmeralda}\n<:killer:859789451920277535>➠ **Ruby:** ${ruby}\n<:NetherStart:859788804789108797> ➠ **Crystal:** ${crystal}\n \n <:dinheiro:788215923986399243> ➠ Você vendeu tudo por: **$${valor}**`)
                                .setColor("ORANGE")
                                
                            interaction.editReply({
                                embeds: [vendeuminerios]
                            })
                        }else{
							
                            interaction.editReply({
                                embeds: [semminerios]})
                        }
                        msg.reactions.removeAll();
                    break;
                }
            })
        });

    }
}