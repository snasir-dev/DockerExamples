const express = require("express");
const app = express();
// const PORT = parseInt(process.env.PORT || "5000");
const PORT = 5000;

// Base URL for the server
const baseUrl = `http://localhost:${PORT}`;

// Helper function to create a route
const createRoute = (path, example = "") => ({
	routePath: path, //endpoint like "/user/:id" or "/users"
	routeUrl: `${baseUrl}${path === "/" ? "" : path}`,
	// ...(example ? { routeExample: example } : {}), // Conditionally add routeExample property "..." Spread operator is a must
	routeExample: example ? example : undefined,
});

// Helper function to create a route dynamically. Must be used inside of app.get
// const createRoute = (path, req) => ({
// 	routePath: path,
// 	routeUrl: `${req.protocol}://${req.get("host")}${path}`,
// });

const UserRoutes = {
	default: createRoute("/"),
	mockUserData: createRoute("/mock-user-data"),
	randomUser: createRoute("/random-user"),
	specificUser: createRoute("/user/:id", `${baseUrl}/user/12345`),
	allUsers: createRoute("/users"),
};
console.log(UserRoutes);

// Default Route Path. This is what you will see when you open http://localhost:{PORT}.  Ex: http://localhost:5000/
app.get(UserRoutes.default.routePath, (req, res) => {
	// API general information object
	const apiInfo = {
		name: "User Management API",
		version: "0.0.0",
		description:
			"A simple Node.js Express API using mock JSON data for user management. It allows for basic operations to retrieve mock users.",
		primaryFunction:
			"This API demonstrates user data handling with mock data and is designed to be containerized using Docker.",
		usage: [
			{
				endpoint: "/mock-user-data",
				description:
					"Returns full list of the json file for the mock user data. Sorted in Ascending Order by Created Date ",
			},
			{ endpoint: "/random-user", description: "Returns a random user." },
			{ endpoint: "/user/:id", description: "Returns a specific user by ID." },
			{
				endpoint: "/users",
				description: "Returns all users. Max 10 Users Returned. Sorts by User Created Date in Descending Order",
			},
		],
		documentation: "https://docs.example.com", // Sample documentation URL
		author: "Syed S. Nasir",
		// license: "MIT",
		dockerSupport: true,
	};

	console.log(UserRoutes);
	//No need to convert the userObj into a string representation of JSON. res.json will automatically take care of this. res.json(user) automatically converts the JavaScript object user into a JSON-formatted response.
	res.json({
		apiInfo,
		availableRoutes: UserRoutes,
	});
});

// Import the mock users data from mockUsers.js
// Will use this mock user data for the /user/:id and the /users api calls.
const mockUsers = require("./mockUserData");

//API get call to provide data for a random user.
//To access this data, go to url http://localhost:5000/random-user
app.get(UserRoutes.randomUser.routePath, (req, res) => {
	// const userJsonObject = {
	// 	id: 56371,
	// 	firstName: "Elizabeth",
	// 	lastName: "Turner",
	// 	// fullName: firstName + lastName,
	// 	//Getter functions are not included by random in the response.
	// 	get fullName() {
	// 		return this.firstName + " " + this.lastName;
	// 	},
	// 	age: 34,
	// 	email: "test@email.com",
	// 	createdDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // Subtracting 25 days
	// };
	// //This will not properly print out fullName. Just prints fullName: "Getter"
	// console.log(userJsonObject);

	// const userWithFullName = {
	// 	...userJsonObject, // Spread the properties of userJsonObject
	// 	fullName: userJsonObject.fullName, // Add the fullName explicitly
	// };
	// //This will properly print out fullName.
	// console.log(userWithFullName);

	// // Add the new userWithFullName to the mockUsers array
	// mockUsers.push(userWithFullName);
	// console.log(mockUsers[mockUsers.length - 1]);

	// Select a random user from the mockUsers array
	// #region explanation of Math.random / Math.floor
	// - Math.random():
	// This function generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
	// When you multiply this value by `mockUsers.length`, it produces a number between 0 and the length of the mockUsers array (exclusive).

	// - Math.floor():
	// This function rounds down the result of the multiplication to the nearest whole number.
	// Since array indices are whole numbers, we use `Math.floor` to ensure that the generated index is valid (i.e., it will be between 0 and mockUsers.length - 1).

	// The combination of these functions allows you to randomly select a valid index from the `mockUsers` array, enabling you to retrieve a random user from it.
	// #endregion
	const randomUserIndex = Math.floor(Math.random() * mockUsers.length);
	const randomUser = mockUsers[randomUserIndex];
	console.log(randomUser);
	//No need to convert the userObj into a string representation of JSON. res.json will automatically take care of this. res.json(user) automatically converts the JavaScript object user into a JSON-formatted response.
	res.json({
		result: randomUser,
		availableRoutes: UserRoutes,
	});
});

