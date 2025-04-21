// seeder.js - Script to populate database with sample data

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Orders");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Sample data
const users = [
	{
		name: "Admin User",
		email: "admin@example.com",
		password: "password123",
		isAdmin: true,
	},
	{
		name: "John Doe",
		email: "john@example.com",
		password: "password123",
		isAdmin: false,
	},
	{
		name: "Jane Smith",
		email: "jane@example.com",
		password: "password123",
		isAdmin: false,
	},
];

const products = [
	{
		name: "iPhone 14 Pro",
		description:
			"The latest iPhone with advanced features and powerful performance.",
		price: 999.99,
		countInStock: 15,
		imageUrl: "https://example.com/iphone14pro.jpg",
		category: "Electronics",
	},
	{
		name: "Samsung Galaxy S23",
		description:
			"High-end Android smartphone with premium features and excellent camera.",
		price: 899.99,
		countInStock: 12,
		imageUrl: "https://example.com/galaxys23.jpg",
		category: "Electronics",
	},
	{
		name: "MacBook Pro M2",
		description:
			"Powerful laptop with Apple Silicon, ideal for professionals and creatives.",
		price: 1499.99,
		countInStock: 8,
		imageUrl: "https://example.com/macbookprom2.jpg",
		category: "Electronics",
	},
	{
		name: "Sony WH-1000XM5",
		description:
			"Premium noise-cancelling headphones with superior sound quality.",
		price: 349.99,
		countInStock: 20,
		imageUrl: "https://example.com/sonywh1000xm5.jpg",
		category: "Audio",
	},
	{
		name: "Levi's 501 Original Jeans",
		description:
			"Classic straight fit jeans with iconic style and durability.",
		price: 59.99,
		countInStock: 35,
		imageUrl: "https://example.com/levis501.jpg",
		category: "Clothing",
	},
	{
		name: "Nike Air Max 270",
		description:
			"Comfortable athletic shoes with Air cushioning and stylish design.",
		price: 150.0,
		countInStock: 18,
		imageUrl: "https://example.com/nikeairmax270.jpg",
		category: "Footwear",
	},
	{
		name: "PlayStation 5",
		description:
			"Next-generation gaming console with fast loading times and immersive gameplay.",
		price: 499.99,
		countInStock: 5,
		imageUrl: "https://example.com/ps5.jpg",
		category: "Gaming",
	},
	{
		name: "Kindle Paperwhite",
		description:
			"E-reader with adjustable warm light and waterproof design.",
		price: 139.99,
		countInStock: 22,
		imageUrl: "https://example.com/kindlepaperwhite.jpg",
		category: "Electronics",
	},
];

// Import data into DB
const importData = async () => {
	try {
		// Clear existing data
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		console.log("Data cleared...");

		// Create users with hashed passwords
		const createdUsers = await User.insertMany(
			users.map((user) => ({
				name: user.name,
				email: user.email,
				password: bcrypt.hashSync(user.password, 10),
				isAdmin: user.isAdmin,
			}))
		);

		const adminUser = createdUsers[0]._id;

		// Add products
		const sampleProducts = products.map((product) => {
			return { ...product };
		});

		await Product.insertMany(sampleProducts);

		// Create sample orders
		const sampleOrder = {
			user: createdUsers[1]._id, // John Doe's ID
			orderItems: [
				{
					name: products[0].name,
					quantity: 1,
					price: products[0].price,
					product: (
						await Product.findOne({
							name: products[0].name,
						})
					)._id,
				},
				{
					name: products[3].name,
					quantity: 2,
					price: products[3].price,
					product: (
						await Product.findOne({
							name: products[3].name,
						})
					)._id,
				},
			],
			shippingAddress: {
				address: "123 Example St",
				city: "Test City",
				postalCode: "12345",
				country: "USA",
			},
			paymentMethod: "PayPal",
			totalPrice: products[0].price + products[3].price * 2,
			isPaid: false,
			isDelivered: false,
		};

		await Order.create(sampleOrder);

		console.log("Data imported successfully!");
		process.exit();
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

// Delete all data from DB
const destroyData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		console.log("Data destroyed successfully!");
		process.exit();
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

// Execute based on command argument
if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
