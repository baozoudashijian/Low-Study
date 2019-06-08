
class Sort {
    constructor(data) {
        this.data = data || null;//有数据就返回数据,没有数据就是null;
        console.log(this.data);
    }

    sortData() {
        let res = [];
        //将数组三个三个一分组.
        if(this.data === null) return false;

        for(let i=0; i<this.data.length; i+=3) {
            res.push(this.data.slice(i,i+3));
        }
        // console.log(res);
        //两个数据交换位置;
        res.map((item) => {
            let temp = item[1];
            item[1] = item[0];
            item[0] = temp;
        });
        console.log(res);
        //将二围数组转成一围数组.
        let resArr = res.reduce((a,b) => a.concat(b));
        console.log(resArr);
    } 

}
let arr = [1,2,3,4,5,6,7];
let sort = new Sort(arr);
sort.sortData();