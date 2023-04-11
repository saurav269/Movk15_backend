  


    const mongoose = require("mongoose")
    
    const connection = mongoose.connect("mongodb+srv://sauravmallik:mallik@cluster0.gmgtybz.mongodb.net/?retryWrites=true&w=majority")
    
    module.exports={
        connection
    }