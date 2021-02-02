 // Implement a Queue including it's helper methods:  add(enqueue), remove(dequeue), first, last, and size
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.len = 0;

	}
	push(data) {
		const node = new Node(data);
		if (this.len === 0) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			this.tail = node;
		}
		this.len++;
	}
	shift() {
		const node = this.head;
		if (node instanceof Node) {
			if (this.head === this.tail) {
				this.head = null;
				this.tail = null;
			} else {
				this.head = this.head.next;
			}
			this.len--;
		}
		return node;
	}
	get first() {
		return this.head;
	}
	get last() {
		return this.tail;
	}
	get length() {
		return this.len;
	}
}

function test() {
	const q = new Queue();
	console.log(q.first, q.last, q.length);
	q.push(1);
	console.log(q.first, q.last, q.length);
	q.push(2);
	console.log(q.first, q.last, q.length);
	q.push(3);
	console.log(q.first, q.last, q.length);
	console.log(q.shift(), q.shift());
	q.push(4);
	q.push(5);
	console.log(q.first, q.last, q.length);
	console.log(q);
	console.log(q.shift(), q.shift(), q.shift());
	console.log(q, q.shift());
}




// https://www.codewars.com/kata/55a9c0994cb7e284d500005e/train/javascript
{
	var Queue = function() {
	  this.storage = [];
	};

	Queue.prototype.enqueue = function(item) {
	  this.storage.push(item);
	};

	Queue.prototype.dequeue = function() {
	  return this.storage.shift();
	};

	Queue.prototype.size = function() {
	  return this.storage.length;
	};
}

// https://www.codewars.com/kata/5b538734beb8654d6b00016d/train/javascript
{
	function queue(queuers, pos){
	  // time: O(n) space: O(1)
	  const tickets = queuers[pos];
	  let time = 0;
	  let i = 0;
	  while (i <= pos) {
	    time += Math.min(queuers[i], tickets);
	    i++;
	  }
	  while (i < queuers.length) {
	    time += Math.min(queuers[i], tickets - 1);
	    i++;
	  }
	  return time;
	}
}