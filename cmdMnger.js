const { Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  
  // slashcommands start
  const slashCommands = await globPromise(
    `${process.cwd()}/scmds/**/*.js`
  );
  const arrayofslashCommands = [];

  slashCommands.map((value) => {
    
    const file = require(value);
    if (!file?.name) return;
    client.srequires.set(value, value)
    client.slashCommands.set(file.name, file);
    arrayofslashCommands.push(file);
  });
      await client.guilds.cache.get("787442006800597012").commands.set(arrayofslashCommands);
    console.log("Comandos slash adicionados com sucesso.")
};
