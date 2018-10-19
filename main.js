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


const square_color = 'white'
const text_background = 'gray'
const std_size = 100

const MainElement = document.getElementById("main")
do_stuff();

// =====

function Square(size_x=std_size, size_y=std_size, pos_x=10, pos_y=10) {

	// is there something better than divs?
	self.element = document.createElement("div")
	// self.element.style.width = `${size_x}`
	self.element.style.width = `${size_x}px`
	self.element.style.height = `${size_y}px`
	self.element.style.backgroundColor = square_color
	self.element.style.display = 'inline-block'

	MainElement
	MainElement.appendChild(self.element)

	console.log('stuff')
	return self
};

function Key(char, x, y) {

	self.element = Square(undefined, undefined, x, y).element
	const text = document.createElement("h1")
	text.style.fontSize = `${std_size}px`;	

	// maybe make the whole thing have the text background instead of just the h2?
	text.style.backgroundColor = text_background	
	text.style.margin = "0"	

	// holy shit, you're peeking into my thought process
	text.innerHTML = char

	self.element.appendChild(text)
}

// function char_board(arr_of_arr_of_char_buttons) {
// 	for(row of arr_of_arr_of_char_buttons) {
// 		let y_pos = 0;
// 		for(object of iter_item) {
// 			space_between_buttons = 123
// 		}
// 	}
// }

function do_stuff() {

	// Square()

	let loc = 10;
	const step = 110;

	Key('T', loc); loc += step;
	Key('H', loc); loc += step;
	Key('I', loc); loc += step;
	Key('S', loc); loc += step;
	Key(' ', loc); loc += step;
	Key('A', loc); loc += step;
	Key(' ', loc); loc += step;
	Key('T', loc); loc += step;
	Key('E', loc); loc += step;
	Key('S', loc); loc += step;
	Key('T', loc); loc += step;

}
