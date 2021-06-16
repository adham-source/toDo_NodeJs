// Used file app js module
const appExp = require('./src/app')

// Used port number
const localPort = 3000

// Listen
appExp.listen(localPort, () => `port : ${localPort} `)