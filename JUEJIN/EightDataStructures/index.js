class DataStructures {

    constructor(b) {
        this.b = b;
    }

    foo() {

        // 八大数据结构

        // 1. 数组 Array
        let arr = [
            {
                name: 'lin',
                age: 18,
                gender: '男'
            },
            {
                name: 'jay',
                age: 42,
                gender: '男'
            },
            {
                name: 'sina',
                age: 19,
                gender: '女'
            }
        ];
        console.log(arr);
    }
    
    foo2() {
        // 2.堆栈 Stack
        
        let arr = [1,2,3,4,5];

        // arr.push(6);//往数组后面追加一个元素;
        // arr.pop();//在数组后面删除一个元素;
        // arr.shift();//在数组前删除一个元素
        // arr.unshift(0);//在数组前面添加一个元素
        
        //注: 堆栈就是往前数组前追加元素往数组前删除元素;
        // eg: ctrl+c: 往数组添加元素,ctrl+z往数组删除当前元素;
        // pop && push || shift && unshift
        console.log(arr);
        // ...详细看Stack[堆栈的实现]...
    }

    foo3() {
        // 3.队列 Queue
        // 注: 在前端开发中,最著名的队列使用当属队列
        // ...详细看Queue[队列的实现]...
    }
    foo4() {
        // 4.链表 Linked Lists
        // 注: 链表 与数组一样,链标是按照顺序存储数据.链表不是保留索引,而是指向其他元素.第一个节点称为头部,最后一个节点称为尾部.
        // 单向链表与双向链表:
        // 单链表是表示一系列节点的数据结构,其中每个节点指向列表中的下一个节点.
        // 链表通常需要遍历整个操作列表,因此性能比较差
        // 提高链表性能的一种方法是在每个节点上添加指向列表中上一个节点的第二个指针.
        // 双向链表具有指向其前后元素的节点.
        // 链表的优点:
        // 链接具有常量时间 插入和删除,因此我们可以只更改指针.
        // 与数组一样,链表可以作为堆栈运行.
        // 链表的运用场景:
        // 链接列表在客户端和服务端都很有用.在客户端上,像Redux就以链表方式构建其中的逻辑,React核心算法React Fiber的实现就是链表[将html转成对象需要计算].
        // ...详细看LinkedList[单列表的实现]...
    }

}
let ds = new DataStructures(1);
// console.dir(ds.foo()); //数组
// console.log(ds.foo2());

//堆栈的实现
class Stack {
    constructor(...items) {
        // a.首先第一个问题...是什么语法
        this.reverse = false;
        this.stack = [...items];//这种方式可以变成数组
        // console.log(...items,this.stack);
    }
    push(...items) {
        return this.reverse
            ? this.stack.unshift(...items)
            : this.stack.push(...items);
    }
    pop(...items) {
        return this.reverse
            ? this.stack.shift()
            : this.stack.pop();
    }
}
const stack = new Stack(4,5);
stack.reverse = true;
// console.log(stack.push(1,2,3) === 5);//push方法返回的是数组的长度;

//队列的实现
class Queue {
    constructor(...items) {
        this.reverse = false;
        this.queue = [...items];
    }

    enqueue(...items) {
        return this.reverse ? this.queue.push(...items) : this.queue.unshift(...items);
    }

    dequeue() {
        // console.log(this.queue);
        return this.reverse ? this.queue.shift() : this.queue.pop();
    }

}
let que = new Queue(2,3,4);
que.reverse = true;
que.enqueue(5,6,7,8);
que.dequeue();

