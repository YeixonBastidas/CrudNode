const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        
       console.log(process.env.MONGODB)
       await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser : true,
            useUnifiedTopology: true
            //useCreateIndex: true,
           //s useFindAndModify: false
       });

       console.log("DB online.....")
    } catch (error) {
        //throw new Error("Error al momento de conectar la DB", error);
        console.log(error)
    }
}


module.exports = {
     dbConection
};