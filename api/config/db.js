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
			serverSelectionTimeoutMS: 30000, // Increase from default 10000ms to 30000ms
			socketTimeoutMS: 45000, // Socket timeout
			connectTimeoutMS: 30000, // Connection timeout
			keepAlive: true, // Keep connection alive
			keepAliveInitialDelay: 300000, // Keep alive signal delay
		});
		console.log("MongoDB Connected...");
		return mongoose.connection;
	} catch (err) {
		console.error("Database connection error:", err); // Log the full error for more details
		// Don't exit the process in a serverless environment
		throw err; // Throw the error instead so it can be handled by the caller
	}
};

module.exports = connectDB;