// 单链表的实现
// push(value) -在链表的末尾/头部添加一个节点
// pop() -在链表的末尾/头部添加一个节点
// get(index) -返回指定索引处的节点
// delet(index) -删除指定索引处的节点
// isEmpty() -根据列表长度返回true或false
// print() -返回链表的可见表示.
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    //在链表的末尾/头部添加一个节点
    push(data) {
        //创建一个新节点
        const node = new Node(data);
        // 检查头部是否为空;
        if(this.head === null) { //其实这里也是判断是不是只存在一个节点.
            this.head = node;
            this.tail = node;
        }
        this.tail.next = node;//前一个最后一个节点执像最新的,下面更新最新的.
        this.tail = node;//当push的时候时刻保持传进来的节点是最后一个节点
        this.length++;
    }
    // pop在链表的尾部或头部删除一个节点
    pop() {
        // 先检查链表是否为空
        if(this.isEmpty()) {
            return null;
        }
        // 如果长度为1
        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length--;
            return this.tail;
        }
        let node = this.tail;
        let currentNode = this.head;
        let penultimate; //接收倒数第二个节点
        while(currentNode) {
            if(currentNode.next === this.tail) { //只有两个节点的情况[一头一尾]
                penultimate = currentNode;
                break;
            }
            currentNode = currentNode.next;
        }
        penultimate.next = null; //倒数第二个节点执行最后一个节点设置为null[删除一个];
        this.tail = penultimate; //将倒数第二个节点设置为最后一个节点.
        return node; 

    }
    //返回指定索引处的节点;
    get(index) {
        // 处理边界条件
        if(index === 0) {
            return this.head;
        }
        if(index < 0 || this.index > this.length) {
            return null;
        }

        let currentNode = this.head;
        let i = 0;
        while (i < index) {
            i++;
            currentNode = currentNode.next;
        }
        return currentNode;
    }
    //删除指定索引处的节点
    delete(index) {
        let currentNode = this.head;
        if(index === 0) {
            let deleteNode;
            currentNode.next = this.head;
            deleteNode = currentNode;
            this.length--;

            return deleteNode;
        }
        if(index < 0 || index > this.length) {
            return null;
        }
        let i = 0;
        let previous;
        while(i < index) {
            i++;
            previous = currentNode;
            currentNode = currentNode.next;
        }
        previous.next = currentNode.next;
        this.length --;
        return currentNode;

    }
    isEmpty() {
        return this.length === 0;
    }
    //返回链标的可见表示
    print() {
        const list = [];
        let currentNode = this.head;
        while(currentNode) {
            list.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return list.join(' => ');
    }
}
// const l = new LinkedList();

// const values = ['A','B','C','D','E'];
// values.forEach(value => l.push(value));
// console.log(l);
// console.log(l.print());
// console.log(l.pop());
// console.log(l.print());
// console.log(l.get(2));
// console.log(l.delete(2));

//双链表的实现
// Append & AppendAt 在链表的尾部/指定位置添加节点
class NodeDouble {
    constructor(data) {
        //包含链表项应存的值
        this.data = data;
        //next 指向列表中下一项的指针
        this.next = null;
        // prev 指向列表中上一项的指针
        this.prev = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(item) { //往链表后添加节点
        let node = new NodeDouble(item);
        console.log(node); // NodeDouble {data: 1,next: null, prev: null} //没有头确定没有数据,添加一个数据,头和尾都是添加劲来的node;
        if(!this.head) {
            this.head = node; //head 和 tail是我们new出对象的属性,不是节点Node的属性;
            this.tail = node; //head 和 tail是我们new出对象的属性,不是节点Node的属性;
        }else{
            node.prev = this.tail;//有1或多个了 【'old','new'】 新添加的节点指向上一次的最后一个节点this.tail;
            this.tail.next = node; //未添加前的最后一个指向添加后,将添加后的节点设置未最后一个节点;
            this.tail = node; // 将新添加的节点设置成最后一个节点
        }
    }
    appendAt(pos, item) {//链表指定位置添加元素;
        let current = this.head;
        let counter = 1;
        let node = new NodeDouble(item);

        if(pos == 0) {
            this.head.prev = node;
            node.next = this.this.head;
            this.head = node;
        }else {
            while (current) {
                current = current.next;
                if(counter == pos) {
                    node.prev = current.prev;
                    current.prev.next = node;
                    node.next = current;
                    current.prev = node;
                }
                counter++;
            }
        }
    }
    remove(item) { // 删除某个元素
        let current = this.head;
        while(current) {
            if(current.data === item) {
                if(current == this.head && current == this.tail) {
                    this.head = null;
                    this.tail = null;
                }else if(current == this.head) {
                    this.head = this.head.next;
                    this.head.prev = null;
                }else if(current == this.tail) {
                    this.tail = this.tail.prev;
                    this.tail.next = null;
                }else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
            }
            current = current.next;
        }
    }
    removeAt(pos) { //指定删除节点
        let current = this.head;
        let counter = 1;
        if(pos == 0) {
            this.head = this.head.next;
            this.head.prev = null;
        }else {
            while(current) {
                current = current.next;
                if(current == this.tail) {
                    this.tail = this.tail.prev;
                    this.tail.next = null;
                }else if(counter == pos){
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    break;
                }
                counter++;
            }
        }
    }

}
let dbl = new DoublyLinkedList();

dbl.append(1);
dbl.append(2);
console.log(dbl);