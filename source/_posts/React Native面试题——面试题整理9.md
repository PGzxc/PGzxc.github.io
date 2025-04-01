---
title: React Native面试题——面试题整理9
categories:
  - 面试相关
  - React Native面试题
tags:
  - React Native面试题
abbrlink: 82bc261f
date: 2024-03-20 15:41:51
---
## 一 面试题汇总

1. React Native相对于原生的ios和Android有哪些优势？
2. React Native的优点和缺点在哪里？
3. 父传子，子传父数据传递方式？
4. 如何实现底部TabBar的高度不一样呢？（类似新浪微博底部加号）
5. 你的项目有没有使用redux或者是mobx来管理数据呢？
6. 请您简单介绍一下redux？dva? mobx？ <!--more-->
7. 当你调用setState的时候，发生了什么事？
8. React中Element 和 Component 有何区别？
9. shouldComponentUpdate 应该做什么
10. 描述事件在React中的处理方式
11. reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？
12. 面试中的一道题
13. XSS与CSRF介绍
14. 在使用redux过程中，如何防止定义的action-type的常量重复？
15. React Native 中 JSX 与 TSX 的区别与应用

## 二 面试题解答(仅供参考)

## 2.1 React Native相对于原生的ios和Android有哪些优势？

```
React Native 相对于原生的 iOS 和 Android 具有以下优势：

1. 跨平台开发：
React Native 允许开发人员使用 JavaScript 构建单个代码库，以跨平台的方式开发应用程序，
这意味着可以使用相同的代码库在 iOS 和 Android 上开发应用程序，从而节省时间和资源。

2. 快速开发：
React Native 提供了丰富的 UI 组件库和开发工具，可以快速构建用户界面。
同时，使用热加载功能，可以即时预览代码更改的效果，加速开发过程。

3. 性能优化：
React Native 借助底层原生组件实现了高性能，尤其是在处理图形和动画方面。
此外，React Native 支持原生代码的集成，可以通过编写原生模块来实现更高的性能要求。

4. 社区支持：
React Native 拥有庞大而活跃的开发者社区，提供了大量的文档、教程和第三方库，方便开发人员解决问题和获取支持。

5. 热更新：
React Native 支持热更新功能，允许在不重新发布应用程序的情况下更新应用程序的部分内容，
从而可以更快地修复 bug 和推出新功能。

6. 简化学习曲线：
相对于学习两种完全不同的原生开发技术，React Native 提供了一种更为统一的开发体验，
使得前端开发人员可以更快地适应移动应用程序开发。

总的来说，React Native 在跨平台开发、快速开发、性能优化和社区支持等方面具有明显优势，
尤其适合中小型团队或需要快速迭代的项目。
然而，在某些特定场景下，如对性能要求非常高或需要直接访问硬件功能的应用程序，原生开发仍然是更好的选择。
```

### 2.2 React Native的优点和缺点在哪里？

1-优点：

```
1.跨平台开发：一套代码同时支持 iOS 和 Android，节省时间和成本。
2.热重载：修改代码后无需重启应用，开发效率更高。
3.接近原生性能：使用原生组件渲染，体验接近原生应用。
4.强大社区支持：丰富的第三方库和活跃的社区，问题解决更快捷。
5.代码复用率高：逻辑和 UI 组件可复用，减少重复开发工作。
```

2-缺点：

```
1.性能略逊于原生：在复杂动画、大量计算等场景下，性能可能不如原生开发。
2.原生依赖：部分功能仍需编写原生代码，增加开发复杂度。
3.版本兼容性问题：RN 版本更新较快，可能导致第三方库或原生代码不兼容。
4.调试困难：错误信息有时不直观，排查问题可能比较费时。
```

### 2.3 父传子，子传父数据传递方式？

1-父传子：通过 props 传递数据或方法给子组件。

```
// 父组件
const Parent = () => (
  <Child message="Hello from Parent" />
);

// 子组件
const Child = ({ message }) => (
  <Text>{message}</Text>
);
```

