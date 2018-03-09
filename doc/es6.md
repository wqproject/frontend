#����ȫ��
```
import dva from 'dva';
```

# ���벿��
```
import { connect } from 'dva';
import { Link, Route } from 'dva/router';
```

# ����ȫ������Ϊ github ����
```
import * as github from './services/github';
```

# ����Ĭ��
```
export default App;
```
# ���ֵ������� import { App } from './file'; ����
```
export class App extend Component {};
```

#Ĭ�ϲ���
```
function logActivity(activity = 'skiing') {
  console.log(activity);
}
```

#ģ���ַ���
```
const user = 'world';
console.log(`hello ${user}`);  # hello world
```
# ����
```
const content = `
  Hello ${firstName},
  Thanks for ordering ${qty} tickets to ${event}.
`;
```
#������ֵ�����Ǵ� Object �� Array ��ȡ�������ݴ�Ϊ������
# ����
```
const user = { name: 'guanguan', age: 2 };
const { name, age } = user;
```
#��������ĺ�������
```
const add = (state, { payload }) => {
  return state.concat(payload);
};
```
#����ʱ�������� alias���ô�����������塣
```
const add = (state, { payload: todo }) => {
  return state.concat(todo);
};
```
#�����������Ľ�
#���������ķ������������������֯һ�� Object ��
```
const name = 'duoduo';
const age = 8;
const user = { name, age };  # { name: 'duoduo', age: 8 }
```
#������󷽷�ʱ��������ʡȥ function �ؼ��֡�
```
app.model({
  reducers: {
    add() {}  # ��ͬ�� add: function() {}
  },
  effects: {
    *addRemote() {}  # ��ͬ�� addRemote: function*() {}
  },
});
```

#pread Operator �� 3 ���� ...���м��ֲ�ͬ��ʹ�÷�����
#��������װ���顣
```
const todos = ['Learn dva'];
[...todos, 'Learn antd'];  # ['Learn dva', 'Learn antd']
```
Ҳ�����ڻ�ȡ����Ĳ����
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
�����ռ���������Ϊ���顣
```
function directions(first, ...rest) {
  console.log(rest);
}
```
```
directions('a', 'b', 'c');  # ['b', 'c'];
```
���� apply��
```
function foo(x, y, z) {}
const args = [1,2,3];
```
# ��������Ч����ͬ
```
foo.apply(null, args);
foo(...args);
```
���� Object ���ԣ�������ϳ��µ� Object ��(ES2017 stage-2 proposal)
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
Promise ���ڸ����ŵش����첽���󡣱��緢���첽����
```
fetch('/api/todos')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(err => ({ err }));
���� Promise ��
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

dva �� effects ��ͨ�� generator ��֯�ġ�Generator ���ص��ǵ�������ͨ�� yield �ؼ���ʵ����ͣ���ܡ�

����һ�����͵� dva effect��ͨ�� yield ���첽�߼�ͨ��ͬ���ķ�ʽ��֯������
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
# ����ʾ��
```
var URL = "http:#httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});

var URL = "http:#httpbin.org/status/500"; #����˷��ص�״̬��Ϊ500
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){ # Ϊ�˷�����⺯��������Ϊ `onRejected`
    console.error(error);
});
```
getURL(URL).then(onFulfilled, onRejected);//onFulfilled, onRejected �Ǻ͸ղ���ͬ�ĺ���