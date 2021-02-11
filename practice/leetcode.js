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
