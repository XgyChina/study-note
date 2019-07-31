## 1、过滤唯一值

`Set`类型是在`ES6`中新增的，它类似于数组，但是成员的值都是唯一的，没有重复的值。结合扩展运算符（...）我们可以创建一个新的数组，达到过滤原数组重复值的功能。

```typescript
const array = [1, 2, 3, 3, 5, 5, 1];
const uniqueArray = [...new Set(array)];

console.log(uniqueArray); // [1, 2, 3, 5]
```

在ES6之前，我们如果想要实现这个功能的话，需要的处理代码要多很多。
这个技巧的适用范围是数组中的数值的类型为：`undefined`， `null`， `boolean`， `string`， `number`。当包涵`object`， `function`， `array`时，则不适用。

## 2、短路求值（Short-Circuit Evaluation）

或（||）运算符将返回第一个`true/‘truthy’`的值。当所有的操作数都是`false`时，将返回最后一个表达式的结果。

```typescript
let one = 1, two = 2, three = 3;
console.log(one || two || three); // Result: 1

console.log(0 || null); // Result: null
```

与（&&）运算符将会返回第一个`false/‘falsy’`的值。当所有的操作数都是`true`时，将返回最后一个表达式的结果。

```typescript
let one = 1, two = 2, three = 3;
console.log(one && two && three); // Result: 3

console.log(0 && null); // Result: 0
```



应用

```typescript
// 优化前
if (this.state.data) {
  return this.state.data;
} else {
  return 'Fetching Data';
}
// 优化后
return (this.state.data || 'Fetching Data');
```

## 3、转换Boolean型

常规的boolean型值只有 `true` 和 `false`，但是在JavaScript中我们可以将其他的值认为是 `‘truthy’` 或者 `‘falsy’`的。

除了`0`， `“”`， `null`， `undefined`， `NaN` 和 `false`,其他的我们都可以认为是`‘truthy’`的。

我们可以通过负运算符`！`将一系列的变量转换成“boolean”型。

```typescript
const isTrue  = !0;
const isFalse = !1;
const alsoFalse = !!0;

console.log(isTrue); // Result: true
console.log(typeof true); // Result: "boolean"
```

## 4、转换String型

我们可以通过`+`连接运算符将一个number类型的变量转换成string类型。

```typescript
const val = 1 + "";

console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"
```

## 5、转换Number类型

和上面对应的，我们可以通过加法运算符`+`将一个string类型的变量转回为number 类型的。

```typescript
let int = "15";
int = +int;

console.log(int); // Result: 15
console.log(typeof int); Result: "number"
```

## 6、数组的处理splice和slice

如果数组中用arr[1] = "ceshi" 不能触发vue界面刷新，可考虑splice() 方法

+ splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。该方法会改变原始数组。

  ```typescript
  /**
  * arrayObject.splice(index,howmany,item1,.....,itemX)
  * index 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
  * howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
  * item1, ..., itemX 可选。向数组添加的新项目。
  **/
  const arr = ["George", "John", "Thomas", "James",  "Adrew", "Martin"];
  arr.splice(2,1,"William")
  console.log(arr);
  // ["George", "John", "William", "James", "Adrew", "Martin"]
  
  ```

  

+ slice() 方法可从已有的数组中返回选定的元素。该方法并不会修改数组，而是返回一个子数组。

  ```typescript
  /**
  * arrayObject.slice(start,end)
  * start 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后*       一个元素，-2 指倒数第二个元素，以此类推。
  * end 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组
  *     包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
  **/
  const arr = ["George", "John", "Thomas", "James",  "Adrew", "Martin"];
  console.log(arr.slice(2,4)); // ['Thomas', 'James']
  ```

  

## 7、字符串的处理split和slice

String.slice() 与 Array.slice() 相似。String.split() 与 Array.splice() 相似。

+ split()方法用于把一个字符串分割成字符串数组。

  ```typescript
  const a = 'abcd';
  console.log(a.split(',')); // ['a', 'b', 'c', 'd']
  ```

  

+ slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

  ```typescript
  const a = 'abcd';
  console.log(a.slice(1, 2)); // b
  ```

  

## 8、JavaScript中十种一步拷贝数组的方法

见文件：JavaScript中十种拷贝数组的方法.md

## 9、value type & reference type 分别做函数参数的情况

当value type做函数的参数时：函数内部的变量，也就是形参和实参只是简单的赋值操作，两个数据是独立存储于内存中的。在函数内部对形参进行修改，不会影响外面的变量。

```typescript
var num=9;
function changeNum(num){
    num=10;
    console.log(num);
}
changeNum(num);//10
console.log(num);//9
```

```typescript
var val='xixi';
function a(val){
    val=30;
    return val;
}
console.log(a(val)); //30
console.log(val); //xixi
```

当reference type做函数参数时：还是把实参存储的地址赋值给了形参，在函数内部，形参同样也指向该对象，所以在函数内部对该对象进行修改会影响到外面的变量。

```typescript
var obj={name:"meryl"}
function changeName(para){
    para.name="jesscia";
}
changeName(obj);
console.log(obj.name); //jesscia;


/* 注意：如果在函数内部重新创建对象,为该形参赋值，那么实参和形参这俩对象将不再有关系,修改其中
一个，另外一个不受影响,比如看下面的例子：*/
var obj2={name:"mohan"}
function changeName(para){
    para.name="lx";
    para={name:'zoe'};
    para.name='phoebe';
}
changeName(obj2);
console.log(obj2.name); //lx 
```

