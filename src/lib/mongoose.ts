import mongoose from "mongoose";

const ConnectToDatabase =  async (): Promise<void> => {
    
    if(!process.env.MONGOURL) throw new Error('MONGOURL is not defined')

    try {

       await mongoose.connect(process.env.MONGOURL)
        console.log('Connected to Database')
        
        
    } catch (error) {
        console.log('error : ' , error)
    }
}

export default ConnectToDatabase