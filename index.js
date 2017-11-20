const Discord = require("discord.js");
const client = new Discord.Client();
let {
    readFileSync
} = require('fs');
let prefix = process.env.BOT_PREFIX;
let commands = {
    "": require('./js/command/general/commands.js')(client),
    "nsfw": require('./js/command/nsfw/commands.js')(client),
    "voice": require('./js/command/voice/commands.js')(client)
}
Array.prototype.random = function() {
    return this[parseInt(Math.random() * this.length)];
}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //client.user.setAvatar('avatar/cloudlea.png')
    //Playing...
    let gameStats = [
      "santiballs",
      "...hi?",
      "...bye!",
      "Hi-5!!!",
      "with mods",
      "cc.ig",
      "with CCLoader",
      "in multiplayer :o",
      "...Lea. -.-",
      "CrossCode v1"
    ]
    let newGame = function() {
        client.user.setGame(gameStats.random())
    };
    newGame()
    setInterval(newGame, 300000)
});

function onMessage(msg) {
    if (msg.guild.ownerID !== msg.author.id)
        return;
    let args = msg.content.split(' ');
    let _prefix = args.shift();
    if (!_prefix.startsWith(prefix))
        return;
    let type = _prefix.substring(1).trim()
    let commandType = commands[type]
    if (!commandType) {
        commands[""].error(msg, args, type)
        return;
    }
    let command = args.shift()
    let func = commandType[command]
    if (func) {
        func(msg, args, command, console)
    } else {
        commands[""].error(msg, args, command)
    }

}
client.on('message', onMessage);
client.login(process.env.BOT_TOKEN);
