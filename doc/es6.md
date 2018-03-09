#引入全部
```
import dva from 'dva';
```

# 引入部分
```
import { connect } from 'dva';
import { Link, Route } from 'dva/router';
```

# 引入全部并作为 github 对象
```
import * as github from './services/github';
```

# 导出默认
```
export default App;
```
# 部分导出，需 import { App } from './file'; 引入
```
export class App extend Component {};
```

#默认参数
```
function logActivity(activity = 'skiing') {
  console.log(activity);
}
```

#模板字符串
```
const user = 'world';
console.log(`hello ${user}`);  # hello world
```
# 多行
```
const content = `
  Hello ${firstName},
  Thanks for ordering ${qty} tickets to ${event}.
`;
```
#析构赋值让我们从 Object 或 Array 里取部分数据存为变量。
# 对象
```
const user = { name: 'guanguan', age: 2 };
const { name, age } = user;
```
#析构传入的函数参数
```
const add = (state, { payload }) => {
  return state.concat(payload);
};
```
#析构时还可以配 alias，让代码更具有语义。
```
const add = (state, { payload: todo }) => {
  return state.concat(todo);
};
```
#对象字面量改进
#这是析构的反向操作，用于重新组织一个 Object 。
```
const name = 'duoduo';
const age = 8;
const user = { name, age };  # { name: 'duoduo', age: 8 }
```
#定义对象方法时，还可以省去 function 关键字。
```
app.model({
  reducers: {
    add() {}  # 等同于 add: function() {}
  },
  effects: {
    *addRemote() {}  # 等同于 addRemote: function*() {}
  },
});
```

#pread Operator 即 3 个点 ...，有几种不同的使用方法。
#可用于组装数组。
```
const todos = ['Learn dva'];
[...todos, 'Learn antd'];  # ['Learn dva', 'Learn antd']
```
也可用于获取数组的部分项。
```
const arr = ['a', 'b', 'c'];
const [first, ...rest] = arr;
rest;  # ['b', 'c']
```

# With ignore
```
const [first, , ...rest] = arr;
rest;  # ['c']
```
还可收集函数参数为数组。
```
function directions(first, ...rest) {
  console.log(rest);
}
```
```
directions('a', 'b', 'c');  # ['b', 'c'];
```
代替 apply。
```
function foo(x, y, z) {}
const args = [1,2,3];
```
# 下面两句效果相同
```
foo.apply(null, args);
foo(...args);
```
对于 Object 而言，用于组合成新的 Object 。(ES2017 stage-2 proposal)
```
const foo = {
  a: 1,
  b: 2,
};
const bar = {
  b: 3,
  c: 2,
};
const d = 4;

const ret = { ...foo, ...bar, d };  # { a:1, b:3, c:2, d:4 }
```
Promise 用于更优雅地处理异步请求。比如发起异步请求：
```
fetch('/api/todos')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(err => ({ err }));
定义 Promise 。
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

delay(1000).then(_ => {
  console.log('executed');
});
```
Generators

dva 的 effects 是通过 generator 组织的。Generator 返回的是迭代器，通过 yield 关键字实现暂停功能。

这是一个典型的 dva effect，通过 yield 把异步逻辑通过同步的方式组织起来。
```
app.model({
  namespace: 'todos',
  effects: {
    *addRemote({ payload: todo }, { put, call }) {
      yield call(addTodo, todo);
      yield put({ type: 'add', payload: todo });
    },
  },
});

```

Promise
```

function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
```
# 运行示例
```
var URL = "http:#httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});

var URL = "http:#httpbin.org/status/500"; #服务端返回的状态码为500
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){ # 为了方便理解函数被命名为 `onRejected`
    console.error(error);
});
```
getURL(URL).then(onFulfilled, onRejected);//onFulfilled, onRejected 是和刚才相同的函数