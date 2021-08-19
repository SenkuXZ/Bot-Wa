const fs = require("fs")
const { color } = require("./color")
m = '```'
/**
 * 
 * @param {String} name fileSha256
 * @param {String} command command
 * @param {Object} _dir dir array
 */
const addSticker = async (name, command, _dir) => {
    _dir[name] = {text: command}
    fs.writeFileSync("./database/stickerdb.json", JSON.stringify(_dir))
    console.log(color("add "+command, "yellow"))
}
/**
 * 
 * @param {String} name command
 * @param {Object} _dir dir_name
 */
const delCommand = (name, _dir) => {
   delete _dir[name]
   fs.writeFileSync("./database/stickerdb.json", JSON.stringify(_dir))
   console.log(color("delete "+name, "yellow"))
    
}
/**
 * 
 * @param {Object} _dir dir
 * @returns {String}
 */
const listCommand = async (_dir, reply, monospace) => {
    let itung = 1
    let cpt = `List Command Sticker\n\n\n`
     for (x in _dir) {
     cpt += ` ${itung++}. ID :\n${x} : ${_dir[x].text}\n\n`
        }
    reply(monospace(cpt))
}
module.exports = {
    addSticker,
    delCommand,
    listCommand
}