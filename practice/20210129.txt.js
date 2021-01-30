// what if you have two linked lists and cross them mid way, converging?
	// append(data) {
	// 	// (this.head instanceof Node ? this.last.next : this.head) = new Node(data);
// class Bogo {
// 	constructor(data) {
// 		console.log(arguments.length)
// 	}
// }
// 
// 
// 
// make a linked list with the methods: size, clear, getLast, getFirst
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor(data) {
		if (arguments.length > 0) {
			this.head = new Node(data);
		}
		else {
			this.head = null;
		}
	}
	get size() {
		let count = 0;
		let current = this.head;
		while (current instanceof Node) {
			count++;
			current = current.next;
		}
		return count;
	}
	clear() {
		this.head = null;
	}
	get last() {
		let current = this.head;
		while (current instanceof Node && current.next) {
			current = current.next;
		}
		return current;
	}
	get first() {
		return this.head;
	}
	append(data) {
		if (this.head instanceof Node) {
			this.last.next = new Node(data);
		}
		else {
			this.head = new Node(data);
		}
		return this;
	}
	prepend(data) {
		const newHead = new Node(data)
		if (this.head instanceof Node) {
			newHead.next = this.head;
		}
		this.head = newHead;
		return this;
	}
}


function test() {
	let foo = new LinkedList('this is a test');
	console.log(foo.head.data);
	foo.clear();
	foo.prepend('!');
	console.log(foo.head.data);
	foo.clear();
	foo.append('!');
	console.log(foo.head.data);
	foo.clear();
	foo.prepend('!');
	console.log(foo.head.data);
	foo.clear();

	foo.prepend(0);
	foo.prepend(1);
	foo.prepend(2);
	foo.prepend(3);
	foo.append('!');

	console.log(foo);
	console.log(foo.size);
	console.log('last', foo.last);
	console.log('first', foo.first);
}




// https://www.codewars.com/kata/55be95786abade3c71000079/
// function Node(data) {
//   this.data = data;
//   this.next = null;
// }

// function push(head, data) {
//   let root = new Node(data);
//   if (head instanceof Node) {
//     root.next = head
//   }
//   return root;
// }

// function buildOneTwoThree() {
//   let foo = null;
//   foo = push(foo, 3);
//   foo = push(foo, 2);
//   foo = push(foo, 1);
//   return foo;
// }


//https://www.codewars.com/kata/55beec7dd347078289000021/train/javascript
// function Node(data) {
//   this.data = data;
//   this.next = null;
// }

// function length(head) {
//   let here = head;
//   let count = 0;
//   while (here instanceof Node) {
//     count++;
//     here = here.next
//   }
//   return count;
// }

// function count(head, data) {
//   let here = head;
//   let count = 0;
//   while (here instanceof Node) {
//     if (here.data === data) {
//       count++;
//     }
//     here = here.next
//   }
//   return count;
// }