const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        })
        console.log("Banco conectado! o/");
    } catch (e) {
        console.log(e)
    }
}

module.exports = { connect }