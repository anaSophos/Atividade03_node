const mongoose =require('mongoose')

const conn = async()=>{

    const database_url = 'mongodb+srv://admin:admin@treinamentoapicanaa.9ai1jxk.mongodb.net/?retryWrites=true&w=majority'

    try{
        await mongoose.connect(database_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }catch(err){
        console.log(err)
    }

}


module.exports = conn