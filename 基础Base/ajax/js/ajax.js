// ajax的封装

// 1.什么是ajax?
// ajax是一种创建交互网页应用的一门技术.

// 2. ajax的应用场景有: 地图实时更新,表单验证等等.

// 3. ajax的优缺点:
//  优点: 实现局部更新(无刷新状态下), 2.减轻了服务端压力(因为是局部更新).
//  缺点: 破坏了浏览器前进后退的机制(因为ajax自动更新机制)
//        搜索引擎的支持程度比较低
//        ajax的安全性问题不太好(可以用数据加密解决);

// 4. HTTP请求
//  HTTP请求有两种方式
//     get: 由于获取数据,get是在URL上传递数据,存贮量较少,安全系数比较低.
//     post: 用于上传数据,post安全性一般比get好一些,容量几乎是无线(多用于表单).

// 5. Ajax的使用
// 使用ajax一共有四个步骤: 
    //   创建ajax
    //   链接服务器
    //   发送请求
    //   接收返回值

    //-------------------------------------------before-----------------------------------------------
    // function Ajax(options) {
    //     this.options = options
    //     this.xhr = null;
    //     this.params = this.formsParams(options.data);
    //     this.init();
    // }
    // Ajax.prototype = {
    //     init: function() {
    //         //创建xhr对象
    //         this.xhr = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");//推荐使用三目运算
    //         console.log(this.xhr);
    //         if(this.options.type = "GET") {
    //             this.xhr.open(this.options.type,this.options.url + "?" + this.params);
    //             this.xhr.send(null);
    //         }else if(this.options.type == "GET") {
    //             this.xhr.open(this.options.type,this.options.url);
    //             this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    //             this.xhr.send(params);
    //         }
    //         this.xhr.onreadystatechange = function() {
    //             if(this.xhr.readyState == 4 && this.xhr.status == 200) {
    //                 //执行回调方法
    //                 this.options.success(this.xhr.responseText);
    //             }
    //         }

    //     },
    //     formsParams: function(data) {
    //         var arr = [];
    //         for(var prop in data) {
    //             arr.push(prop + '=' + data[prop]);
    //         }
    //         return arr.join('&');
    //     }
    // }
    // var ajax = new Ajax({
    //     url: 'a.php',
    //     type: 'GET',
    //     data: {name: '张荣杰'}}
    //     );

    //-------------------------------------------after-----------------------------------------------   

    window.ajax = ({method,path,body,headers}) => {
        return new Promise((resolve,reject) => {
            let request = new XMLHttpRequest();
            request.open(method,path);

            for(const key in headers) { //遍历header设置响应头
                let value = headers[key];
                request.setRequestHeader(key,value);
            }
            request.send(body);

            request.onreadystatechange = () => {
                if(request.readyState === 4) {
                    if(request.status === 200) {
                        resolve(request.responseText);
                    }else {
                        reject(request);
                    }
                }
            }
        })
    }