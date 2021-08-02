// select how do you wanna run the app
const url = 3

// get the ip4 with ipconfig in window with ipconfig
const ip4 = "http://10.0.0.5"

// var server
let server =  null

// var frontend
let frontend = null


// dev
if(url === 1) {server = `http://localhost:3000`; frontend = `http://localhost:4000`}

// network
if(url === 2) {server = `${ip4}:3000`; frontend = `${ip4}:4000`} 

// production
if(url === 3) {server = "https://my-own-drive.xyz/"; frontend = `https://gabrieltrinidad0101.github.io`}

//production and dev
if(url === 4) {server = "https://my-own-drive.xyz/"; frontend = `http://localhost:4000`}


//export the url
console.log(frontend,server);
module.exports = {frontend,server}