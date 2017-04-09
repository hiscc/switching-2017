# clean-code-javascript

## Table of Contents
  1. [Introduction](#introduction)
  2. [Variables](#variables)
  3. [Functions](#functions)
  4. [Objects and Data Structures](#objects-and-data-structures)
  5. [Classes](#classes)
  6. [Testing](#testing)
  7. [Concurrency](#concurrency)
  8. [Error Handling](#error-handling)
  9. [Formatting](#formatting)
  10. [Comments](#comments)

## Introduction
![Humorous image of software quality estimation as a count of how many expletives
you shout when reading code](http://www.osnews.com/images/comics/wtfm.jpg)

Software engineering principles, from Robert C. Martin's book
[*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882),
adapted for JavaScript. This is not a style guide. It's a guide to producing
readable, reusable, and refactorable software in JavaScript.

这是符合Robert C. Martin的 [*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) 软件工程原则的 Javascript 版本。
这不是一套风格指南，它只是一份在 Javascript 中写出可读、可复用、可重构代码的指南。

Not every principle herein has to be strictly followed, and even fewer will be
universally agreed upon. These are guidelines and nothing more, but they are
ones codified over many years of collective experience by the authors of
*Clean Code*.

你不必严格遵守在这里的所有原则， 求同存异。 这只是一份指南而已， 但这也是由 *Clean Code* 的编纂者多年来经验的总结。

Our craft of software engineering is just a bit over 50 years old, and we are
still learning a lot. When software architecture is as old as architecture
itself, maybe then we will have harder rules to follow. For now, let these
guidelines serve as a touchstone by which to assess the quality of the
JavaScript code that you and your team produce.

我们软件工程历史只有 50 多年，我们依然有很多东西要去学习。当软件架构的历史越来越长时，我们对于这些规则可能很难去遵守。
但是现在，让这份指南成为那些你和你的团队编写的 Javascipt 的试金石吧。

One more thing: knowing these won't immediately make you a better software
developer, and working with them for many years doesn't mean you won't make
mistakes. Every piece of code starts as a first draft, like wet clay getting
shaped into its final form. Finally, we chisel away the imperfections when
we review it with our peers. Don't beat yourself up for first drafts that need
improvement. Beat up the code instead!

还有一件事： 知道这些不会立即让你成为更好的软件工程师，也不一定在将来让你少犯错误。每一段代码都从第一稿开始，就像湿粘土到它最终形状一样。
最后我们将会重新审视并凿去它的缺陷。别被这些需要改进的指南所打倒，去打倒这些指南吧。
## **Variables**
### Use meaningful and pronounceable variable names
### 使用有意义可判断的变量名

**Bad:**
```javascript
const yyyymmdstr = moment().format('YYYY/MM/DD');
```

**Good**:
```javascript
const yearMonthDay = moment().format('YYYY/MM/DD');
```
**[⬆ back to top](#table-of-contents)**

### Use the same vocabulary for the same type of variable
### 对同一类型的变量使用一致的词语

**Bad:**
```javascript
getUserInfo();
getClientData();
getCustomerRecord();
```

**Good**:
```javascript
getUser();
```
**[⬆ back to top](#table-of-contents)**

### Use searchable names
### 使用表意的名字
We will read more code than we will ever write. It's important that the code we
do write is readable and searchable. By *not* naming variables that end up
being meaningful for understanding our program, we hurt our readers.
Make your names searchable. Tools like
[buddy.js](https://github.com/danielstjules/buddy.js) and
[ESLint](https://github.com/eslint/eslint/blob/660e0918933e6e7fede26bc675a0763a6b357c94/docs/rules/no-magic-numbers.md)
can help identify unnamed constants.


我们读的代码远比写的要多。代码的可读性和表意性非常重要。未命名变量导致理解我们的程序变得扑朔迷离，这伤害了我们的读者。
[buddy.js](https://github.com/danielstjules/buddy.js) 和
[ESLint](https://github.com/eslint/eslint/blob/660e0918933e6e7fede26bc675a0763a6b357c94/docs/rules/no-magic-numbers.md)
可以帮助我们找出这些未命名的常量。

**Bad:**
```javascript
// What the heck is 86400 for?
// 86400 丫的是什么？
setTimeout(() => {
  this.blastOff()
}, 86400);

```

**Good**:
```javascript
// Declare them as capitalized `const` globals.
// 把它们作为大写的全局常量声明
const SECONDS_IN_A_DAY = 86400;

setTimeout(() => {
  this.blastOff()
}, SECONDS_IN_A_DAY);

```
**[⬆ back to top](#table-of-contents)**

### Use explanatory variables
### 使用自说明的变量
**Bad:**
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityStateRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityState(address.match(cityStateRegex)[1], address.match(cityStateRegex)[2]);
```

**Good**:
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityStateRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, state] = address.match(cityStateRegex);
saveCityState(city, state);
```
**[⬆ back to top](#table-of-contents)**

### Avoid Mental Mapping
### 避免不清晰的映射
Explicit is better than implicit.

显性优于隐性

**Bad:**
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((l) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // Wait, what is `l` for again?
  // 等等，l 到底代表啥？
  dispatch(l);
});
```

**Good**:
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((location) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});
```
**[⬆ back to top](#table-of-contents)**

### Don't add unneeded context
### 不要增加不需要的上下文
If your class/object name tells you something, don't repeat that in your
variable name.

如果你的类或者对象的名字已经告诉你了一些信息，别再在你的变量中重复。

**Bad:**
```javascript
const Car = {
  carMake: 'Honda',
  carModel: 'Accord',
  carColor: 'Blue'
};

function paintCar(car) {
  car.carColor = 'Red';
}
```

**Good**:
```javascript
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue'
};

function paintCar(car) {
  car.color = 'Red';
}
```
**[⬆ back to top](#table-of-contents)**

### Use default arguments instead of short circuiting or conditionals
### 使用默认参数避免条件赋值

**Bad:**
```javascript
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.';
  ...
}

```

**Good**:
```javascript
function createMicrobrewery(breweryName = 'Hipster Brew Co.') {
  ...
}

```
**[⬆ back to top](#table-of-contents)**

## **Functions**
### Function arguments (2 or fewer ideally)
### 函数参数 (2个或更少)
Limiting the amount of function parameters is incredibly important because it
makes testing your function easier. Having more than three leads to a
combinatorial explosion where you have to test tons of different cases with
each separate argument.

限制函数参数是非常重要的，它使测试函数更简单。当你测试成吨的拥有单独参数的事例时，那些有三个以上的参数的事例将成为一个组合炸弹。

Zero arguments is the ideal case. One or two arguments is ok, and three should
be avoided. Anything more than that should be consolidated. Usually, if you have
more than two arguments then your function is trying to do too much. In cases
where it's not, most of the time a higher-level object will suffice as an
argument.

零参数是个理想状况。一到两个参数也没问题，但要避免三个参数。多余两个参数就应该合并。通常，当你的函数有两个以上的参数时，它
的参数还会增加。在大多数情况下，一个高级别的对象足以作为一个参数。

Since JavaScript allows us to make objects on the fly, without a lot of class
boilerplate, you can use an object if you are finding yourself needing a
lot of arguments.

因为 Javascript 允许我们在没有大量类模板时轻松创建对象，所以当你发现你需要一大堆参数时使用对象。

**Bad:**
```javascript
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

**Good**:
```javascript
const menuConfig = {
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
};

function createMenu(config) {
  // ...
}

```
**[⬆ back to top](#table-of-contents)**


### Functions should do one thing
### 函数应该只做一件事
This is by far the most important rule in software engineering. When functions
do more than one thing, they are harder to compose, test, and reason about.
When you can isolate a function to just one action, they can be refactored
easily and your code will read much cleaner. If you take nothing else away from
this guide other than this, you'll be ahead of many developers.

这是软件工程中一直以来最重要的规则。当函数完成一件以上的事时，函数将变得难以编写、测试。
当你以单个动作来分隔函数时，它们可以容易地被重构，你的代码读起来将更明了。如果你记住这一点，你就已经领先了很多开发者了。

**Bad:**
```javascript
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Good**:
```javascript
function emailClients(clients) {
  clients
    .filter(isClientActive)
    .forEach(email);
}

function isClientActive(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```
**[⬆ back to top](#table-of-contents)**

### Function names should say what they do
### 函数名应该告诉你这个函数是干啥的

**Bad:**
```javascript
function addToDate(date, month) {
  // ...
}

const date = new Date();

// It's hard to to tell from the function name what is added
addToDate(date, 1);
```

**Good**:
```javascript
function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);
```
**[⬆ back to top](#table-of-contents)**

### Functions should only be one level of abstraction
### 函数应该只有一层抽象
When you have more than one level of abstraction your function is usually
doing too much. Splitting up functions leads to reusability and easier
testing.

多于一层以上的抽象让函数做得太多。拆分函数后更可读也更易测试。

**Bad:**
```javascript
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

**Good**:
```javascript
function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function lexer(tokens) {
  const ast = [];
  tokens.forEach((token) => {
    ast.push( /* ... */ );
  });

  return ast;
}

function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const ast = lexer(tokens);
  ast.forEach((node) => {
    // parse...
  });
}
```
**[⬆ back to top](#table-of-contents)**

### Remove duplicate code
### 移除重复代码
Never ever, ever, under any circumstance, have duplicate code. There's no reason
for it and it's quite possibly the worst sin you can commit as a professional
developer. Duplicate code means there's more than one place to alter something
if you need to change some logic. JavaScript is untyped, so it makes having
generic functions quite easy. Take advantage of that! Tools like
[jsinspect](https://github.com/danielstjules/jsinspect) can help you find duplicate
code eligible for refactoring.

在任何情况下也不该有重复的代码！这对于一个专业的开发者来说是十足的罪恶。重复代码意味着如果你想改变一些逻辑有很多地方需要改。Javascript 是无类型的，所以拥有一个通用函数非常容易。利用好这一点！像[jsinspect](https://github.com/danielstjules/jsinspect)
一类的工具可以帮你找到那些完全可重构的重复代码。

**Bad:**
```javascript
function showDeveloperList(developers) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary: expectedSalary,
      experience: experience,
      githubLink: githubLink
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary: expectedSalary,
      experience: experience,
      portfolio: portfolio
    };

    render(data);
  });
}
```

**Good**:
```javascript
function showList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    let portfolio = employee.getGithubLink();

    if (employee.type === 'manager') {
      portfolio = employee.getMBAProjects();
    }

    const data = {
      expectedSalary: expectedSalary,
      experience: experience,
      portfolio: portfolio
    };

    render(data);
  });
}
```
**[⬆ back to top](#table-of-contents)**

### Set default objects with Object.assign
### 用 Object.assign 设置默认对象

**Bad:**
```javascript
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true
};

function createMenu(config) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable = config.cancellable === undefined ? config.cancellable : true;

}

createMenu(menuConfig);
```

**Good**:
```javascript
const menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true
};

function createMenu(config) {
  config = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```
**[⬆ back to top](#table-of-contents)**


### Don't use flags as function parameters
### 别用标志作为函数的参数
Flags tell your user that this function does more than one thing. Functions should do one thing. Split out your functions if they are following different code paths based on a boolean.

那些用来告诉你的用户这个函数做一件以上事的标志。函数应该只做一件事。当一个函数基于 boolean 值来执行时，拆分函数。

**Bad:**
```javascript
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Good**:
```javascript
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```
**[⬆ back to top](#table-of-contents)**

### Avoid Side Effects
### 远离副作用
A function produces a side effect if it does anything other than take a value in
and return another value or values. A side effect could be writing to a file,
modifying some global variable, or accidentally wiring all your money to a
stranger.

如果一个函数只用来取值或用来返回一些值，将产生副作用。副作用可以被写入文件、修改全局变量、或者把你的钱转给一个陌生人。

Now, you do need to have side effects in a program on occasion. Like the previous
example, you might need to write to a file. What you want to do is to
centralize where you are doing this. Don't have several functions and classes
that write to a particular file. Have one service that does it. One and only one.

但是，在某些场合你有时确实需要副作用。如同前面的例子，你可能需要写入一个文件。集中处理你想做的，不要把它们放在各自的文件中。只让一个服务来做这些。

The main point is to avoid common pitfalls like sharing state between objects
without any structure, using mutable data types that can be written to by anything,
and not centralizing where your side effects occur. If you can do this, you will
be happier than the vast majority of other programmers.

避免像在无结构对象间分享状态这样的普通陷阱的要点是，使用那些哪都能被写入的可变数据类型，不要让副作用集中产生。如果你能做到这个，你将比大多数开发者更加快乐。

**Bad:**
```javascript
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
let name = 'Ryan McDermott';

function splitIntoFirstAndLastName() {
  name = name.split(' ');
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
```

**Good**:
```javascript
function splitIntoFirstAndLastName(name) {
  return name.split(' ');
}

const name = 'Ryan McDermott';
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
```
**[⬆ back to top](#table-of-contents)**

### Don't write to global functions
### 别写全局函数
Polluting globals is a bad practice in JavaScript because you could clash with another
library and the user of your API would be none-the-wiser until they get an
exception in production. Let's think about an example: what if you wanted to
extend JavaScript's native Array method to have a `diff` method that could
show the difference between two arrays? You could write your new function
to the `Array.prototype`, but it could clash with another library that tried
to do the same thing. What if that other library was just using `diff` to find
the difference between the first and last elements of an array? This is why it
would be much better to just use ES2015/ES6 classes and simply extend the `Array` global.

污染全局在 Javascript 中是很糟糕的实践，因为你可能与其他库产生冲突。使用 API 的用户可没聪明到在生产环境前发现异常。
让我们假设有这样一个例子：当你想要扩展 Javascript 的原生数组方法，让它拥有展示两个数组间不同的 `diff` 方法，将发生什么呢？
你可以在 `Array.prototype` 上实现新函数，但它可能与其它实现同样功能的库发生冲突。如果另外一个库也使用 `diff` 去查找在一个数组中
存在的不同元素会发生什么呢? 这就是使用 ES2015/ES6 类和简单扩展 `Array` 会更好的原因。

**Bad:**
```javascript
Array.prototype.diff = function diff(comparisonArray) {
  const values = [];
  const hash = {};

  for (const i of comparisonArray) {
    hash[i] = true;
  }

  for (const i of this) {
    if (!hash[i]) {
      values.push(i);
    }
  }

  return values;
};
```

**Good:**
```javascript
class SuperArray extends Array {
  constructor(...args) {
    super(...args);
  }

  diff(comparisonArray) {
    const values = [];
    const hash = {};

    for (const i of comparisonArray) {
      hash[i] = true;
    }

    for (const i of this) {
      if (!hash[i]) {
        values.push(i);
      }
    }

    return values;
  }
}
```
**[⬆ back to top](#table-of-contents)**

### Favor functional programming over imperative programming
### 坚持使用函数式编程而非命令式编程
JavaScript isn't a functional language in the way that Haskell is, but it has
a functional flavor to it. Functional languages are cleaner and easier to test.
Favor this style of programming when you can.

Javascript 不是一门像 Haskell 那样的函数式语言，但是它拥有函数性的功能。 函数式语言更易于明了也更易于测试。
当你能这样做时坚持这种编程风格。

**Bad:**
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

**Good**:
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

const totalOutput = programmerOutput
  .map((programmer) => programmer.linesOfCode)
  .reduce((acc, linesOfCode) => acc + linesOfCode, 0);
```
**[⬆ back to top](#table-of-contents)**

### Encapsulate conditionals
### 封装条件

**Bad:**
```javascript
if (fsm.state === 'fetching' && isEmpty(listNode)) {
  // ...
}
```

**Good**:
```javascript
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === 'fetching' && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```
**[⬆ back to top](#table-of-contents)**

### Avoid negative conditionals
### 避免负条件

**Bad:**
```javascript
function isDOMNodeNotPresent(node) {
  // ...
}

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Good**:
```javascript
function isDOMNodePresent(node) {
  // ...
}

if (isDOMNodePresent(node)) {
  // ...
}
```
**[⬆ back to top](#table-of-contents)**

### Avoid conditionals
### 避免条件判断
This seems like an impossible task. Upon first hearing this, most people say,
"how am I supposed to do anything without an `if` statement?" The answer is that
you can use polymorphism to achieve the same task in many cases. The second
question is usually, "well that's great but why would I want to do that?" The
answer is a previous clean code concept we learned: a function should only do
one thing. When you have classes and functions that have `if` statements, you
are telling your user that your function does more than one thing. Remember,
just do one thing.

这好像是个不可能的任务。 迄今为止，大多数人都会说， “没有了 `if` 语句我应该怎么办？” 在许多例子中利用多态性来实现相同的任务就是答案。
第二个问题往往是这样的， “好啊，那很好但我为什么要这样做呢？” 答案正是我们先前说过的概念： 一个函数应该只干一件事。 当一个函数中出现 `if` 语句便是告诉你的用户说，
这个函数可以完成不止一件事。 记住， 只干一件事。

**Bad:**
```javascript
class Airplane {
  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```

**Good**:
```javascript
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```
**[⬆ back to top](#table-of-contents)**

### Avoid type-checking (part 1)
### 避免类型检查 (part 1)
JavaScript is untyped, which means your functions can take any type of argument.
Sometimes you are bitten by this freedom and it becomes tempting to do
type-checking in your functions. There are many ways to avoid having to do this.
The first thing to consider is consistent APIs.

JavaScript 是无类型的， 也意味着你的函数可以使用任何类型的参数。 有时你也会因这种自由而倒霉， 对你的函数中进行类型检查将变得很有诱惑。 这儿有很多方式去避免这样做。 使用一致的 APIs 就是第一种方式。

**Bad:**
```javascript
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.peddle(this.currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location('texas'));
  }
}
```

**Good**:
```javascript
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location('texas'));
}
```
**[⬆ back to top](#table-of-contents)**

### Avoid type-checking (part 2)
### 避免类型检查 (part 2)
If you are working with basic primitive values like strings, integers, and arrays,
and you can't use polymorphism but you still feel the need to type-check,
you should consider using TypeScript. It is an excellent alternative to normal
JavaScript, as it provides you with static typing on top of standard JavaScript
syntax. The problem with manually type-checking normal JavaScript is that
doing it well requires so much extra verbiage that the faux "type-safety" you get
doesn't make up for the lost readability. Keep your JavaScript clean, write
good tests, and have good code reviews. Otherwise, do all of that but with
TypeScript (which, like I said, is a great alternative!).

如果你使用基本原始值如字符串、 整型、 数组， 那么你无法使用多态。 如果你依然觉得需要类型检查， 请考虑使用 TypeScript。
它是一种替代普通 JavaScript 很棒的选择， 因为它提供了在标准 JavaScript 语法之上的静态类型。 问题在于手动的类型检查普通的 JavaScript
这很好， 但它需要如此多额外啰嗦的人造 “安全类型” 最后却无法弥补其丢失的可读性。 保持你的代码干净， 写好测试， 做好代码复查。 另外， 实在不行就用 TypeScript(正如我说， 一个很棒的选择)吧。

**Bad:**
```javascript
function combine(val1, val2) {
  if (typeof val1 === 'number' && typeof val2 === 'number' ||
      typeof val1 === 'string' && typeof val2 === 'string') {
    return val1 + val2;
  }

  throw new Error('Must be of type String or Number');
}
```

**Good**:
```javascript
function combine(val1, val2) {
  return val1 + val2;
}
```
**[⬆ back to top](#table-of-contents)**

### Don't over-optimize
### 不要过度优化
Modern browsers do a lot of optimization under-the-hood at runtime. A lot of
times, if you are optimizing then you are just wasting your time. [There are good
resources](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
for seeing where optimization is lacking. Target those in the meantime, until
they are fixed if they can be.

现代浏览器在运行时做了大量的底层优化。 如果你一直在优化的话， 你只是在浪费大部分时间。 [这里是点好资源](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
去看看还缺哪里的优化。 瞄准这些的同时， 直到这些问题被修复。

**Bad:**
```javascript

// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Good**:
```javascript
for (let i = 0; i < list.length; i++) {
  // ...
}
```
**[⬆ back to top](#table-of-contents)**

### Remove dead code
### 移除无用代码
Dead code is just as bad as duplicate code. There's no reason to keep it in
your codebase. If it's not being called, get rid of it! It will still be safe
in your version history if you still need it.

死代码就像重复代码一样糟糕。 没有理由把它们留在你在代码基中。 如果它没有被调用， 赶紧摆脱它！
它将一直安全地存在于版本历史中如果你还需要它的话。

**Bad:**
```javascript
function oldRequestModule(url) {
  // ...
}

function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');

```

**Good**:
```javascript
function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```
**[⬆ back to top](#table-of-contents)**

## **Objects and Data Structures**
### Use getters and setters
### 使用 getters 和 setters
JavaScript doesn't have interfaces or types so it is very hard to enforce this
pattern, because we don't have keywords like `public` and `private`. As it is,
using getters and setters to access data on objects is far better than simply
looking for a property on an object. "Why?" you might ask. Well, here's an
unorganized list of reasons why:

JavaScript 没有接口或类型， 所以很难去执行这种模式， 因为我们没有类似于 `public` 和 `private` 这样的关键字。
正因如此， 使用 getters 和 setters 去获取数据远比在对象上简单地查找好的多。 “为啥？” 你可能会问。 很好， 这下面有一串原因。
* When you want to do more beyond getting an object property, you don't have
to look up and change every accessor in your codebase.
* Makes adding validation simple when doing a `set`.
* Encapsulates the internal representation.
* Easy to add logging and error handling when getting and setting.
* Inheriting this class, you can override default functionality.
* You can lazy load your object's properties, let's say getting it from a
server.



* 当你想要在取到一个对象属性上做更多的事时，你不需要向上查找也不需要改变每一个代码基中的访问器。
* 当有 `set` 时增加一个验证器很简单。
* 封装内部呈现状态
* 当有 getting 和 setting 时增加日志和错误处理更简单。
* 继承自类， 你可以重写默认功能。
* 你可以使用懒加载你的对象属性，就像从一个服务中取得一样。

**Bad:**
```javascript
class BankAccount {
  constructor() {
    this.balance = 1000;
  }
}

const bankAccount = new BankAccount();

// Buy shoes...
bankAccount.balance -= 100;
```

**Good**:
```javascript
class BankAccount {
  constructor(balance = 1000) {
    this._balance = balance;
  }

  // It doesn't have to be prefixed with `get` or `set` to be a getter/setter
  set balance(amount) {
    if (verifyIfAmountCanBeSetted(amount)) {
      this._balance = amount;
    }
  }

  get balance() {
    return this._balance;
  }

  verifyIfAmountCanBeSetted(val) {
    // ...
  }
}

const bankAccount = new BankAccount();

// Buy shoes...
bankAccount.balance -= shoesPrice;

// Get balance
let balance = bankAccount.balance;

```
**[⬆ back to top](#table-of-contents)**


### Make objects have private members
### 使对象拥有私有成员
This can be accomplished through closures (for ES5 and below).

这可以通过闭包来完成(对于 ES5 及以下)

**Bad:**
```javascript

const Employee = function(name) {
  this.name = name;
};

Employee.prototype.getName = function getName() {
  return this.name;
};

const employee = new Employee('John Doe');
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: undefined
```

**Good**:
```javascript
const Employee = function (name) {
  this.getName = function getName() {
    return name;
  };
};

const employee = new Employee('John Doe');
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
```
**[⬆ back to top](#table-of-contents)**


## **Classes**
### Single Responsibility Principle (SRP)
### 单一原则
As stated in Clean Code, "There should never be more than one reason for a class
to change". It's tempting to jam-pack a class with a lot of functionality, like
when you can only take one suitcase on your flight. The issue with this is
that your class won't be conceptually cohesive and it will give it many reasons
to change. Minimizing the amount of times you need to change a class is important.
It's important because if too much functionality is in one class and you modify a piece of it,
it can be difficult to understand how that will affect other dependent modules in
your codebase.

正如 Clean Code 里所陈述的， “类的改变只有一个原因”。 把一堆功能塞进类中是很诱人的， 就像你在航行中只能带一个手提箱一样。 这样做的问题是你的类
将不会在概念上具有凝聚力而且还会因各种原因而去修改。 最小化你修改类的次数很重要。
这很重要因为如果一个类拥有太多的功能而你只修改其中一个， 很难去弄明白这些修改是如何在代码基中影响其它依赖模块的。

**Bad:**
```javascript
class UserSettings {
  constructor(user) {
    this.user = user;
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

**Good**:
```javascript
class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    // ...
  }
}


class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```
**[⬆ back to top](#table-of-contents)**

### Open/Closed Principle (OCP)
### 开关原则
As stated by Bertrand Meyer, "software entities (classes, modules, functions,
etc.) should be open for extension, but closed for modification." What does that
mean though? This principle basically states that you should allow users to
extend the functionality of your module without having to open up the `.js`
source code file and manually manipulate it.

正如 Bertrand Meyer 所言， “软件实体（类、模块、函数等）应该是可以扩展的， 但是不可修改的。”
这到底意味着什么？ 这个原则基本上在说， 你应该允许用户对模块中的功能进行扩展而不用打开源文件去手动操作。

**Bad:**
```javascript
class AjaxRequester {
  constructor() {
    // What if we wanted another HTTP Method, like DELETE? We would have to
    // open this file up and modify this and put it in manually.
    this.HTTP_METHODS = ['POST', 'PUT', 'GET'];
  }

  get(url) {
    // ...
  }

}
```

**Good**:
```javascript
class AjaxRequester {
  constructor() {
    this.HTTP_METHODS = ['POST', 'PUT', 'GET'];
  }

  get(url) {
    // ...
  }

  addHTTPMethod(method) {
    this.HTTP_METHODS.push(method);
  }
}
```
**[⬆ back to top](#table-of-contents)**


### Liskov Substitution Principle (LSP)
### 里氏替代原则 (LSP)
This is a scary term for a very simple concept. It's formally defined as "If S
is a subtype of T, then objects of type T may be replaced with objects of type S
(i.e., objects of type S may substitute objects of type T) without altering any
of the desirable properties of that program (correctness, task performed,
etc.)." That's an even scarier definition.

这是一个很简单概念的可怕术语。 它在形式上定义了， “如果 S 是 T 的子类型，则类型 T 的对象可以被类型 S 的对象替换而不需要改变任何程序期望的属性”
这就是那个很可怕的定义。

The best explanation for this is if you have a parent class and a child class,
then the base class and child class can be used interchangeably without getting
incorrect results. This might still be confusing, so let's take a look at the
classic Square-Rectangle example. Mathematically, a square is a rectangle, but
if you model it using the "is-a" relationship via inheritance, you quickly
get into trouble.

对这个概念最好的解释是这样， 如果有一个父类和一个子类， 基类可以和子类互换后结果一致。 这解释可能还不够清楚， 所以让我们来看看这个经典的 Square-Rectangle 例子。 从数学上来说， 一个 Square 也是一个 Rectangle， 但是如果你通过继承使用 “is-a” 的关系对其进行建模，你很快就会遇到问题。

**Bad:**
```javascript
class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor() {
    super();
  }

  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); // BAD: Will return 25 for Square. Should be 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

**Good**:
```javascript
class Shape {
  constructor() {}

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }
}

class Rectangle extends Shape {
  constructor() {
    super();
    this.width = 0;
    this.height = 0;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor() {
    super();
    this.length = 0;
  }

  setLength(length) {
    this.length = length;
  }

  getArea() {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes) {
  shapes.forEach((shape) => {
    switch (shape.constructor.name) {
      case 'Square':
        shape.setLength(5);
        break;
      case 'Rectangle':
        shape.setWidth(4);
        shape.setHeight(5);
    }

    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(), new Rectangle(), new Square()];
renderLargeShapes(shapes);
```
**[⬆ back to top](#table-of-contents)**

### Interface Segregation Principle (ISP)
### 接口分离原则 (ISP)
JavaScript doesn't have interfaces so this principle doesn't apply as strictly
as others. However, it's important and relevant even with JavaScript's lack of
type system.

JavaScript 没有接口， 所以在这不能严格地适用。 但是， 它对 JavaScript 缺乏类型的系统很重要也很相关。

ISP states that "Clients should not be forced to depend upon interfaces that
they do not use." Interfaces are implicit contracts in JavaScript because of
duck typing.

ISP 说明了“客户端不应该被迫依赖于它们不需要的接口。” 由于 JavaScript 的“鸭子类型” ， JavaScript 当中的接口也只是一种隐性的契约。

A good example to look at that demonstrates this principle in JavaScript is for
classes that require large settings objects. Not requiring clients to setup
huge amounts of options is beneficial, because most of the time they won't need
all of the settings. Making them optional helps prevent having a "fat interface".

这一点在 JavaScript 中较为典型的例子就是那些需要大量配置信息的类。 其实使用者并不需要去关心每一个配置项， 不强制他们设置大量的选项能够节省大量的时间， 保持设置选项可选能够有助于防止“胖接口”。

**Bad:**
```javascript
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.animationModule.setup();
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  animationModule() {} // Most of the time, we won't need to animate when traversing.
  // ...
});

```

**Good**:
```javascript
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.options = settings.options;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.setupOptions();
  }

  setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  options: {
    animationModule() {}
  }
});
```
**[⬆ back to top](#table-of-contents)**

### Dependency Inversion Principle (DIP)
### 依赖倒转原则 (DIP)
This principle states two essential things:
1. High-level modules should not depend on low-level modules. Both should
depend on abstractions.
2. Abstractions should not depend upon details. Details should depend on
abstractions.

这个原则说了两件事：
1. 高阶模块不应依赖于低阶模块。 它们都应依赖抽象
2. 抽象不应依赖细节。 细节不应依赖抽象

This can be hard to understand at first, but if you've worked with Angular.js,
you've seen an implementation of this principle in the form of Dependency
Injection (DI). While they are not identical concepts, DIP keeps high-level
modules from knowing the details of its low-level modules and setting them up.
It can accomplish this through DI. A huge benefit of this is that it reduces
the coupling between modules. Coupling is a very bad development pattern because
it makes your code hard to refactor.

首先这很难理解， 但是如果用过 Angular.js 的话，你就会知道依赖注入 (DI) 就是这么回事。 而它们却是不一样的概念， DIP 从低阶模块中已知的细节中保持了高阶模块。 它可以通过依赖注入完成。 最大的好处是它可以减少模块间的耦合。 耦合是一种很糟糕的开发模式。 因为耦合使得代码难以重构。

As stated previously, JavaScript doesn't have interfaces so the abstractions
that are depended upon are implicit contracts. That is to say, the methods
and properties that an object/class exposes to another object/class. In the
example below, the implicit contract is that any Request module for an
`InventoryTracker` will have a `requestItems` method.

正如前述， JavaScript 没有接口所以抽象依赖于隐含的协议。 可以这么说， 就像一个对象或类暴露给另一个对象或类的方法和属性， 隐含协议是指任何 `InventoryTracker` 的请求模块都有一个 `requestItems` 方法。

**Bad:**
```javascript
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryTracker {
  constructor(items) {
    this.items = items;

    // BAD: We have created a dependency on a specific request implementation.
    // We should just have requestItems depend on a request method: `request`
    this.requester = new InventoryRequester();
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

const inventoryTracker = new InventoryTracker(['apples', 'bananas']);
inventoryTracker.requestItems();
```

**Good**:
```javascript
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

class InventoryRequesterV1 {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryRequesterV2 {
  constructor() {
    this.REQ_METHODS = ['WS'];
  }

  requestItem(item) {
    // ...
  }
}

// By constructing our dependencies externally and injecting them, we can easily
// substitute our request module for a fancy new one that uses WebSockets.
const inventoryTracker = new InventoryTracker(['apples', 'bananas'], new InventoryRequesterV2());
inventoryTracker.requestItems();
```
**[⬆ back to top](#table-of-contents)**

### Prefer ES2015/ES6 classes over ES5 plain functions
### 首选 ES2015/ES6 类而非 ES5 纯函数
It's very difficult to get readable class inheritance, construction, and method
definitions for classical ES5 classes. If you need inheritance (and be aware
that you might not), then prefer classes. However, prefer small functions over
classes until you find yourself needing larger and more complex objects.

对于经典的 ES5 类来说， 写一个可读的继承类、 结构、 定义方法是很难的。 如果你需要继承，首选类继承。 但是， 首选小函数而非类除非你发现你需要更大更多复杂的对象。

**Bad:**
```javascript
const Animal = function(age) {
  if (!(this instanceof Animal)) {
    throw new Error('Instantiate Animal with `new`');
  }

  this.age = age;
};

Animal.prototype.move = function move() {};

const Mammal = function(age, furColor) {
  if (!(this instanceof Mammal)) {
    throw new Error('Instantiate Mammal with `new`');
  }

  Animal.call(this, age);
  this.furColor = furColor;
};

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.liveBirth = function liveBirth() {};

const Human = function(age, furColor, languageSpoken) {
  if (!(this instanceof Human)) {
    throw new Error('Instantiate Human with `new`');
  }

  Mammal.call(this, age, furColor);
  this.languageSpoken = languageSpoken;
};

Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
Human.prototype.speak = function speak() {};
```

**Good:**
```javascript
class Animal {
  constructor(age) {
    this.age = age;
  }

  move() { /* ... */ }
}

class Mammal extends Animal {
  constructor(age, furColor) {
    super(age);
    this.furColor = furColor;
  }

  liveBirth() { /* ... */ }
}

class Human extends Mammal {
  constructor(age, furColor, languageSpoken) {
    super(age, furColor);
    this.languageSpoken = languageSpoken;
  }

  speak() { /* ... */ }
}
```
**[⬆ back to top](#table-of-contents)**


### Use method chaining
### 使用方法链
Against the advice of Clean Code, this is one place where we will have to differ.
It has been argued that method chaining is unclean and violates the [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter).
Maybe it's true, but this pattern is very useful in JavaScript and you see it in
many libraries such as jQuery and Lodash. It allows your code to be expressive,
and less verbose. For that reason, I say, use method chaining and take a look at
how clean your code will be. In your class functions, simply return `this` at
the end of every function, and you can chain further class methods onto it.

与 Clean Code 的建议相反， 这个地方我们必须不一样。 这一直被争论方法链是不简洁的而且违反了[Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter)。 也许这是事实， 但是这种模式在 JavaScript 中非常有用， 例如在 jQuery 和 Lodash 这样的库中。 它让你的代码更明了而且没那么啰嗦。 至于原因， 用了方法链后就知道你的代码有多么简洁了。 在类函数最后简单地返回 `this` ，你就能为它链接更多的类方法。

**Bad:**
```javascript
class Car {
  constructor() {
    this.make = 'Honda';
    this.model = 'Accord';
    this.color = 'white';
  }

  setMake(make) {
    this.make = make;
  }

  setModel(model) {
    this.model = model;
  }

  setColor(color) {
    this.color = color;
  }

  save() {
    console.log(this.make, this.model, this.color);
  }
}

const car = new Car();
car.setColor('pink');
car.setMake('Ford');
car.setModel('F-150');
car.save();
```

**Good**:
```javascript
class Car {
  constructor() {
    this.make = 'Honda';
    this.model = 'Accord';
    this.color = 'white';
  }

  setMake(make) {
    this.make = make;
    // NOTE: Returning this for chaining
    return this;
  }

  setModel(model) {
    this.model = model;
    // NOTE: Returning this for chaining
    return this;
  }

  setColor(color) {
    this.color = color;
    // NOTE: Returning this for chaining
    return this;
  }

  save() {
    console.log(this.make, this.model, this.color);
    // NOTE: Returning this for chaining
    return this;
  }
}

const car = new Car()
  .setColor('pink')
  .setMake('Ford')
  .setModel('F-150')
  .save();
```
**[⬆ back to top](#table-of-contents)**

### Prefer composition over inheritance
### 首选组合而非继承
As stated famously in [*Design Patterns*](https://en.wikipedia.org/wiki/Design_Patterns) by the Gang of Four,
you should prefer composition over inheritance where you can. There are lots of
good reasons to use inheritance and lots of good reasons to use composition.
The main point for this maxim is that if your mind instinctively goes for
inheritance, try to think if composition could model your problem better. In some
cases it can.

正如大名鼎鼎的 Gang of Four 在 [*Design Patterns*](https://en.wikipedia.org/wiki/Design_Patterns) 中所说，尽量使用组合而非继承。 组合和继承各有好处。格言的要点是如果你本能地选择继承， 想想对于你的问题组合是不是更好。 有些情况下是的。

You might be wondering then, "when should I use inheritance?" It
depends on your problem at hand, but this is a decent list of when inheritance
makes more sense than composition:

你可能会问， “啥时候用继承？” 这得看你你手边的问题， 这有一份关于何时用继承比组合更合适的清单。

1. Your inheritance represents an "is-a" relationship and not a "has-a"
relationship (Animal->Human vs. User->UserDetails).
2. You can reuse code from the base classes (Humans can move like all animals).
3. You want to make global changes to derived classes by changing a base class.
(Change the caloric expenditure of all animals when they move).


1. 继承呈现了一种 "is-a" 的关系而不是 "has-a" 的关系 (动物 -> 人。 用户 -> 用户详情)。
2. 你可以在基类中重用代码 (人可以像所有动物一样运动)。
3. 你要通过基类来派生类从而产生一个全局改变。 (改变所有动物在运动时的热量消耗)

**Bad:**
```javascript
class Employee {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // ...
}

// Bad because Employees "have" tax data. EmployeeTaxData is not a type of Employee
class EmployeeTaxData extends Employee {
  constructor(ssn, salary) {
    super();
    this.ssn = ssn;
    this.salary = salary;
  }

  // ...
}
```

**Good**:
```javascript
class EmployeeTaxData {
  constructor(ssn, salary) {
    this.ssn = ssn;
    this.salary = salary;
  }

  // ...
}

class Employee {
  constructor(name, email) {
    this.name = name;
    this.email = email;

  }

  setTaxData(ssn, salary) {
    this.taxData = new EmployeeTaxData(ssn, salary);
  }
  // ...
}
```
**[⬆ back to top](#table-of-contents)**

## **Testing**
Testing is more important than shipping. If you have no tests or an
inadequate amount, then every time you ship code you won't be sure that you
didn't break anything. Deciding on what constitutes an adequate amount is up
to your team, but having 100% coverage (all statements and branches) is how
you achieve very high confidence and developer peace of mind. This means that
in addition to having a great testing framework, you also need to use a
[good coverage tool](http://gotwarlost.github.io/istanbul/).

测试比运行更重要。如果你不测试或存在不足， 你都不一定知道你干了什么。测试取决于团队的大小， 达到 100% 的测试率会使你更有信心， 更安心。 这意味着得额外搞一个好的测试框架， 当然还有测试工具 [good coverage tool](http://gotwarlost.github.io/istanbul/)。

There's no excuse to not write tests. There's [plenty of good JS test frameworks](http://jstherightway.org/#testing-tools), so find one that your team prefers.
When you find one that works for your team, then aim to always write tests
for every new feature/module you introduce. If your preferred method is
Test Driven Development (TDD), that is great, but the main point is to just
make sure you are reaching your coverage goals before launching any feature,
or refactoring an existing one.

没有借口不写个测试。 这有这么多好的测试框架 [plenty of good JS test frameworks](http://jstherightway.org/#testing-tools) ， 去找一个你们喜欢的。 找好后，在每个新特性或模块后好好测试一下。 如果你更喜欢测试驱动开发 (TDD) ，非常好， 最好在每个特性发布或旧特性重构前确定你的测试覆盖率。

### Single concept per test
### 单个测试
**Bad:**
```javascript
const assert = require('assert');

describe('MakeMomentJSGreatAgain', () => {
  it('handles date boundaries', () => {
    let date;

    date = new MakeMomentJSGreatAgain('1/1/2015');
    date.addDays(30);
    date.shouldEqual('1/31/2015');

    date = new MakeMomentJSGreatAgain('2/1/2016');
    date.addDays(28);
    assert.equal('02/29/2016', date);

    date = new MakeMomentJSGreatAgain('2/1/2015');
    date.addDays(28);
    assert.equal('03/01/2015', date);
  });
});
```

**Good**:
```javascript
const assert = require('assert');

describe('MakeMomentJSGreatAgain', () => {
  it('handles 30-day months', () => {
    const date = new MakeMomentJSGreatAgain('1/1/2015');
    date.addDays(30);
    date.shouldEqual('1/31/2015');
  });

  it('handles leap year', () => {
    const date = new MakeMomentJSGreatAgain('2/1/2016');
    date.addDays(28);
    assert.equal('02/29/2016', date);
  });

  it('handles non-leap year', () => {
    const date = new MakeMomentJSGreatAgain('2/1/2015');
    date.addDays(28);
    assert.equal('03/01/2015', date);
  });
});
```
**[⬆ back to top](#table-of-contents)**

## **Concurrency**
### Use Promises, not callbacks
### 用承诺别用回掉
Callbacks aren't clean, and they cause excessive amounts of nesting. With ES2015/ES6,
Promises are a built-in global type. Use them!

回掉不简洁， 它导致了过多的嵌套。 在 ES2015/ES6 中， 承诺是内置的全局类型。 赶快用起来！

**Bad:**
```javascript
require('request').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', (requestErr, response) => {
  if (requestErr) {
    console.error(requestErr);
  } else {
    require('fs').writeFile('article.html', response.body, (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
      } else {
        console.log('File written');
      }
    });
  }
});

```

**Good**:
```javascript
require('request-promise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then((response) => {
    return require('fs-promise').writeFile('article.html', response);
  })
  .then(() => {
    console.log('File written');
  })
  .catch((err) => {
    console.error(err);
  });

```
**[⬆ back to top](#table-of-contents)**

### Async/Await are even cleaner than Promises
### Async/Await 比承诺还好用
Promises are a very clean alternative to callbacks, but ES2017/ES8 brings async and await
which offer an even cleaner solution. All you need is a function that is prefixed
in an `async` keyword, and then you can write your logic imperatively without
a `then` chain of functions. Use this if you can take advantage of ES2017/ES8 features
today!

承诺是对回掉非常简洁的替代， 但是 ES2017/ES8 为我们带来了更简洁的 async 和 await 。只需要前置 `async`  关键字就能命令式编程而不用 `then` 来链接函数。 如果能用 ES2017/ES8 赶快用起来吧！

**Bad:**
```javascript
require('request-promise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then((response) => {
    return require('fs-promise').writeFile('article.html', response);
  })
  .then(() => {
    console.log('File written');
  })
  .catch((err) => {
    console.error(err);
  });

```

**Good**:
```javascript
async function getCleanCodeArticle() {
  try {
    const request = await require('request-promise');
    const response = await request.get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
    const fileHandle = await require('fs-promise');

    await fileHandle.writeFile('article.html', response);
    console.log('File written');
  } catch(err) {
    console.error(err);
  }
}
```
**[⬆ back to top](#table-of-contents)**


## **Error Handling**
Thrown errors are a good thing! They mean the runtime has successfully
identified when something in your program has gone wrong and it's letting
you know by stopping function execution on the current stack, killing the
process (in Node), and notifying you in the console with a stack trace.

抛出错误是个好事哦！ 这意味着在运行时已经确定有问题出现了， 也让你知道该在当前栈中停下函数或杀掉程序， 注意你的控制台输出。

### Don't ignore caught errors
### 别忽略抓到的错误
Doing nothing with a caught error doesn't give you the ability to ever fix
or react to said error. Logging the error to the console (`console.log`)
isn't much better as often times it can get lost in a sea of things printed
to the console. If you wrap any bit of code in a `try/catch` it means you
think an error may occur there and therefore you should have a plan,
or create a code path, for when it occurs.

忽略找到的错误不会让你修复这个错误。 在控制台记录错误不是很好， 大多数情况下将会在海一样的输出下埋没。 把代码放在 `try/catch` 中只是说明你觉得这会出错， 因此最好有个计划， 或者出错时建个代码路径。

**Bad:**
```javascript
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

**Good:**
```javascript
try {
  functionThatMightThrow();
} catch (error) {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
}
```

### Don't ignore rejected promises
### 别忘了 rejected 承诺
For the same reason you shouldn't ignore caught errors
from `try/catch`.

就像你不应该忽略在 `try/catch` 中找到的错误一样。

**Bad:**
```javascript
getdata()
.then((data) => {
  functionThatMightThrow(data);
})
.catch((error) => {
  console.log(error);
});
```

**Good:**
```javascript
getdata()
.then((data) => {
  functionThatMightThrow(data);
})
.catch((error) => {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
});
```

**[⬆ back to top](#table-of-contents)**


## **Formatting**
Formatting is subjective. Like many rules herein, there is no hard and fast
rule that you must follow. The main point is DO NOT ARGUE over formatting.
There are [tons of tools](http://standardjs.com/rules.html) to automate this.
Use one! It's a waste of time and money for engineers to argue over formatting.

格式是很主观的。 就像这儿的很多规则， 这儿没有你必须遵守的规则。 别在格式上费事才是正事。 这儿有一堆工具搞这个 [tons of tools](http://standardjs.com/rules.html) 。 选一个！ 在格式上争论真是浪费年华。

For things that don't fall under the purview of automatic formatting
(indentation, tabs vs. spaces, double vs. single quotes, etc.) look here
for some guidance.

对于不属于自动化格式的事 (缩进， tabs 还是 spaces , 双引号 还是 单引号， 等等) 这儿有个指南。

### Use consistent capitalization
### 使用一致的大写
JavaScript is untyped, so capitalization tells you a lot about your variables,
functions, etc. These rules are subjective, so your team can choose whatever
they want. The point is, no matter what you all choose, just be consistent.

JavaScript 是无类型的， 所以大写可以告诉你大量关于变量， 函数，等等的信息， 这些规则很主观， 随便选。 无论你选那种， 坚持使用就行。

**Bad:**
```javascript
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restore_database() {}

class animal {}
class Alpaca {}
```

**Good**:
```javascript
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const artists = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restoreDatabase() {}

class Animal {}
class Alpaca {}
```
**[⬆ back to top](#table-of-contents)**


### Function callers and callees should be close
### callers 和  callees 应该关闭
If a function calls another, keep those functions vertically close in the source
file. Ideally, keep the caller right above the callee. We tend to read code from
top-to-bottom, like a newspaper. Because of this, make your code read that way.

如果一个函数调用了另一个函数， 让这些函数在文件中挨得近点。 理想情况下， 调用函数先于被调用函数。 我们一般从上往下读代码， 就像读报纸一样。 由此， 你的代码应该那么写。

**Bad:**
```javascript
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers');
  }

  lookupMananger() {
    return db.lookup(this.employee, 'manager');
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(user);
review.perfReview();
```

**Good**:
```javascript
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers');
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  lookupMananger() {
    return db.lookup(this.employee, 'manager');
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
```

**[⬆ back to top](#table-of-contents)**

## **Comments**
### Only comment things that have business logic complexity.
### 只标注复杂重要的代码
Comments are an apology, not a requirement. Good code *mostly* documents itself.

你应该为写注释而道歉， 这不是请求。 好代码大多是自说明的。

**Bad:**
```javascript
function hashIt(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = ((hash << 5) - hash) + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

**Good**:
```javascript

function hashIt(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}

```
**[⬆ back to top](#table-of-contents)**

### Don't leave commented out code in your codebase
### 别留下以前注释过的代码
Version control exists for a reason. Leave old code in your history.

版本控制就是搞这个的。 把你的旧代码留进历史中。

**Bad:**
```javascript
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```

**Good**:
```javascript
doStuff();
```
**[⬆ back to top](#table-of-contents)**

### Don't have journal comments
### 别搞日志注释
Remember, use version control! There's no need for dead code, commented code,
and especially journal comments. Use `git log` to get history!

记住， 使用版本控制！ 这里不需要无用的代码， 也不需要注释， 特别是日志注释。 用 `git log` 查看历史！

**Bad:**
```javascript
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Removed type-checking (LI)
 * 2015-03-14: Added combine with type-checking (JR)
 */
function combine(a, b) {
  return a + b;
}
```

**Good**:
```javascript
function combine(a, b) {
  return a + b;
}
```
**[⬆ back to top](#table-of-contents)**

### Avoid positional markers
### 避免位置标注
They usually just add noise. Let the functions and variable names along with the
proper indentation and formatting give the visual structure to your code.

这通常很恼人。 让函数和变量名拥有合适的缩进， 格式化将让你的代码拥有清晰的结构。

**Bad:**
```javascript
////////////////////////////////////////////////////////////////////////////////
// Scope Model Instantiation
////////////////////////////////////////////////////////////////////////////////
$scope.model = {
  menu: 'foo',
  nav: 'bar'
};

////////////////////////////////////////////////////////////////////////////////
// Action setup
////////////////////////////////////////////////////////////////////////////////
const actions = function() {
  // ...
};
```

**Good**:
```javascript
$scope.model = {
  menu: 'foo',
  nav: 'bar'
};

const actions = function() {
  // ...
};
```
**[⬆ back to top](#table-of-contents)**
