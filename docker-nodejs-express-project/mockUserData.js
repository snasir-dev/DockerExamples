// Function to generate a random date in the last 10 years
function getRandomDate() {
	// Generate a random number of milliseconds (up to 10 years in the past)
	const tenYearsInMilliseconds = 1000 * 60 * 60 * 24 * 365 * 10;
	const randomMilliseconds = Math.floor(Math.random() * tenYearsInMilliseconds);

	// Subtract the random milliseconds from the current date
	return new Date(Date.now() - randomMilliseconds);
}

// Array of mock user data
const mockUsers = [
	{
		id: 12345,
		firstName: "Syed",
		lastName: "Nasir",
		age: 30,
		email: "test@test.com",
		createdDate: new Date(1990, 0, 1),
	},
	{
		id: 56371,
		firstName: "Elizabeth",
		lastName: "Turner",
		age: 34,
		email: "elizabeth.turner@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 98765,
		firstName: "Jack",
		lastName: "Sparrow",
		age: 45,
		email: "jack.sparrow@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 45678,
		firstName: "Will",
		lastName: "Turner",
		age: 38,
		email: "will.turner@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 10293,
		firstName: "John",
		lastName: "Doe",
		age: 29,
		email: "john.doe@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 99821,
		firstName: "Jane",
		lastName: "Smith",
		age: 32,
		email: "jane.smith@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 29187,
		firstName: "Alice",
		lastName: "Johnson",
		age: 40,
		email: "alice.johnson@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 67543,
		firstName: "Bob",
		lastName: "Williams",
		age: 50,
		email: "bob.williams@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 33287,
		firstName: "Charlie",
		lastName: "Brown",
		age: 28,
		email: "charlie.brown@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 87265,
		firstName: "Lucy",
		lastName: "Wilson",
		age: 36,
		email: "lucy.wilson@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 78923,
		firstName: "Tom",
		lastName: "Hanks",
		age: 43,
		email: "tom.hanks@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 43521,
		firstName: "Emily",
		lastName: "Blunt",
		age: 33,
		email: "emily.blunt@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 65432,
		firstName: "Michael",
		lastName: "Jordan",
		age: 55,
		email: "michael.jordan@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 91234,
		firstName: "Sarah",
		lastName: "Connor",
		age: 37,
		email: "sarah.connor@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 87653,
		firstName: "Tony",
		lastName: "Stark",
		age: 48,
		email: "tony.stark@email.com",
		createdDate: getRandomDate(),
	},
	{
		id: 34567,
		firstName: "Natasha",
		lastName: "Romanoff",
		age: 30,
		email: "natasha.romanoff@email.com",
		createdDate: getRandomDate(),
	},
];

//Add fullName field.
const users = mockUsers.map(user => ({
	...user,
	fullName: `${user.firstName} ${user.lastName}`,
}));

// Export the users array so it can be imported in other files
module.exports = users;