2-子传父：子组件调用父组件传递下来的回调函数，把数据传回去

```
// 父组件
const Parent = () => {
  const handleDataFromChild = (data) => alert(data);

  return <Child sendData={handleDataFromChild} />;
};

// 子组件
const Child = ({ sendData }) => (
  <Button title="Send Data" onPress={() => sendData("Hello from Child")} />
);
```

### 2.4 如何实现底部TabBar的高度不一样呢？（类似新浪微博底部加号）

```
实现底部 TabBar 高度不一样，特别是像新浪微博那样中间按钮突出，主要有几种方法：

1.自定义TabBar组件: 
这是最灵活的方法。 
你可以创建一个自定义的 TabBar 组件，而不是使用 React Navigation 或其他库提供的默认 TabBar。 
在这个自定义组件中，你可以使用View和StyleSheet精确控制每个Tab按钮的大小和位置，从而实现中间按钮突出，高度不同的效果。 
这需要你对布局和样式有较好的掌握。

2.使用第三方库: 
一些第三方库提供了自定义 TabBar 的能力，可能已经内置了类似新浪微博底部导航栏的功能，
或者提供了足够的自定义选项来实现这个效果。 
你需要调研一些 React Native 的导航库，看看它们是否支持这种自定义。

3.利用flex布局和absolute定位: 
你可以使用 flex 布局来安排 Tab 按钮，然后使用 absolute 定位来放置中间的突出按钮，精确控制它的位置和大小。
这需要对 flex 布局和 absolute 定位有深入的理解。

4.使用React Native的LayoutAnimation: 
如果需要中间按钮的出现或消失有动画效果，可以使用LayoutAnimation来实现动画过渡。

选择哪种方法取决于你的项目复杂度和对自定义程度的要求。 
如果只是简单的调整高度，方法3可能就足够了；
如果需要更复杂的样式和动画，自定义组件是更好的选择。 记住要考虑整体UI的一致性和用户体验。
```

### 2.5 你的项目有没有使用redux或者是mobx来管理数据呢？

```
用过 Redux 和 MobX 来管理数据，根据项目需求选择合适的状态管理工具：

1.Redux:
-适合管理复杂的全局状态，比如用户信息、权限、购物车等。
-用 actions 触发状态变更，reducers 处理逻辑，store 统一管理数据，方便追踪状态变化

2.MobX：
-更灵活、简洁，适合中小型项目或者状态逻辑相对简单的场景。
-通过可观察的状态（observable）、动作（actions）、计算属性（computed）等机制，现响应式的数据管理。
```

### 2.6 请您简单介绍一下redux？dva? mobx？

1-Redux

```
Redux 是一个 可预测的状态管理 库，适用于大型应用的全局状态管理。核心概念包括：

-Store：全局状态存储中心。
-Action：描述状态变化的行为
-Reducer：根据 Action 更新 Store。
-Dispatch：触发 Action，进而更新 Store。

适用于复杂应用，但 代码冗长，异步处理复杂（需用 redux-thunk / redux-saga）
```

2-DVA（基于 Redux 的封装）

```
DVA 是 阿里基于 Redux 和 Redux-saga 封装的状态管理框架，简化了 Redux 复杂的配置，特点：

-内置 Redux、Redux-Saga，简化数据流。
-基于 Model 组织代码，每个 Model 包含 state、reducers、effects 等
-支持异步数据流，更加直观。

适用于 React / React Native 项目，简化 Redux 代码量。
```

3-MobX

```
MobX 是 响应式、轻量级的状态管理库，相比 Redux 更加简单、直观，特点：

-observable（可观察数据） 自动追踪状态变化。
-computed（计算属性） 自动根据状态派生新数据。
-action（动作） 触发状态变更。
-更少的样板代码，使用更直观。

适用于 小中型项目或需要高响应式的数据管理。
```

### 2.7 当你调用setState的时候，发生了什么事？

