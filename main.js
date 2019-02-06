/* 2018-12-26 15:37 PM EST
I have moved my code so-far into a backup folder. I'll now remix this clone.


123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ 123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ zxcv */

// First we embed the aframe scene within a square (1000x100px, for now)
// Let's make an 0Panel (working title) to hold plain HTML
// 0panel is a righthand cpanel on desktops, and a "gameboy" setup on phones

// https://www.w3schools.com/howto/howto_js_media_queries.asp
// https://stackoverflow.com/questions/7995752/detect-desktop-browser-not-mobile-with-javascript

// note: putting stuff in a block like this limits the consts and lets to this scope
{
	// DIVIDE THE UI IN TWO
	const scene = document.getElementById("scene");
	const panel = document.getElementById("0Panel");

	const border_siz = 1;
	const sm_padding = 7;

	// Apply Shared Styles
	for(const el of [scene, panel]) {
		// el.style.width = `calc(50vw - ${2*(border_siz+sm_padding)||0}px)`;
		// el.style.height = "90vh";
		el.style.float = "left";
		el.style.display = "inline-block"
		el.style.border = `${border_siz}px solid white`;
		el.style.margin = `${sm_padding}px 0 0 ${sm_padding}px`;
	}
	// Now the distinct styles
	// scene.style.width = "50vw";
	scene.style.width = `calc(50vw - ${(2*border_siz+(3/2)*sm_padding)||0}px)`;
	panel.style.width = `calc(50vw - ${(2*border_siz+(7/2)*sm_padding)||0}px)`;
	scene.style.height = "90vh";
	panel.style.height = `calc(90vh - ${2*sm_padding||0}px`;
	// panel.style.marginLeft = "8px";
	panel.style.padding = `${sm_padding}px`;
	panel.style.marginRight = '0';
	// layout breaks on less than 156 vertical pixels
	panel.style.overflowY = "auto";

	const cols = {
		'red': 'red',
		'gre': 'green',
		'blu': 'blue',
	}

	const redel = document.getElementsByClassName("red");
	for(const [cls, col] of Object.entries(cols)) {
		const elements = document.getElementsByClassName(cls)
		for (const el of elements) {
			el.style.color = col;
		}
	}
}

// first attempt at connecting a gamepad
// getGamepads is EXPERIMENTAL and not supported by all browsers!!
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getGamepads
{
	console.log('stuff')
	console.log(navigator.getGamepads())
	// unexpectedly, this fires on the first gamepad action instead of on page load
	window.addEventListener("gamepadconnected", e => {
		const gp = navigator.getGamepads()[e.gamepad.index];
		console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
		gp.index, gp.id,
		gp.buttons.length, gp.axes.length);

		console.log('stuff')
		console.log(navigator.getGamepads())

	});
}


// 123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ 123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ zxcv

// -H-E-R-E- -B-E- -D-R-A-G-O-N-S- // :: STUFF TO BE REFACTORED AHEAD :::::::::
// -H-E-R-E- -B-E- -D-R-A-G-O-N-S- // :: STUFF TO BE REFACTORED AHEAD :::     :
// -H-E-R-E- -B-E- -D-R-A-G-O-N-S- // :: STUFF TO BE REFACTORED AHEAD :::::::::

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

function render_debug_geometry() {

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

// const SCENE = document.querySelector('a-scene');
const BLOB = document.querySelector('#blob');

class Sphere {
	constructor(config={}) {
		this.element = document.createElement(config.element || 'a-sphere')
		this.element.setAttribute('color', config.color || 'white');
		this.element.setAttribute('radius', '0.01');
		this.element.setAttribute('material', "shader: flat")
				this.element.setAttribute('type', "point")

		this.element.setAttribute('position', `${config.pos_x} ${config.pos_y} ${config.pos_z}`);
		BLOB.appendChild(this.element)
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
		BLOB.appendChild(this.element)
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
	// make a 8x8 grid
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
		BLOB.appendChild(this.element)
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
	// play video on blue cube click
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
			// first frane of spider man video isn't blank
			vid.currentTime = 1;
			cube.setAttribute('opacity', paused_opacity)
		});
	}
	// play tone on sphere click
	{
		let ball = document.querySelector('#red-sphere')
		
		let tone = document.createElement('audio')
		tone.src = 'sine-432hz-pluck.flac'

		let playing_opacity = 0.4;
		let paused_opacity = ball.getAttribute('opacity');

		// https://aframe.io/docs/0.8.0/core/animations.html
		let fade_animation = document.createElement('a-animation')
		fade_animation.setAttribute('attribute', 'material.opacity')
		fade_animation.setAttribute('begin', 'fade')
		fade_animation.setAttribute('end', 'end-fade')
		fade_animation.setAttribute('from', playing_opacity)
		fade_animation.setAttribute('to', paused_opacity)
		fade_animation.setAttribute('dur', 1000)
		fade_animation.setAttribute('easing', 'linear')
		ball.appendChild(fade_animation)
		ball.emit('fade')

		ball.addEventListener('click', function(evt) {
			ball.emit('end-fade')
			ball.emit('fade')
			if (tone.paused) {
				tone.play();
			} else {
				tone.currentTime = 0;
			}
		})
	}
	// increase clicker score if user clicks yellow box
	{
		let button = document.querySelector('#clicker-button')
		let score = document.querySelector('#clicker-score')

		let score_val = 0; // frontend defaults to zero

		button.addEventListener('click', function(evt) {
			score.setAttribute('value', ++score_val);
			console.log('click')
		})
	}
	// add chrismas balls to tree
	{
		// It would've been better to add them relative to the position of the tree
		// but the existying code already has the class auto-adding the element to
		// the general body so YOLO

		// const tree = document.querySelector('#christmas-tree')

		const start = {
			x: 1.5,
			y: 1.75,
			z: -5.5,
		}

		function y_path(y) {
			return {
				x: 0,
				y: y,
				z: 0,
			}
		}

		// new Sphere(config={
		// 	pos_x: start.x,
		// 	pos_y: start.y,
		// 	pos_z: start.z,
		// })

		// places a random field of dots
		// for(let i = 0; i < 48; i++) {
		// 	new Marker(
		// 		start.x + Math.random()*2 - 1,
		// 		start.y + Math.random()*2 - 1,
		// 		start.z + Math.random()*2 - 1,
		// 	)
		// }


		// console.log(tree)
		// tree.appendChild(ball.element)

	}
}

document.addEventListener("DOMContentLoaded", function(event) { 
	// do_stuff();
	do_3d_stuff();
});

// CURRENT BUGS

// randomly get in console (seems related to images, sincce started getting two afrer adding more)
// cursor.js:190 Uncaught TypeError: Cannot read property 'parent' of undefined
//     at i.<anonymous> (cursor.js:190)
//     at HTMLCanvasElement.<anonymous> (bind.js:12)
