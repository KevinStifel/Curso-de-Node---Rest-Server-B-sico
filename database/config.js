import mongoose from 'mongoose';


const dbConnection = async () => {

    // Esto significa que se va a guardar todo en mi base de datos, inclusive los campos que no estan definidos en mi schema, está por defecto en false.
    mongoose.set("strictQuery", false);

    // Esta es una alternativa a usar try catch
    await mongoose.connect( process.env.MONGODB_CNN ).catch( (error) => {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    });

    console.log('Base de datos inicializada correctamente'); 
};


export { dbConnection };