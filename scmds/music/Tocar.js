const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const discord = require('discord.js')

const { joinVoiceChannel, createAudioResource } = require('@discordjs/voice');


const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'tocar',
    aliases: ['abc'], 
    categories : 'Musica', 
    description: 'Faça eu tocar musicas em seu canal de voz!',
    usage: '',
    options: [
        {
            name: "parametros-pesquisa",
            description: "Nome do video/musica no youtube.",
            type: "STRING",
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const parametrosPesquisa = interaction.options.get("parametros-pesquisa").value

let channel = interaction.member.voice.channel;

    if(!channel) return interaction.editReply('Você precisa entrar em um canal de voz primeiro!')

const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlValid = pattern.test(parametrosPesquisa)
    let playlist = null;
    let videos = [];
    console.log(urlValid)
    if(urlValid) {
        
        const server = interaction.client.queue.get(interaction.guild.id);
        try {
            playlist = await scrapeYt.getPlaylist(args[0].split("?list=")[1]);
            videos = playlist.videos
            const queueConstruct = {
                textChannel: interaction.channel,
                voiceChannel: channel,
                connection: null,
                songs: [],
                volume: 4,
                playing: true,
                loop: false
            };

            for (var i = 0; i < videos.length; i++) {

    
                let result = videos[i]
console.log(result)
                var song = {
                    id: result.id,
                    title: result.title,
                    duration: result.duration,
                    thumbnail: result.thumbnail,
                    upload: result.uploadDate,
                    views: result.viewCount,
                    requester: interaction.user,
                    channel: result.channel.name,
                    channelurl: result.channel.url
                  };

                  if (server) {
                    return server.songs.push(song);
                } else {
                    queueConstruct.songs.push(song);
                }

            }
if(server) {
    let embed = new discord.MessageEmbed()
    .setTitle('Adicionada na fila de musica a playlist!')
    .setFooter(interaction.guild.name + " - © 2021").setColor("#00ffff").setTimestamp()
    .addField('Nome', playlist.title, true)
    .setThumbnail(song.thumbnail)
    .addField('👀 Visualizações', playlist.viewCount, true)
    .addField('Pedido por', interaction.user.username, true)
     return interaction.editReply({
        embeds: [embed]
    })
}

            client.queue.set(interaction.guild.id, queueConstruct);
           
            const play = async song => {
                const queue = interaction.client.queue.get(interaction.guild.id);
                if (!song) {
                    queue.voiceChannel.leave();
                    interaction.client.queue.delete(interaction.guild.id);
                    interaction.editReply('As musicas acabaram, saindo do canal.')
                    return;
                }
                let noiceEmbed = new discord.MessageEmbed()
                .setTitle('Começando a tocar')
                .setThumbnail(song.thumbnail)
                .addField('Nome', song.title, true)
                .addField('Pedido por', song.requester, true)
                .addField('Visualizações', song.views, true)
                interaction.editReply({
                    embeds: [noiceEmbed]
                })
                const dispatcher = queue.player.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
                    filter: format => ['251'],
                    highWaterMark: 1 << 25
                }), {
                    type: 'opus'
                }
                    .on('finish', () => {
                        let serverQueue = client.queue.get(interaction.guild.id);
                        if (serverQueue.loop === true) serverQueue.songs.push(serverQueue.songs.shift());
                        else serverQueue.songs.shift();
                        play(queue.songs[0]);
                    })
                    .on('error', error => console.error(error)));
                    dispatcher.setVolumeLogarithmic(queue.volume / 5);
                }
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                queueConstruct.connection = connection;
                connection.subscribe(player);
                play(queueConstruct.songs[0]);
        } catch (err) {
            console.log(err)
        }
    } else {
   interaction.editReply("🔍 | Pesquisando...")
    const server = interaction.client.queue.get(interaction.guild.id);
    let video = await scrapeYt.search(parametrosPesquisa, {limit: 5})
    let numer = 0
    let embedSearch2 = new discord.MessageEmbed()
    .setTitle("Escolha uma musica!")
    let texto = ""
    for (var i = 0; i < video.length; i++) {
        texto += `${video[i].title} - ${i+1}\n`
        
     }
     embedSearch2.setDescription("Escolha uma musica de 1 a " + (video.length) + ", digite no chat a baixo\n\n"+texto)
     interaction.editReply({embeds: [embedSearch2]}).then(async msg1 => {
         const filter = async x => x.author.id == interaction.user.id
        let c1 = interaction.channel.createMessageCollector({ filter, time: 60000 * 20,max:1})
        .on('collect', async c => { 
            if(isNaN(parseInt(c.content))) return interaction.editReply("Insira um numero valido!")
            if(c.content > video.length+1) return interaction.editReply("Insira um numero de 1 a " + (video.lenght+1) + "!")
        numer = c.content-1
        let result = video[numer]

    const song = {
        id: result.id,
        title: result.title,
        duration: result.duration,
        thumbnail: result.thumbnail,
        upload: result.uploadDate,
        views: result.viewCount,
        requester: interaction.user,
        channel: result.channel.name,
        channelurl: result.channel.url
      };

    var date = new Date(0);
    date.setSeconds(song.duration); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);



    const queueConstruct = {
        textChannel: interaction.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 4,
        playing: true,
        loop: false,
        player: null
    };
    client.queue.set(interaction.guild.id, queueConstruct);
    queueConstruct.songs.push(song);


    const play = async song => {
        const queue = interaction.client.queue.get(interaction.guild.id);
        if (!song) {
            queue.player.stop()
            interaction.client.queue.delete(interaction.guild.id);
            interaction.editReply('As musicas acabaram, saindo do canal.')
            return;
        }

        const fs = require('fs');


        const res = createAudioResource((await ytdl('http://www.youtube.com/watch?v='+song.id)).on('end', error => {
            let serverQueue = client.queue.get(interaction.guild.id);
            if (serverQueue.loop === true) serverQueue.songs.push(serverQueue.songs.shift());
            else serverQueue.songs.shift();
            play(queue.songs[0]);
    }))

        queue.player.play(res)
          

        }
    try {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            }
        });

        queueConstruct.player = player
        
        c.channel.sendTyping()
        c.channel.send("Entrando no canal...")
        if (server) {
            server.songs.push(song);
            let embed = new discord.MessageEmbed()
            .setTitle('Adicionada na fila de musica!')
            .setFooter(interaction.guild.name + " - © 2021").setColor("#00ffff").setTimestamp()
            .addField('Nome', song.title, true)
            .setThumbnail(song.thumbnail)
            .addField('👀 Visualizações', song.views.toString().toLocaleString('pt-br'), true)
            .addField('Pedido por', song.requester.toString(), true)
            .addField('Duração', timeString.toString(), true)
            interaction.channel.send({
                embeds: [embed]
            })
        }
        c.channel.send("Agora é só curtir com o novo DJ da rede tower :D")

        c.delete()
        queueConstruct.connection = connection;
        connection.subscribe(player);
        play(queueConstruct.songs[0]);

        
        
    } catch (error) {
        console.error(error);
        interaction.client.queue.delete(interaction.guild.id);
        
        return interaction.editReply(`Não pude entrar neste canal de voz pelo erro: ${error}`);
    }
})
})
    }
    }
}