```
在 React Native 中，当你调用 setState 时，会触发以下过程：

1.更新状态：setState 将传入的状态变更合并到组件的当前状态。
2.触发重新渲染：React 会对比更新前后的状态（浅合并），决定是否需要重新渲染组件。
3.调用render方法：如果状态变化影响 UI，React 会重新调用render方法生成新的虚拟 DOM。
4.更新UI：React 比较新旧虚拟 DOM（Diff 算法），只更新必要的部分，优化性能
5.异步执行：setState 是异步操作，状态更新后不会立刻生效，
若需在状态更新后执行操作，可以用 setState 的回调函数：

总结：setState 触发状态更新、重新渲染、优化更新，且是异步操作
```

### 2.8 React中Element 和 Component 有何区别？

```undefined
在 React 中，Element 和 Component是两个不同的概念：
```

1-Element（元素）

```
-是 React 应用的最小单元，描述 UI 的结构。
-本质是一个普通的 JavaScript 对象，代表组件的“实例”或“快照”。
-通常由 JSX 创建，像这样：const element = <Text>Hello World</Text>;
```

2-Component（组件）：

```
-是可复用的 UI 单位，封装了逻辑和界面。
-可以是函数组件或类组件，返回 React 元素来描述 UI
3-示例
function Greeting() {
  return <Text>Hello World</Text>;
}
```

3-总结

```
Element 是 UI 的“描述”，不可改变，创建后不会再更新
Component 是逻辑单元，接受 props，返回 Element 来渲染界面
```

### 2.9 shouldComponentUpdate 应该做什么

```
在 React Native 中，shouldComponentUpdate 是类组件中的生命周期方法，用来控制组件是否需要重新渲染。

1.作用：
-默认情况下，父组件更新时，子组件也会跟着重新渲染
-通过 shouldComponentUpdate 可以优化性能，避免不必要的渲染
-当组件的 props 或 state 变化时，它会自动被调用，返回 true 则重新渲染，返回 false 则跳过渲染。

2.示例：
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 只有当 count 改变时才重新渲染
    return nextProps.count !== this.props.count;
  }

  render() {
    return <Text>{this.props.count}</Text>;
  }
}

3.注意：
-在函数组件里，可以用 React.memo() 来实现类似的优化。
-如果逻辑复杂，推荐使用 PureComponent 或 React.memo 来自动优化。
```


### 2.10 描述事件在React中的处理方式

```
在 React 中，事件的处理方式与传统的 DOM 事件略有不同，
React 封装了原生事件，并提供了一些优化和跨平台的支持。具体来说，React 事件处理具有以下特点：

1.使用虚拟 DOM 事件系统
React 使用虚拟 DOM 来优化事件处理，而不直接操作原生 DOM。
因此，React 为事件提供了一个事件池（Event Pooling），
当事件处理完成后，React 会回收事件对象，避免内存泄漏。

2.使用驼峰式命名法:React 使用驼峰式命名来处理事件名称，例如：
-原生 DOM 事件是 onclick，而 React 使用 onClick。
-原生事件 onkeydown 在 React 中写作 onKeyDown。

3.事件处理程序是函数
React 的事件处理程序和传统 DOM 一样是函数。你可以在 JSX 中直接传入函数来处理事件，例如：
class MyComponent extends React.Component {
  handleClick = () => {
    alert('Button clicked');
  };

  render() {
    return <Button onClick={this.handleClick}>Click Me</Button>;
  }
}

4.事件绑定方式
-在 React 中，事件处理函数默认是 自动绑定 的，不需要显式地绑定 this，如果你是用箭头函数定义的事件处理函数。
-如果使用常规函数定义，this 需要通过 .bind() 来显式绑定

// 使用箭头函数，无需显式绑定
handleClick = () => {};

// 普通方法需要显式绑定
handleClick() {
  // this 需要绑定
}

5.事件对象
React 会将原生事件对象包装成一个合成事件（SyntheticEvent）。
这些合成事件跨浏览器一致，提供了与原生事件类似的 API。

handleClick = (event) => {
  // event 是合成事件对象，类似于原生的 event 对象
  console.log(event.type); // 'click'
};

6.事件的性能优化
React 的事件是通过事件委托机制处理的，所有的事件处理程序都挂载到根 DOM 元素上，
然后通过事件冒泡传播到子组件。
这样可以避免为每个 DOM 元素单独绑定事件，提升性能。

总结
-事件处理函数通常是类方法或箭头函数。
-事件名称采用驼峰命名法（例如：onClick，onKeyDown）。
-React 使用合成事件系统来优化性能和兼容性。
-可以通过 Event Pooling 机制优化内存管理。
```

