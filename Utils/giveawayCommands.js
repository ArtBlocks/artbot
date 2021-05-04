const {
  MessageEmbed
} = require("discord.js");


async function handleGiveawayMessage(msg, bot) {

    const ms = require('ms'); // npm install ms
    const args = msg.content.slice('giveaway!'.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // giveaway!start 2d 1 Awesome prize!
    // Will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
    

    // If this is a valid command, and the member doesn't have enough permissions, return an error
    if ((command === "start") || (command === "reroll") || (command === "end")) {
        if(!msg.member.hasPermission('MANAGE_MESSAGES') && !msg.member.roles.cache.some((r) => r.name === "giveaway master")){
            return msg.channel.send(':x: You need to have the right permissions to start giveaways.');
        }
    }

    if (command === "start") {

        // Giveaway duration
        let giveawayDuration = args[0];
        // If the duration isn't valid
        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return msg.channel.send(':x: You have to specify a valid duration!');
        }

        // Number of winners
        let giveawayNumberWinners = args[1];
        // If the specified number of winners is not a number
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return msg.channel.send(':x: You have to specify a valid number of winners!');
        }

        // Giveaway prize
        let giveawayPrize = args.slice(2).join(' ');
        // If no prize is specified
        if(!giveawayPrize){
            return msg.channel.send(':x: You have to specify a valid prize!');
        }

        bot.giveawaysManager.start(msg.channel, {
            time: ms(giveawayDuration),
            winnerCount: parseInt(giveawayNumberWinners),
            prize: giveawayPrize,
            messages: {
                giveaway:  "\n🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded:  "\n🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                embedFooter: ""
            }
        }).then((gData) => {
            console.log(gData); // {...} (messageID, end date and more)
        });
        // And the giveaway has started!
    }

    if (command === "end") {
        // If no message ID or giveaway name is specified
        if(!args[0]){
            return msg.channel.send(':x: You have to specify a valid message ID!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway = 
            // Search with giveaway prize
            bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if(!giveaway){
            return msg.channel.send('Unable to find a giveaway for `'+ args.join(' ') + '`.');
        }

        // Edit the giveaway
        bot.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
        // Success message
        .then(() => {
                // Success message
                msg.channel.send('Giveaway will end in less than '+(bot.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
        })
        .catch((e) => {
                if(e.toString().startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
                    msg.channel.send('This giveaway is already ended!');
                } else {
                    console.error(e);
                    msg.channel.send('An error occured...');
                }
        });
    }

    if (command === "reroll") {
        // If no message ID or giveaway name is specified
        if(!args[0]){
            return msg.channel.send(':x: You have to specify a valid message ID!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway = 
            // Search with giveaway prize
            bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if(!giveaway){
            return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
        }

        // Reroll the giveaway
        bot.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
                   // Success message
                   msg.channel.send('Giveaway rerolled!');
        })
        .catch((e) => {
                if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                msg.channel.send('This giveaway is not ended!');
                } else {
                console.error(e);
                msg.channel.send('An error occured...');
                }
        });
    }
}

module.exports.handleGiveawayMessage = handleGiveawayMessage;
