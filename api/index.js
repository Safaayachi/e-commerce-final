// api/index.js - Modified for Vercel compatibility
const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDB()
	.then(() => {
		console.log("MongoDB Connected...");
	})
	.catch((err) => {
		console.error("Database connection failed:", err);
	});

// Your routes
app.use("/api/products", require("./routes/products"));
// Other routes...

// Only start server if not running in Vercel environment
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
	const PORT = process.env.PORT || 3002; // Changed to 3002 to avoid conflict
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

// Export for Vercel serverless function
module.exports = app;