### 2.11 reactJS的props.children.map函数来遍历会收到异常提示，为什么？应该如何遍历？

```css
在 React 中，props.children 是一个特殊的属性，包含组件的子元素。
如果子元素是多个 React 元素或组件，props.children 将是一个 对象 或 数组。
但直接调用 map() 遍历时，可能会收到异常提示，原因在于：

1.问题原因：
-props.children 的类型问题：props.children 的值并不总是一个数组或可以直接使用 map 的结构，
可能是 string、number、boolean 或 null，这些类型无法直接使用 map。
-React 会将单个子元素包装成一个普通的对象，而不是数组，因此直接使用 map 会抛出异常。

-2.解决方法：你可以通过以下方式处理和遍历 props.children：
-检查 props.children 类型：你可以先判断 props.children 是否是数组，或者是需要进行遍历的对象。

import React from 'react';
const MyComponent = (props) => {
  // 确保 props.children 是一个数组
  const childrenArray = React.Children.toArray(props.children);

  return (
    <div>
      {childrenArray.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};

export default MyComponent;

-React.Children.toArray：
React.Children.toArray() 会确保无论子元素是单个元素还是多个元素，都会被转换为一个数组。
因此，使用 map 遍历时不会出错。


3-总结
直接对 props.children 使用 map 时，如果 children 不是数组，会抛出异常。
使用 React.Children.toArray(props.children) 来确保 props.children 为数组后再调用 map 遍历
```

### 2.12 面试中的一道题:

问题

```
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
问上述代码中 4 次 console.log 打印出来的 val 分别是多少？
```

答案

```
第 1 次 console.log 输出：0
第 2 次 console.log 输出：0
第 3 次 console.log 输出：0
第 4 次 console.log 输出：1

所以，四次 console.log 打印的 val 分别是：0, 0, 0, 1。
```

### 2.13 XSS与CSRF介绍

1.XSS（Cross-Site Scripting）跨站脚本攻击

```
XSS 是一种安全漏洞，攻击者通过将恶意脚本注入到网页中，
当其他用户浏览该页面时，恶意脚本会在受害者的浏览器中执行，进而窃取用户信息或执行未授权的操作。

1.XSS 类型：
-存储型 XSS：恶意脚本被存储在服务器上，例如评论、文章内容等，其他用户访问时会执行该脚本。
-反射型 XSS：恶意脚本通过 URL、表单等传递给服务器，服务器将其直接返回给用户，脚本在用户浏览器中执行。
-OM-based XSS：攻击脚本通过操作页面的 DOM 结构引发攻击。

2.防御方法：
-对用户输入进行严格的过滤和转义。
-使用安全的模板引擎，避免直接在网页中插入未经处理的用户输入。
-设置 HTTP 安全头部，如 Content-Security-Policy (CSP)。
-使用框架的自动防护功能，如 React 会自动转义插入的 HTML。
```

2.CSRF（Cross-Site Request Forgery）跨站请求伪造

```
CSRF 是一种通过伪造用户的请求来执行恶意操作的攻击。
攻击者利用用户已登录的身份，在受害者不知情的情况下发起请求，
从而执行一些不应有的操作，如转账、修改用户信息等。

1.CSRF 攻击过程：
-用户已登录并有有效的身份验证信息（如 cookie）。
-攻击者通过诱导用户点击恶意链接、访问恶意网站等方式，触发用户的浏览器向目标网站发送请求。
-由于浏览器会自动携带用户的认证信息（如 cookie），目标网站无法区分请求是合法用户发出的还是攻击者伪造的。

2.防御方法：
-使用 token 验证：通过在每个请求中加入随机生成的 CSRF token，服务器验证该 token 来确保请求来自合法用户
-使用SameSite Cookie属性：设置SameSite 属性为Strict或Lax，限制浏览器跨站请求时不会自动发送cookie。
-验证请求来源：检查请求的来源（如 Referer 头）来确认请求是否来自合法页面
```

