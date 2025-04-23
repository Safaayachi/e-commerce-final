const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Connect to database only when handling requests
app.use(async (req, res, next) => {
	try {
		await connectDB();
		next();
	} catch (error) {
		console.error("Database connection error:", error);
		res.status(500).json({
			message: "Server error - Database connection failed",
		});
	}
});

// For local development only
if (process.env.NODE_ENV !== "production") {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for serverless use
module.exports = app;
