---
title: JavaWeb开发思维导图之——SpringMVC之表单校验(121)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 45faa3c1
date: 2025-05-05 08:54:24
---
## 一 概述

* 表单校验分类
* 表单校验框架(JSR)
* 注解说明
* 实际的校验规则
* 校验器<!--more-->
* 嵌套校验
* 分组校验

## 二 内容详情

### 2.1 表单校验分类

```
1-校验位置
 -客户端校验
 -服务端校验
2-校验内容与对应方式
 -格式校验
  -客户端：使用jsp技术，利用正则表达式校验
  -服务端: 使用校验框架
 -逻辑校验 
  -客户端: 使用ajax发送要校验的数据，在服务端完成逻辑校验，返回校验结构
  -服务器: 接收到完整的请求后，在执行业务操作前，完成逻辑校验
```

### 2.2 表单校验框架(JSR)

```
1-说明
 -JSR(Java Specification Requests): Java规范提案
 -JCP(Java Community Process): Java社区
 -Hibernate框架中包含一套独立的校验框架hibernate-validator

2-JSR规范列表
 -企业应用技术
  -Bean Validation 1.0 (JSR 303)
  -JavaMail 1.4(JSR 919)
  -其他
 -Web应用技术
  -Java Servlet 3.0 (JSR 315)
  -JavaServer Faces 2.0 (JSR 314)
  -其他
3-模块化(JSR 294)
 -swing应用框架(SR 296)
 -其他
4-管理与安全技术  
5-JavaSE中与JavaEE有关的规范
```

### 2.3 注解说明

```
1-开启校验
 -名称: @Valid、@Validated
 -类型: 形参注解
 -位置: 处理器类中的实体类类型的方法形参前方
 -作用: 设定对当前实体类类型参数进行校验
 -示例: public String addEmployee(@Valid Employee employee){}

2-设定校验规则
 -名称: @NotNull
 -类型: 属性注解等
 -位置: 实体类属性上方
 -作用: 设定对当前属性校验规则
 -示例: @NotNull(message="姓名不能为空")
```

### 2.4 实际的校验规则

```
1-同一个字段有多个约束条件
2-引用类型字段如何校验
3-根据业务不同需要调整是否参与校验
```

### 2.5 校验器

```
1-同一个属性可以添加多个校验器
 -NotNull(message="请输入您的年龄")
 -@Max(value=60,message="年龄最大值不允许超过60岁")
 -@Min(value=18,message="年龄最小值不允许低于18岁")

2-3种判定空校验器的区别
 -@NotNull
 -@NotEmpty
 -@NotBlank
```

### 2.6 嵌套校验

```
1-名称: @Valid
2-类型: 属性注解等
3-位置: 实体类中的引用类型属性上方
4-作用: 设定对当前类型属性中的属性开启校验
5-示例: public class Employee{ @Valid private Address address;}
```

### 2.7 分组校验

```
1-同一个模块根据执行业务不同，校验属性不同
 -新增用户
 -修改用户
 
2-校验分组
 1-说明: 对不同种类的属性进行分组，在校验时可以指定参与校验的字段所属的组类别
 2-步骤
  -定义组：public interface GroupA{}
  -为属性设置所属组，可以设置多个: @NotEmpty(message="不能为空",groups={GroupA.class})
  -开启校验: public String addEmployee(@Validated({GroupA.class}))
```

## 三 思维导图

![javaweb-xmind-springmvc-level2-table-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level2-table-8.png