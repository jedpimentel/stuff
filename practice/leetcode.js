// 21. Merge Two Sorted Lists    https://leetcode.com/problems/merge-two-sorted-lists/
{
	var mergeTwoLists = function(l1, l2) {
	    if (l1 === null) return l2;
	    if (l2 === null) return l1;
	    
	    let a = l1;
	    let b = l2;
	    const root = popMin();
	    
	    let leaf = root;
	    while (a !== null && b !== null) {
	        leaf.next = popMin();
	        leaf = leaf.next;
	    }
	    leaf.next = a || b;
	    
	    return root;
	    
	    function popMin() {
	        let ans;
	        if (a.val <= b.val) {
	            ans = a;
	            a = a.next;
	        }
	        else {
	            ans = b;
	            b = b.next;
	        }
	        return ans;
	    }
	};
}


// 121. Best Time to Buy and Sell Stock    https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
{
	var maxProfit = function(prices) {
    if (prices.length < 2) return 0;
    
    let min = prices[0];
    let max = 0;
    for (let i = 1; i < prices.length; i++) {
        const n = prices[i];
        if (n < min) {
            min = n;
            continue;
        }
        const profit = n - min;
        if (max < profit) {
            max = profit;
        }
    }
    
    return max > 0 ? max : 0;
};
}

// 206. Reverse Linked List    https://leetcode.com/problems/reverse-linked-list/
{
	var reverseList = function(head) {
	    if (head.next === null) return head;
	    let node = head;
	    let front = head.next;
	    let back = null;
	    
	    while (front !== null) {
	        node.next = back;
	        back = node;
	        node = front;
	        front = node.next;
	    }
	    node.next = back;
	    return node;
	};
}

// 811. Subdomain Visit Count    https://leetcode.com/problems/subdomain-visit-count/
{
	var subdomainVisits = function(cpdomains) {
	    const count = new Map();
	    cpdomains.forEach(entry => {
	        const [visits, domn] = entry.split(" ");
	        let route = domn;
	        do {
	            tally(visits, route);
	            const index = route.indexOf('.') + 1;
	            route = index !== 0 ? route.slice(index) : "";
	        } while (route.length > 0);
	    })
	    
	    let result = [];
	    count.forEach((key, val) => result.push(`${key} ${val}`))
	    return result;
	    
	    function tally(i, key) {
	        const old = count.get(key) || 0;
	        count.set(key, old + Number(i));
	    }
	};
}


// 973. K Closest Points to Origin    https://leetcode.com/problems/k-closest-points-to-origin/
{
	// NOTE: leetcode says it runs slow, maybe due to mutating arrays to add distance?
	var kClosest = function(points, K) {
	    class maxHeap {
	        constructor(maxSize) {
	            this.maxSize = maxSize;
	            this.bucket = [];  // [[x, y, dist], ...]
	        }
	        add(xy) {
	            const dist = eucledian(xy);
	            if (this.bucket.length < this.maxSize) {
	                this.bucket.push([...xy, dist])
	                this.bubbleUp();
	            }
	            else if (this.bucket[0][2] > dist) {
	                this.bucket[0] = [...xy, dist];
	                this.bubbleDown(0);
	            }
	        }
	        bubbleUp(i = this.bucket.length - 1) {
	            const b = this.bucket;
	            let up = this.upOf(i);
	            while (i > 0 && b[up][2] < b[i][2]) {
	                this.swap(up, i);
	                i = up;
	                up = this.upOf(i);
	            }
	        }
	        bubbleDown(i = 0) {
	            const b = this.bucket;
	            const d = this.downOf(i);
	            if (d < b.length && b[i][2] < b[d][2]) {
	                this.swap(i, d);
	                this.bubbleDown(d);
	            }
	        
	        }
	        upOf(i) {
	            return Math.floor((i-1)/2);
	        }
	        downOf(i) {
	            const left = i * 2 + 1;
	            const right = i * 2 + 2;
	            // if (left > this.maxSize) throw "too far";
	            if (right >= this.bucket.length) return left;
	            const b = this.bucket;
	            return b[left][2] > b[right][2] ? left : right;
	        }
	        swap(i, j) {
	            const b = this.bucket;
	            const foo = b[i];
	            b[i] = b[j];
	            b[j] = foo;
	        }
	    
	    }
	    
	    // make a k-sized max-heap holding the k-nearest points
	    const nearest = new maxHeap(K);
	    points.forEach(xy => {
	        nearest.add(xy);
	    });
	    return nearest.bucket.map(xyd => xyd.slice(0,2));
	    
	    function eucledian(xy) {
	        const [x, y] = xy;
	        return Math.sqrt(x**2 + y**2)
	    }
	};
}

// 1557. Minimum Number of Vertices to Reach All Nodes    https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/
{
	var findSmallestSetOfVertices = function(n, edges) {
	    const branches = new Set();
	    // nodes with pointers to them are branches, not roots
	    edges.forEach(([from, to] = e) => branches.add(to));
	    
	    const roots = new Array();
	    for (let i = 0; i < n; i++) {
	        if (!branches.has(i)) {
	            roots.push(i);
	        }
	    }
	    return roots;
	};
}

// 1761. Minimum Degree of a Connected Trio in a Graph    https://leetcode.com/problems/minimum-degree-of-a-connected-trio-in-a-graph/
{
	var minTrioDegree = function(n, edges) {
	    class Node {
	        constructor(id) {
	            this.id = id;
	            this.next = new Set();
	        }
	        static connect(a, b) {
	            a.next.add(b);
	            b.next.add(a);
	        }
	    }
	    
	    const nodes = [];
	    for (let i = 0; i <= n; i++) {
	        nodes.push(new Node(i))
	    }
	    
	    edges.forEach(edge => {
	        const [a, b] = edge;
	        const nA = nodes[a];
	        const nB = nodes[b];
	        Node.connect(nA, nB);
	    })
	    
	    let minDegree = -1;
	    
	    nodes.forEach(n1 => {
	        n1.next.forEach(n2 => {
	            if (n1.id > n2.id) return;
	            n2.next.forEach(n3 => {
	                if (n2.id > n3.id) return;
	                if (n3.next.has(n1)) {
	                    tallyTrio(n1, n2, n3);
	                }
	            })
	        })
	    })
	    
	    function tallyTrio(a, b, c) {
	        let degrees = 0;
	        degrees += a.next.size - 2;
	        degrees += b.next.size - 2;
	        degrees += c.next.size - 2;
	        if (minDegree === -1 || minDegree > degrees) {
	            minDegree = degrees;
	        }
	    }
	    
	    return minDegree;
	};
}