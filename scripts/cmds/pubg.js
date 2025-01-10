const axios = require("axios");

// Define a sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  config: {
    name: "pubg",
    aliases: ["battleroyale", "pubg"],
    version: "1.0",
    author: "Rifat",
    countDown: 5,
    role: 0,
    category: "game",
    shortDescription: {
      en: "Join a PUBG-style battle royale!",
    },
    longDescription: {
      en: "Survive until the end in a PUBG-style battle royale. Fight, loot, and win!",
    },
    guide: {
      en: `
Usage: 
- {pn} join - Join the battle royale
- {pn} start - Start the match (admin only)
`,
    },
  },

  // Keep track of players and game state
  gameState: {
    players: [],
    isStarted: false,
  },

  onStart: async function ({ message, event, args }) {
    const { senderID, threadID } = event;
    const command = args[0]?.toLowerCase();

    // Commands: Join or Start
    if (command === "join") {
      if (this.gameState.isStarted) {
        return message.reply("The match has already started! Wait for the next round.");
      }
      if (this.gameState.players.includes(senderID)) {
        return message.reply("You have already joined the match!");
      }

      this.gameState.players.push(senderID);
      return message.reply("You have joined the battle royale! 🪂");
    }

    if (command === "start") {
      if (this.gameState.isStarted) {
        return message.reply("The match is already in progress!");
      }
      if (this.gameState.players.length < 2) {
        return message.reply("Not enough players to start the match. At least 2 players are required.");
      }

      this.gameState.isStarted = true;
      return this.startMatch({ message, threadID });
    }

    return message.reply("Invalid command! Use 'join' to enter the game or 'start' to begin.");
  },

  async startMatch({ message, threadID }) {
    let { players } = this.gameState;
    const weapons = ["Pan", "AKM", "M416", "Sniper Rifle", "Grenade"];
    const moves = [
      { name: "Shoot", minDamage: 10, maxDamage: 30 },
      { name: "Throw Grenade", minDamage: 10, maxDamage: 30 },
      { name: "Punch", minDamage: 5, maxDamage: 20 },
      { name: "Headshot", minDamage: 30, maxDamage: 50 },
    ];

    const getRandomDamage = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    let fightLog = "🎮 **PUBG Battle Royale Log** 🎮\n\n";

    // Initialize health for all players
    const health = players.reduce((acc, player) => {
      acc[player] = 100;
      return acc;
    }, {});

    // Simulate the battle
    while (players.length > 1) {
      // Random attacker and defender
      const attacker = randomElement(players);
      let defender;
      do {
        defender = randomElement(players);
      } while (defender === attacker);

      // Random weapon and move
      const weapon = randomElement(weapons);
      const move = randomElement(moves);
      const damage = getRandomDamage(move.minDamage, move.maxDamage);

      // Inflict damage
      health[defender] -= damage;
      health[defender] = Math.max(0, health[defender]); // Prevent negative health

      fightLog += `🔫 **${attacker}** attacked **${defender}** with a **${weapon}** using **${move.name}** and dealt **${damage}** damage! \n`;
      fightLog += `- **${defender}'s Health:** ${health[defender]} HP\n\n`;

      // Check if defender is eliminated
      if (health[defender] <= 0) {
        fightLog += `💀 **${defender}** has been eliminated!\n\n`;
        players = players.filter((player) => player !== defender);
      }

      await sleep(1000); // Add delay for dramatic effect
    }

    // Declare the winner
    const winner = players[0];
    fightLog += `🏆 **${winner}** is the last one standing and wins the Battle Royale! 🥇`;

    // Reset the game state
    this.gameState.players = [];
    this.gameState.isStarted = false;

    message.reply(fightLog);
  },
};