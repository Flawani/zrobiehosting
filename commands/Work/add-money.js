const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "add-money",
    category: "Work",
    description: "Dodaj Łybcie",
    usage: "<id | wzmianka>",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('Brakuje uprawnienia `MANAGE_GUILD` do korzystania z tego polecenia.').then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 2500);
                })
        }
        
        let user = message.mentions.members.first() || message.author

        if (isNaN(args[1])) return message.channel.send(`${message.author}, musisz wprowadzić poprawny numer, aby dodać.`)
        db.add(`Łybcie_${user.id}`, args[1])
        let bal = await db.fetch(`Łybcie_${user.id}`)

        let embed = new Discord.RichEmbed()
        .setAuthor(`Dodano pieniądze!`, message.author.displayAvatarURL)
        .addField(`Ilość`, `${args[1]}$`)
        .addField(`Aktualizacja salda`, `${bal}$`)
        .setColor("GREEN")
        .setTimestamp()
        
        message.channel.send(embed)
    }
}