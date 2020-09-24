// READLINE TEST
// https://nodejs.org/api/readline.html#readline_readline
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });

// http://robotjs.io/docs/examples
{
	var robot = require("robotjs");

	// Speed up the mouse.
	robot.setMouseDelay(2);

	var twoPI = Math.PI * 2.0;
	var screenSize = robot.getScreenSize();
	var height = (screenSize.height / 2) - 10;
	var width = screenSize.width;

	for (var x = 0; x < width; x++)
	{
		y = height * Math.sin((twoPI * x) / width) + height;
		robot.moveMouse(x, y);
	}
}


// console.log(robot.env)
// robot.setXDisplayName(process.env.DISPLAY);
// // process.env.DISPLAY = 0;
// robot.env.DISPLAY = 0;
// robot.typeString("Hello World");// Type "Hello World".
// // robot.keyTap("enter");// Press enter.