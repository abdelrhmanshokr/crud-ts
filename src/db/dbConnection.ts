import mongoose from 'mongoose';

export async function dbconnect(): Promise<void>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`, {
            
        });
        console.log('connected to mongoose');
    }catch(err: any){
        console.log(err.message);
    }
}





