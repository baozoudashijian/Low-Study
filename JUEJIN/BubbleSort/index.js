
class BubbleSort {

    constructor(data) {
        this.data = data || null;
    }

    sort() {
        if(this.data === null) return false;
        console.log(this.data);
        for(let i=0; i<this.data.length;i++) {
            for(let j=0; j<this.data.length - i; j++) { //可以不减去 i;
                if(this.data[j+1] > this.data[j]) {
                    let temp = this.data[j+1];
                    this.data[j+1] = this.data[j];
                    this.data[j] = temp;
                }
            }
        }
        console.log(this.data);
    }
}
let arr = [4,62,42,683,425,23,423,4,2];
let bubble = new BubbleSort(arr);
bubble.sort();