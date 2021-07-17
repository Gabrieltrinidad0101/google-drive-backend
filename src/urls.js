const network = true

//server
const urlServerNetwork = "http://10.0.0.9:3000/"
const urlServer = "http://localhost:3000/"


//frontend
const urlFrontendNetwork = "http://10.0.0.9:4000"
const urlFrontend = "https://gabrieltrinidad0101.github.io/google-drive-frontend" //"http://localhost:4000"


const frontend = network ? urlFrontend : urlFrontendNetwork
const server = network ? urlServer : urlServerNetwork

console.log(frontend,"   ",server);

module.exports = {frontend,server}