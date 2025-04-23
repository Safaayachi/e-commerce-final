const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	if (mongoose.connection.readyState === 1) {
		return mongoose.connection;
	}

	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected...");
		return mongoose.connection;
	} catch (err) {
		console.error("Database connection error:", err);
	}
};

module.exports = connectDB;
