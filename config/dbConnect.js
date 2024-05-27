const mongoose = require('mongoose');

//function to connect to the database
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('la base de donneé est connecté avec succés');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

dbConnect();