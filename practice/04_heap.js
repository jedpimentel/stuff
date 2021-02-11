// Implement a Heap including its helper methods: Get Min, Insert, and Remove
// const zeroIndexed = {
// 	parent:
// 	left:
// 	right:
// }
// const oneIndexed = {
// 	parent:
// 	left:
// 	right:
// }
// {
// 	class minHeap {
// 		constructor(value = null) {
// 			this.value = value;
// 			this.size = value === null ? 0 : 1;
// 			this.left = null;
// 			this.right = null;
// 		}
// 		insert
// 	}
// }

class MinHeap {
	constructor() {
		this.entries = [null];
		this.rootIndex = 1;
	}
	get size() {
		return this.entries.length - this.rootIndex;
	}
	get lastIndex() {
		return this.entries.length - 1;
	}
	print() {
		console.log(this.entries);
	}
	peek() {
		return this.entries[this.rootIndex];
	}
	insert(value) {
		this.entries.push(value);
		const index = this.size;
		this.bubbleUp(index);
	}
	// shifts entries
	remove() {
		const min = this.peek;  // value at rootIndex
		this.entries[this.rootIndex] = this.entries.pop();
		this.bubbleDown(this.rootIndex);
		return min;
	}

	bubbleDown(index) {
		const E = this.entries;
		let entry = index;
		let next;
		while (!this.isLeaf(entry)) {
			next = this.favoriteChild(entry);
			if (E[entry] > E[next]) {
				this.swap(entry, next);
				entry = next;
			}
			else break;
		}
	}

	isLeaf(index) {
		return this.leftOf(index) > this.lastIndex;
	}
	favoriteChild(index) {
		// TODO: throw error if index is not a leaf
		const E = this.entries;
		const left = this.leftOf(index);
		const right = this.rightOf(index)
		if (right > this.lastIndex) return left;
		return E[left] < E[right] ? left : right;
	}

	bubbleUp(index) {
		const E = this.entries;
		let entry = index;
		let parent = this.parentOf(entry);
		while (entry > this.rootIndex && E[entry] < E[parent]) {
			this.swap(entry, parent);
			entry = parent;
			parent = this.parentOf(entry);
		}
	}

	swap(indexA, indexB) {
		const swap = this.entries[indexA];
		this.entries[indexA] = this.entries[indexB];
		this.entries[indexB] = swap;
	}


	// *Of methods assume this.rootIndex === 1;

	parentOf(index) {
		return Math.floor(index / 2);
	}
	leftOf(index) {
		return index * 2;
	}
	rightOf(index) {
		return index * 2 + 1;
	}
}

function test() {
	// const actions = [];
	// TO TEST: .peek, .insert, .remove
	
	const maxRandInt = 99;

	const heap = new MinHeap();

	insert(10);
	heap.print();
	insert(50);

	let check = maxRandInt;
	while (heap.size > 10) {
		const smaller = heap.remove();
		if (smaller > check) throw "wrong";
	}

	heap.print();



	function insert(int = 1) {
		for (let i = int; i > 0; i--) {
			const randInt = Math.floor(Math.random() * maxRandInt + 1);
			heap.insert(randInt);
		}
	}
	function remove(int = 1) {
		for (let i = int; i > 0; i--) {
			heap.remove();
		}
	}
}

