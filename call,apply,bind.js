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