//API call to get all Mock User Data
//To access this data, go to url http://localhost:5000/mock-user-data
app.get(UserRoutes.mockUserData.routePath, (req, res) => {
	//Sort descending order by Created Date.
	const sortedByCreatedUsersDateAsc = mockUsers.sort(
		(a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
	);
	res.json({
		result: sortedByCreatedUsersDateAsc,
		availableRoutes: UserRoutes,
	});
});

//API get call to provide data for a single user with the given userid. Currently tries to match users within mockUserData file.
//To access this data, go to url http://localhost:5000/user/{userid} where {userid} is dynamic.
app.get(UserRoutes.specificUser.routePath, (req, res) => {
	// console.log(req);

	const userId = parseInt(req.params.id, 10); // Get the ID from the request parameters and convert to an integer
	console.log("User Id:" + userId);

	// Find the user with the matching ID
	const user = mockUsers.find(u => u.id === userId);

	if (user) {
		console.log(user);
		res.json({
			result: user,
			availableRoutes: UserRoutes,
		});
	} else {
		// If no user matches, return a 404 response
		res.status(404).json({
			message: `User not found! Please ensure you provide a valid user ID in the format: ${baseUrl}/user/{userid}, where {userid} is the ID of the user you're trying to access. Example: ${baseUrl}/user/12345`,
			availableRoutes: UserRoutes,
		});
	}
});

//API Get call to provide data for all users.
//If mockUsers has more then 10 users, will return the top 10 latest users (Users sorted by Created Date (Descending Order).
// Note each time code is re run it will generate a random Created Date, so the top 10 users will be different.
// This is only for running code again, if just refreshing the values remain the same since mockUserData is static and it does not re-generate the data once created.
//To access this data, go to url http://localhost:5000/users
app.get(UserRoutes.allUsers.routePath, (req, res) => {
	console.log(mockUsers.length);

	//Sort descending order by Created Date.
	const sortedByCreatedUsersDesc = mockUsers.sort((a, b) => b.createdDate - a.createdDate);

	//Return only the top 10 users.
	const top10Users = sortedByCreatedUsersDesc > 10 ? sortedByCreatedUsersDesc.slice(0, 10) : sortedByCreatedUsersDesc;

	console.log("Top 10 Latest Created Users:");
	console.log(top10Users);
	// console.log(mockUsers); //Log all users in Mock Users.
	//No need to convert the userObj into a string representation of JSON. res.json will automatically take care of this. res.json(user) automatically converts the JavaScript object user into a JSON-formatted response.
	res.json({
		result: top10Users,
		availableRoutes: UserRoutes,
	});
});

app.listen(PORT, () => {
	console.log(
		`Node.js Express simple User API App listening on port ${PORT}. Open http://localhost:5000/ to see results in the browser. It is highly recommended that JSON Formatter Extension (https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) or another similar Web extension to easily format JSON data is installed to easily visualize and navigate through the data. `,
	);
});

//TO RUN THIS Application - USE COMMAND "node index.js"
//Open http://localhost:5000/ - to see results.
