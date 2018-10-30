// split this into different docs once it reaches a thausand lines

// TODO: 
// - webcam mirror
// - 

// thing // size  // place
// square // 10, 10 // 10, 10

// ### 
// #
// ##
// #
// #	press F to do something


const square_color = 'gray';
const text_background = 'gray';
const std_size = 100;

const MainElement = document.getElementById("main");
MainElement.style.backgroundColor = '#AAAAAA ';

// =====

class Square {
	constructor(config={}) {

		// I should really clean this up, using the OR syntax might not really be proper
		let size_x = config.size_x || std_size;
		let size_y = config.size_y || std_size;
		let pos_x = config.pos_x || 10;
		let pos_y = config.pos_y || 10;

		// is there something better than divs?
		this.element = document.createElement("div");

		// Size and fill
		this.element.style.width = `${size_x}px`;
		this.element.style.height = `${size_y}px`;
		this.element.style.opacity = '0.2';
		this.element.style.backgroundColor = square_color;

		this.element.style.position = 'fixed';
		this.element.style.display = 'inline-block';
		this.element.style.left = `${pos_x}px`;
		this.element.style.top = `${pos_y}px`;

		MainElement.appendChild(this.element);

		console.log('stuff');
		// return self

	}
};

class Circle extends Square {
	// is the equals thing necessary here?
	constructor(config={}) {
		super(config);
		this.element.style.borderRadius = "50%";
	}

}


// not good anymore since Square was made into a class
// function Key(char, x, y) {
// 	self.element = Square(undefined, undefined, x, y).element
// 	const text = document.createElement("h1")
// 	text.style.fontSize = `${std_size}px`;	
// 	// maybe make the whole thing have the text background instead of just the h2?
// 	text.style.backgroundColor = text_background	
// 	text.style.margin = "0"	
// 	// holy shit, you're peeking into my thought process
// 	text.innerHTML = char
// 	self.element.appendChild(text)
// }

// let a = new Square()
new Square();


function do_stuff() {
	// Square()
	let loc = 10;
	const step = 110;

	for(let xi = 0; xi < 3; xi++) {
		for(let yi = 0; yi < 3; yi++) {
			let a = new Circle({
				size_x: 100,
				size_y: 100,
				pos_x: 100 + step*xi,
				pos_y: 100 + step*yi,
			});
				// 100
				// 100
				// 100 + step*xi
				// 100 + step*yi);
		}
	}
}

// function main_resize_script() {
// 	let x_max = document.documentElement.clientWidth;
// 	let y_max = document.documentElement.clientHeight;
// 	console.log(x_max, y_max)
// }

// main_resize_script();

// WARNING !!! This WILL probably need a rate limiter, add the refactor to the "Up Next"
// window.addEventListener('resize', main_resize_script);

// MAIN "DO STUFF" chunk, apparently it didn't like running before the class definition, 
// I guess classes arent hoisted like functions are, all this scope stuff is pretty confusing

do_stuff();