# JavaScript中十一种拷贝数组的方法

经常有同事出现数据处理这就莫名奇妙的改变了，可能和下面的知识点有关。

## 1、扩展运算符（浅拷贝）

```typescript
numbers = [1, 2, 3];
numbersCopy = [...numbers];
```

这个方法不能有效的拷贝多维数组。数组/对象值的拷贝是通过引用而不是值复制。

```typescript
// 😊
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 2, 3, 4]
// 只修改了我们希望修改的，原数组不受影响

// 😢
nestedNumbers = [[1], [2]];
numbersCopy = [...nestedNumbers];
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// 由于公用引用，所以两个数组都被修改了，这是我们不希望的
```



## 2、for()循环（浅拷贝）

```typescript
numbers = [1, 2, 3];
numbersCopy = [];
for (i = 0; i < numbers.length; i++) {
  numbersCopy[i] = numbers[i];
}
```

这个方法不能有效的拷贝多维数组。因为我们使用的是`=`运算符，它在处理数组/对象值的拷贝时通过引用而不是值复制。

```typescript
// 😊
numbersCopy.push(4);
console.log(numbers, numbersCopy);
// [1, 2, 3] and [1, 2, 3, 4]

// 😢
nestedNumbers = [[1], [2]];
numbersCopy = [];
for (i = 0; i < nestedNumbers.length; i++) {
  numbersCopy[i] = nestedNumbers[i];
}
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]
// 由于公用引用，所以两个数组都被修改了，这是我们不希望的
```



## 3、while()循环（浅拷贝）

和`for()` 类似。

```typescript
numbers = [1, 2, 3];
numbersCopy = [];
i = -1;
while (++i < numbers.length) {
  numbersCopy[i] = numbers[i];
}
```



## 4、Array.map（浅拷贝）

同样的，处理对象和数组的时候是引用而不是值复制。

```typescript
numbers = [1, 2, 3];
numbersCopy = numbers.map((x) => x);
```



## 5、Array.filter（浅拷贝）

`Array.filter`方法同样会返回一个新数组，但是并不一定是返回同样长度的，这和我们的过滤条件有关。

```typescript
numbers = [1, 2, 3];
numbersCopy = numbers.filter(() => true);
// [1, 2, 3]
```

同样的，处理对象和数组的时候是引用而不是值复制。

## 6、Array.reduce（浅拷贝）

```typescript
numbers = [1, 2, 3];
numbersCopy = numbers.reduce((newArray, element) => {
  newArray.push(element);
  return newArray;
}, []);
```

同样的，处理对象和数组的时候是引用而不是值复制。

## 7、Array.slice（浅拷贝）

`slice` 方法根据我们指定的start、end的index从原数组中返回一个浅拷贝的数组。

```typescript
[1, 2, 3, 4, 5].slice(0, 3);
// [1, 2, 3]
// Starts at index 0, stops at index 3

// 当不给定参数时，就返回了原数组的拷贝
numbers = [1, 2, 3, 4, 5];
numbersCopy = numbers.slice();
// [1, 2, 3, 4, 5]
```

同样的，处理对象和数组的时候是引用而不是值复制。

## 8、JSON.parse & JSON.stringify（深拷贝）

`JSON.stringify`将一个对象转成字符串；
`JSON.parse`将转成的字符串转回对象。

将它们组合起来可以将对象转换成字符串，然后反转这个过程来创建一个全新的数据结构。

这个可以安全地拷贝深度嵌套的对象/数组。

```typescript
nestedNumbers = [[1], [2]];
numbersCopy = JSON.parse(
  JSON.stringify(nestedNumbers)
);
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
// [[1], [2]]
// [[1, 300], [2]]
// These two arrays are completely separate!
```

注意JSON.parse & JSON.stringify实现深拷贝的几处坑

+ 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；

  ```typescript
  var test = {
    name: 'a',
    date: [new Date(1536627600000), new Date(1540047600000)],
  };
  
  let b;
  b = JSON.parse(JSON.stringify(test))
  console.log(b);
  ```

+ 如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象；

  ```typescript
  const test = {
    name: 'a',
    date: new RegExp('\\w+'),
  };
  // debugger
  const copyed = JSON.parse(JSON.stringify(test));
  test.name = 'test'
  console.log('ddd', test, copyed)
  ```

  

+ 如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；

  ```typescript
  const test = {
    name: 'a',
    date: function hehe() {
      console.log('fff')
    },
  };
  // debugger
  const copyed = JSON.parse(JSON.stringify(test));
  test.name = 'test'
  console.error('ddd', test, copyed)
  ```

  

+ 如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null

+ JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；

  ```typescript
  function Person(name) {
    this.name = name;
    console.log(name)
  }
  
  const liai = new Person('liai');
  
  const test = {
    name: 'a',
    date: liai,
  };
  // debugger
  const copyed = JSON.parse(JSON.stringify(test));
  test.name = 'test'
  console.error('ddd', test, copyed)
  ```

  

## 9、Array.concat（浅拷贝）

如果我们不指定参数或者提供一个空数组作为参数，就可以进行浅拷贝。

同样的，处理对象和数组的时候是引用而不是值复制。

```typescript
[1, 2, 3].concat(); // [1, 2, 3]
[1, 2, 3].concat([]); // [1, 2, 3]
```

## 10、Array.from（浅拷贝）

可以将任何可迭代对象转换为数组。给一个数组返回一个浅拷贝。

同样的，处理对象和数组的时候是引用而不是值复制。

```typescript
console.log(Array.from('foo'))
// ['f', 'o', 'o']

numbers = [1, 2, 3];
numbersCopy = Array.from(numbers)
// [1, 2, 3]
```

## 11 自己实现方法（深拷贝）

```javascript
function deepCopy(obj) {
      var result = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            result[key] = deepCopy(obj[key]);   //递归复制
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
    }
```

