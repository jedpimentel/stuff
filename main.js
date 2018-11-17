// split this into different docs once this gets too long

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
		// return self ?
	}
};

class Circle extends Square {
	// is the equals thing necessary here?
	constructor(config={}) {
		super(config);
		this.element.style.borderRadius = "50%";
	}

}

function do_stuff() {

	// place a default square
	new Square();

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
		}
	}
}

// vr 3d stuff
// 			  vr 3d stuff
// 						 vr 3d stuff

const SCENE = document.querySelector('a-scene');

class Sphere {
	constructor(config={}) {
		this.element = document.createElement('a-sphere')
		this.element.setAttribute('color', config.color || 'white');
		this.element.setAttribute('radius', '0.01');
		this.element.setAttribute('material', "shader: flat")
		this.element.setAttribute('position', `${config.pos_x} ${config.pos_y} ${config.pos_z}`);
		SCENE.appendChild(this.element)
	}
}
class Marker extends Sphere {
	// this is just a convenience thing
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
		this.element.setAttribute('radius-inner', `${Math.sqrt(10*10+10*10)-0.005}`);
		this.element.setAttribute('radius-outer', `${Math.sqrt(10*10+10*10)+0.005}`);
		// this.element.setAttribute('material', "shader: flat");
		this.element.setAttribute('rotation', '-90 0 0');
		SCENE.appendChild(this.element)
	}
	// play audio on cylinder click
	{
		let cyl = document.querySelector('#green-cyl');
		let audio = document.querySelector('#audio-clip');

		let paused_opacity = cyl.getAttribute('opacity');
		let playing_opacity = 0.4;

		cyl.addEventListener('click', function (evt) {
			cyl.setAttribute('opacity', playing_opacity)
			audio.currentTime = 0;
			audio.play();
		});
		audio.addEventListener('ended', () => {
			cyl.setAttribute('opacity', paused_opacity)
		});
	}
	// play video on cube click
	{
		let cube = document.querySelector('#blue-cube');
		let vid = document.querySelector('#video-asset');
		// first frame is annoying
		vid.currentTime = 1;

		let paused_opacity = cube.getAttribute('opacity');
		let playing_opacity = 0.4;
		cube.addEventListener('click', function (evt) {
			if (vid.paused) {
				cube.setAttribute('opacity', playing_opacity)
				vid.play();
			} else {
				vid.pause();
				cube.setAttribute('opacity', paused_opacity)
			}
		});
		vid.addEventListener('ended', () => {
			vid.currentTime = 1;
			cube.setAttribute('opacity', paused_opacity)
		});
	}
}

document.addEventListener("DOMContentLoaded", function(event) { 
	do_stuff();
	do_3d_stuff();
});

// CURRENT BUGS

// randomly get in console (seems related to images, sincce started getting two afrer adding more)
// cursor.js:190 Uncaught TypeError: Cannot read property 'parent' of undefined
//     at i.<anonymous> (cursor.js:190)
//     at HTMLCanvasElement.<anonymous> (bind.js:12)
