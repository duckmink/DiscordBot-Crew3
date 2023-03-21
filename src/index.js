const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("✅ The bot is ready! ✅");
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const userID = interaction.user.id;
  const userName = interaction.user.username;
  //fetch API
  const init = {
    "x-api-key": process.env.CREW3_API,
  };
  const header = new Headers(init);
  async function postData(
    url = `https://api.crew3.xyz/communities/twogeinu/users?discordId=${userID}`
  ) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: header,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(),
    });
    return response.json();
  }

  // rank
  if (interaction.commandName === "rank") {
    //reply
    postData().then((data) => {
        interaction.reply(`${userName} is currently rank ${data.rank} with ${data.xp} exp. 🐶`);
    });
  }

  // level
  if (interaction.commandName === "level") {
    //reply
    postData().then((data) => {
        interaction.reply(`${userName} is currently rank ${data.level} with ${data.xp} exp. 🐶`);
    });
  }
  
});

client.login(process.env.TOKEN);