3.总结

```
XSS 攻击通过在页面中注入恶意脚本，执行未授权操作，通常窃取用户信息。
CSRF 攻击通过伪造用户的请求，执行用户未授权的操作，通常是在用户已登录的情况下发起。

这两者都涉及到 Web 安全问题，但攻击方式不同，防御方法也有区别。
```

### 2.14 在使用redux过程中，如何防止定义的action-type的常量重复？

```
在使用 Redux 的过程中，为了防止定义的 action-type 常量重复，可以采用以下几种方式：

1.集中管理：将常量放在单独的文件中集中管理，避免重复。
2.命名空间：通过模块名前缀来区分不同模块的常量。
3.Redux Toolkit：使用 createSlice 自动生成 action-type，减少手动操作。
4.TypeScript 枚举：使用枚举来组织常量，避免重复。

这些方式能有效地防止 action-type 常量的重复定义。
```

### 2.15 React Native 中 JSX 与 TSX 的区别与应用

```
在 React Native 开发中，JSX 和 TSX 是两种用于编写 UI 组件的语法，
它们的主要区别在于 是否使用 TypeScript。

1.JSX（JavaScript XML）
1.1 特征
-JSX 是 JavaScript 的语法扩展，用于描述 React 组件的 UI 结构。
-React Native 直接支持 JSX，开发者可以像写 HTML 一样编写组件结构。
-没有类型检查，变量和函数的类型不受约束。

1.2 JSX 示例（使用 JavaScript 编写组件）
import React from 'react';
import { Text, View } from 'react-native';

const MyComponent = () => {
  return (
    <View>
      <Text>Hello, JSX!</Text>
    </View>
  );
};
export default MyComponent;

2. TSX（TypeScript XML）
2.1 特征
-TSX 是 TypeScript 版的 JSX，支持类型检查和更好的代码提示。
-适用于 大中型项目，可以减少运行时错误，提高代码可维护性。
-强类型检查：使用 TypeScript 定义变量、函数和组件的类型，增强安全性。

2.2 TSX 示例（使用 TypeScript 编写组件）

import React from 'react';
import { Text, View } from 'react-native';
type Props = {
  message: string;
};

const MyComponent: React.FC<Props> = ({ message }) => {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};
export default MyComponent;
```

3-JSX 与 TSX 的核心区别

|   特性   |     JSX (JavaScript)     |       TSX (TypeScript)       |
| :------: | :----------------------: | :--------------------------: |
| 语法扩展 |        ✅ 支持 JSX        |          ✅ 支持 TSX          |
| 类型检查 |       ❌ 无类型检查       |         ✅ 强类型检查         |
| 开发体验 | 🚀 适合小型项目，语法简洁 | 🔧 适合大型项目，减少类型错误 |
| 代码提示 |     ⚠️ 受限的代码补全     |       ✅ 更好的代码补全       |
| 运行安全 | 🛑 运行时可能出现类型错误 |    ✅ 编译阶段即可发现错误    |

4-何时选择 JSX 还是 TSX？

|        场景        | 推荐语法 |
| :----------------: | :------: |
| 快速开发、个人项目 |   JSX    |
| 复杂应用、大型项目 |   TSX    |
| 需要严格的类型检查 |   TSX    |
|  组件可复用性较高  |   TSX    |

```
如果你的项目是 小型或实验性质，可以使用 JSX 来快速开发；
如果是 企业级、多人协作的项目，推荐使用 TSX，提升代码的健壮性和可维护性。
```

## 三 参考

* [简书-React、React Native面试题](https://www.jianshu.com/p/fd4831435b27)


