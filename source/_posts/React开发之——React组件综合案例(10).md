---
title: React开发之——React组件综合案例(10)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 51ad1668
date: 2023-04-17 23:28:22
---
## 一 概述

*  渲染评论列表
*  渲染暂无评论
*  获取评论信息
*  发表评论
*  边界情况处理

<!--more-->

## 二  需求分析

案例图示

![][1]

案例分析：

* 渲染评论列表（列表渲染）
* 没有评论数据时渲染：暂无评论（条件渲染）
* 获取评论信息，包括评论人和评论内容（受控组件）
* 发表评论，更新评论列表（setState()）

## 三 渲染评论列表

### 3.1 过程分析

*  在 state 中初始化评论列表数据
* 使用数组的map方法遍历state中的列表数据
*  给每个被遍历的li元素添加key属性

### 3.2 示例代码

1-评论数据

```
state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发！！！' },
      { id: 2, name: 'rose', content: '板凳~' },
      { id: 3, name: 'tom', content: '楼主好人' }
    ]
  }
```

2-评论列表

```
<ul>
    {this.state.comments.map((item) => (
        <li key={item.id}>
             <h3>评论人：{item.name}</h3>
             <p>评论内容：{item.content}</p>
         </li>
      ))}
</ul>
```

## 四 渲染暂无评论

### 4.1 过程描述

* 判断列表数据的长度是否为0
* 如果为0，则渲染暂无评论

### 4.2 示例代码

```
renderList() {
    return this.state.comments.length === 0 ? (
      <div className="no-comment">暂无评论，快去评论吧~</div>
    ) : (
      <ul>
        {this.state.comments.map((item) => (
          <li key={item.id}>
            <h3>评论人：{item.name}</h3>
            <p>评论内容：{item.content}</p>
          </li>
        ))}
      </ul>
    )
  }
```

## 五 获取评论信息

### 5.1 过程描述

 使用受控组件方式处理表单元素

### 5.2 示例代码

1-定义用户名和评论内容

```
state = {
    userName: '',
    userContent: ''
  }
```

2-表单内容赋值

```
render() {
    const { userName, userContent } = this.state
    return (
      <div className="app">
        <div>
          <input className="user" type="text" placeholder="请输入评论人" value={userName} name="userName" onChange={this.handleForm} />
          <br />
          <textarea className="content" cols="30" rows="10" placeholder="请输入评论内容" value={userContent} name="userContent" onChange={this.handleForm} />
          <br />
          <button>发表评论</button>
        </div>
        {this.renderList()}
      </div>
    )
  }
```

3-处理表单内容变化

```
handleForm = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
```

### 5.3 效果图

![][2]

## 六 发表评论

### 6.1 过程描述

*  给按钮绑定单击事件
*  在事件处理程序中，通过state获取评论信息
*  将评论信息添加到state中，并调用 setState() 方法更新state

### 6.2 示例代码

1-添加评论按钮

```
<button onClick={this.addComment}>发表评论</button>
```

2-处理按钮方法

```
addComment = (e) => {
    const { comments,userName, userContent } = this.state
    console.log(userName, userContent)
    const newComments = [
      {
        id: Math.random(),
        name: userName,
        content: userContent
      },
      ...comments
    ]
    this.setState({
      comments:newComments
    })
  }
```

### 6.3 效果图

![][3]

## 七 边界情况处理

### 7.1 过程描述

* 边界情况：清空文本框
* 边界情况：非空判断

### 7.2 示例代码

1-非空判断

```
 if (userName.trim() === '' || userContent.trim() === '') {
      alert('请输入评论人和评论内容')
      return
    }
```

2-清空评论人和评论内容

```
this.setState({
      comments: newComments,
      userName: '',
      userContent: ''
    })
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img10-comment-fenxi.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img10-comment-form.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img10-comment-add.gif