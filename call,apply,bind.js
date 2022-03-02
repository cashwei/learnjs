// call() 与apply()只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。


// call(); 传递参数类型 直接返回调用结果
function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}
console.log(new Food('cheese', 5).name);

// apply ();传递具体参数类型,第二个参数只能传递数组
var num = [1,3,12,11,54];
// console.log(Math.max(1,2,12,13,54));
// Math.max.apply(window, num);
console.log(Math.max.apply(null, num));

// call() 传递引用类型，传递值，经常做父类继承，可以改变this的指向
// bind()  方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
function title() {
    setInterval(function() {
        console.log('hello world');
    }, 1000);
}
title.bind(this); // 如果直接这样，等到你老了，他也不会执行
title.bind(this)(); //加上调用的括号就可以执行了

var arr = [1,32,43,22,12,45];

// 将对象o中名为m()的方法替换为另一个方法
// 可以在调用原始的方法之前和之后记录日志消息
function trace(o,m) {
    var original = o[m]; // 在闭包中保存原始方法
    o[m] = function() {
        console.log(new Date(), 'Entering:', m); // 输出日志消息
        var result = original.apply(this, arguments); // 调用原始函数
        console.log(new Date(), 'Exiting', m); // 输出日志消息
    return result;
    }
}


// bind()方法
function f(y) { // 这个是待绑定的函数
    return this.x + y;
}
var o = {x:1};
var g = f.bind(o);
console.log(g(2));

// 可以通过如下代码轻易的实现这种绑定
// 返回一个函数，通过调用它来调用o中的方法f()，传递它的所有实参
function bind(f,o) {
    if(f.bind) return f.bind(o); // 如果bind()方法存在的话，使用bind()方法
    else return function () { // 否则，这样绑定
        return f.apply(o,arguments);
    }
}

// ECMAScript5 中的bind()方法不仅仅是将函数绑定至一个对象，它还附带一些其他应用：
// 除了第一个实参之外，传入bind()的实参也会绑定至this
var sum = function(x,y) {
    return x+y; // 返回两个实参的和
}
// 创建一个类似sum的新函数,但this的值绑定到null
// 并且第一个参数绑定到1，这个新的函数期望只传入一个实参
var succ = sum.bind(null,1);
succ(2); // => 3:x绑定到1，并传入2作为实参y

function f(y,z) {
    return this.x + y + z; // 另外一个做累加计算的函数
}
var g = f.bind({x:1},2); // 绑定this和y
g(3); // =>6:this.x绑定到1，y绑定到2，z绑定到3

// ECMAScript3版本的Function.bind()方法
if (!Function.prototype.bind) {
    Function.prototype.bind  = function(o/*,args */) {
        // 将this和arguments的值保存至变量中
        // 以便在后面嵌套的函数中可以使用它们
        var self = this, boundArgs = arguments;
        // bind()方法的返回值是一个函数
        return function() {
            // 创建一个实参列表，将传入bind()的第二个及后续的实参都传入这个函数
            var args = [],i;
            for (i = 1; i < boundArgs.length; i++) {
               args.push(boundArgs[i]);
            }
            for (i =0 ; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            // 现在将self作为o的方法来调用，传入这些实参
            return self.apply(o,args);
        }
    }
}
