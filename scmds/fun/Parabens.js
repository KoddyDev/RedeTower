const Discord = require("discord.js"); 
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const moment = require("moment")
let set = new Set()
module.exports = {
    name: 'parabens',
    aliases: [''], 
    categories : 'Utils', 
    description: 'Secreto!',
    usage: '',
        /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        
        let dataHJ = moment(interaction.createdTimestamp).format("MM:DD").split(":")
        if(interaction.user.id === "444998672292511754") return interaction.editReply("Você é chato, não gosto de você.").then(f => { setTimeout(async () => {
            const { createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');

            const connection = joinVoiceChannel({
                channelId: "876659411689562182",
                guildId: "787442006800597012",
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
    
    
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                }
            });
    const ytdl = require("ytdl-core-discord")
            const res = createAudioResource((await ytdl("https://www.youtube.com/watch?v=fbZs9IOz9rs")))
    
            player.play(res)
    
            connection.subscribe(player);
            
        }, 2000)})
        if(dataHJ[1] !== '15' || dataHJ[0] !== '08') return interaction.editReply("Hoje não é o aniversario do Emanuel!").then(async f => {
            const { createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');

            const connection = joinVoiceChannel({
                channelId: "876659411689562182",
                guildId: "787442006800597012",
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
    
    
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                }
            });
    const ytdl = require("ytdl-core-discord")
            const res = createAudioResource((await ytdl("https://www.youtube.com/watch?v=N9ay5Srl5ts")))
    
            player.play(res)
    
            connection.subscribe(player);
        })
        if(set.has(interaction.guildId)) return interaction.editReply("Ja cantei parabéns pro Emanuel hoje.").then(f => { setTimeout(() => {
            interaction.deleteReply()
        }, 2000)})
  
        interaction.editReply("Parabéns pro Emanuel...")
        setTimeout(() => {
            interaction.channel.send("Parabéns pro Emanuel...\nNesta data querida!\nMuitas felicidades!\nMuitos anos de vida!")
            setTimeout(() => {
                interaction.channel.send("Parabéns pro Emanuel...\nNesta data querida!\nMuitas felicidades!\nMuitos anos de vida!")
                setTimeout(() => {
                    interaction.channel.send(`É pique, é pique\nÉ pique, é pique, é pique\nÉ hora, é hora\nÉ hora, é hora, é hora\nRa-tim-bum!`)
                }, 3000)
            }, 3000)
        }, 3000)
        set.add(interaction.guildId)
        
        const { createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');

        const connection = joinVoiceChannel({
            channelId: "876659411689562182",
            guildId: "787442006800597012",
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });


        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            }
        });
const ytdl = require("ytdl-core-discord")
        const res = createAudioResource((await ytdl("https://www.youtube.com/watch?v=ZRFT2lWBJJg")))

        player.play(res)

        connection.subscribe(player);
    }
}