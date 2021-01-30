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
