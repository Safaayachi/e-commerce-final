const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	// If already connected, return the existing connection
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
		console.error("Database connection error:", err.message);
		// Don't exit the process in a serverless environment
		throw err; // Throw the error instead so it can be handled by the caller
	}
};

module.exports = connectDB;
