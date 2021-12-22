const express = require('express')
const fs = require("fs")
const qrcode = require('qrcode')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;


module.exports = (senku) => {
try{	
let lastqr = false
senku.on("qr", qr =>{
	qrcode.toDataURL(qr, function (err, url) {
	lastqr = url
	io.emit('qr', lastqr)
	})
})	
senku.on("open", () =>{
	io.emit('con', {jid: senku.user.jid})
	lastqr = false
})
senku.on("close", () => io.emit('close', "IDLE"))
io.on('connection', () => io.emit('config', global.configs))
io.on('connection', (socket) => lastqr ? io.emit('qr', lastqr) : io.emit('con', {jid: senku.user ? senku.user.jid : false})); 
app.use(express.static('public'))
server.listen(PORT, () => {
	console.log(`Server Berjalan Di Port ${PORT}`)
});
} catch {	
}
}
