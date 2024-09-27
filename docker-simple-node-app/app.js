const start = performance.now(); // Start time in milliseconds with high precision
console.log("HELLO WORLD - SIMPLE DOCKER EXAMPLE!");
console.log(1);

async function main() {
	console.log(2);

	const asyncFunction = callAsyncFunction(); //Even when you are storing the function in a variable. It triggers and calls the function.

	console.log(4);
	await asyncFunction; //Must wrap await in an async function. This will ensure that code will no longer run and it will "WAIT" for the async function to complete and move synchronously afterwards logging 5 and Finished hello world.
	console.log(7);

	console.log("FINISHED HELLO DOCKER FILE.");

	const end = performance.now();
	const executionTime = end - start;
	//The .toFixed(3) method rounds the number to 3 decimal places and returns a string representation of the number. For example, if executionTime is 12.345678, it would be rounded to 12.346.
	console.log(8);
	console.log(`Execution Time: ${executionTime.toFixed(3)} ms`);
}

main(); //run main function. Doesn't have to be called main. Can call it whatever function you want, just named it that.

console.log(5); //this runs because we are "await asyncFunction", meaning no other console log within "main" function can run until that function is fully complete. So it just goes out of "main()" function and tries to run remaining synchronous programming lines until await is complete so it goes and reads the next line after "main()" which is "console.log(5)". Since this is the last line of code, await asyncFunction will first wait for waitSeconds to finish, print clg(6) and the "end of async function" line and then it will go to clg(7) and print remaining console logs within main() in order.

async function callAsyncFunction(seconds = 10) {
	console.log(`BEFORE AWAIT STATEMENT IN ASYNC FUNCTION. Waiting for ${seconds} seconds.`);
	console.log(3);

	await waitSeconds(seconds);
	console.log(6);
	console.log("END OF ASYNC FUNCTION 'testAsyncFunction'");
}

function waitSeconds(numOfSeconds) {
	const seconds = 1000 * numOfSeconds; //1000 milliseconds = 1 second.
	return new Promise(resolve => setTimeout(resolve, seconds));
}
