# Generators & Iterators

## Generator

Generator 是个带`*`标记的函数，函数执行后返回一个对应的Iterator，这个Iterator用来进行迭代执行Generator函数内的代码，直到这个函数执行完毕。Generator在执行过程中遇到`yield`方法则抛出一个Iteration,其中包含了`yield`后面的promise对象。

```javascript
function *() {
  ...
}
```

## Iterator

Iterator 是对应Generator创建出来的"迭代器", 每个Iterator都有一个`.netx()`方法，该用来向Generator内部传递`yield`方法需要处理的数据(通过promise).同时包装并返回下一个需要迭代的Iteration。

## Iteration

Iteration 是对`yield`抛出内容的封装，包括`value`和`done`，其中`value`包含`yield`出来的内容，`done`则表示`generator`是否没有了后续需要在处理的内容。
