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


// flat 2D stuff


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




// vr 3d stuff

const SCENE = document.querySelector('a-scene');

class Sphere {
	constructor(config={}) {
		// this.element = document.createElement('a-image')
		// this.element.setAttribute('src', 'delet.gif');
		// this.element.setAttribute('opacity', '0.5');


		// this.element.setAttribute('shadow', 'cast:false; receive: false;');

		this.element = document.createElement('a-sphere')
		this.element.setAttribute('color', config.color || 'white');
		this.element.setAttribute('radius', '0.01');
		this.element.setAttribute('material', "shader: flat")


		this.element.setAttribute('position', `${config.pos_x} ${config.pos_y} ${config.pos_z}`);
		SCENE.appendChild(this.element)
	}
}
class Marker extends Sphere {
	// this is just a convenience class
	constructor(x, y, z) {
		super({pos_x:x, pos_y:y, pos_z:z})
	}
}

class Plane {
	constructor(config={}) {

		this.element = document.createElement('a-plane')
		this.element.setAttribute('color', config.color || 'white');
		this.element.setAttribute('height', '1');
		this.element.setAttribute('width', '1');
		// this.element.setAttribute('material', "shader: flat");
		this.element.setAttribute('rotation', '-90 0 0');
		this.element.setAttribute('opacity', '0.2');

		this.element.setAttribute('position', `${config.pos_x} ${config.pos_y} ${config.pos_z}`);
		SCENE.appendChild(this.element)

	}
}
class FloorPannel extends Plane{
	constructor(x, z, ) {
		super({pos_x:x, pos_y:0, pos_z:z})
	}
}


// class EventCube

function do_3d_stuff() {
	// make a floor
	for (let i = -10; i <= 10; i++) {
		// for (let j = -10; j <= 10; j++) {
			for (let k = -10; k <= 10; k++) {
				new Marker(i, 0, k)
			}
		// }
	}
	for (let i = -4;  i < 4; i++) {
		for (let k = -8; k < 0; k++) {
			let color = (i+k) % 2 ? 'red' : 'white';
			new Plane({pos_x:i+.5, pos_y:0, pos_z:k-.5, color: color})
			// new FloorPannel(i+.5, k-.5);
			// new FloorPannel(i-.5, k-.5);
		}
	}
	// make some corner spires
	for (let i of [-10, 10]) {
		for (let j of [1, 2, 3]) {
			for (let k of [-10, 10]) {
				new Marker(i, j, k);
			}
		}
	}
	// make a neat circle to hold everything
	{
		this.element = document.createElement('a-ring')
		this.element.setAttribute('color', 'white');
		// this.element.setAttribute('height', `${Math.sqrt(20*20)}`);
		// this.element.setAttribute('width', `${Math.sqrt(20*20)}`);
		this.element.setAttribute('radius-inner', `${Math.sqrt(10*10+10*10)-0.005}`);
		this.element.setAttribute('radius-outer', `${Math.sqrt(10*10+10*10)+0.005}`);
		// this.element.setAttribute('width', '20');
		// this.element.setAttribute('material', "shader: flat");
		this.element.setAttribute('rotation', '-90 0 0');
		// this.element.setAttribute('opacity', '0.2');

		// this.element.setAttribute('position', `${config.pos_x} ${config.pos_y} ${config.pos_z}`);
		SCENE.appendChild(this.element)

	}
}


do_stuff();
do_3d_stuff();