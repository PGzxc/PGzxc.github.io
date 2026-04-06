---
title: CodeBuddy开发之——项目实战(7)
categories:
  - AI
  - AI开发
  - AI开发工具
  - CodeBuddy
tags:
  - CodeBuddy
abbrlink: 2c09e3bd
date: 2026-04-06 10:28:05
---
## 一 概述

```
本文介绍：
 - 项目需求定义
 - 实战步骤
```

<!--more-->

## 二 项目需求定义

### 2.1 本篇目标

```
用 CodeBuddy 完整生成一个 可运行的后端项目

包含：
- Spring Boot 项目
- 用户模块
- JWT 登录认证
- CRUD 接口
- 基础测试
```

### 2.2 项目需求定义—需求说明(标准 Prompt)

```
创建一个用户管理系统（Spring Boot）：

功能：
1. 用户注册
2. 用户登录（JWT）
3. 用户信息查询
4. 用户列表分页

技术要求：
- Spring Boot
- MySQL
- MyBatis / JPA
- JWT 鉴权
- RESTful API
```

## 三 实战步骤

### 3.1 初始化项目(Agent)

```
1.输入：
初始化一个Spring Boot项目，包含基础依赖

2.CodeBuddy 自动生成：

user-system/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 ├── dto/
 ├── config/
 ├── UserSystemApplication.java
 └── application.yml
```

### 3.2 生成用户模块

```
一、Prompt：
实现用户模块（注册 + 登录 + 查询）

二、自动生成：

2.1 Entity

public class User {
    private Long id;
    private String username;
    private String password;
}


2.2 Controller

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/register")
    public String register() {
        return "success";
    }
}

2.3 Service
public class UserService {
    public void register(User user) {
        // logic
    }
}
```

### 2.3 加入 JWT 认证(核心)

```
1.Prompt：
增加JWT登录认证机制


2.自动生成内容：

- JwtUtil
- TokenFilter
- SecurityConfig

3.示例代码：

public class JwtUtil {
    public String generateToken(String username) {
        return "token";
    }
}
```

### 2.4 CRUD 功能完善

```
1.Prompt：
完善用户CRUD接口（分页查询）

2.自动生成：
- 分页查询
- 条件过滤
- SQL 优化
```

### 2.5 自动生成测试代码

```
1.Prompt：
为UserService生成单元测试

2.输出：

@SpringBootTest
public class UserServiceTest {

    @Test
    public void testRegister() {
        // test logic
    }
}
```

### 2.6 优化与重构(NES + Edit)

```
1.使用 NES 自动优化：

系统会建议：
- 加日志
- 加异常处理
- 加参数校验

2.Prompt：
优化UserService结构

3.优化结果：

- 拆分 Service
- 增加 DTO
- 增加异常类
```

### 2.7 项目最终结构

```
user-system/
 ├── controller/
 ├── service/
 ├── service/impl/
 ├── repository/
 ├── entity/
 ├── dto/
 ├── vo/
 ├── config/
 ├── util/
 ├── exception/
 └── UserSystemApplication.java
```

### 2.8 完整开发流程总结

```
CodeBuddy 实战开发流程：

1.定义需求（Prompt）:最重要一步
2.Agent 生成项目:自动搭建结构
3.分模块生成:用户 / 订单 / 权限
4.NES 自动优化:AI 主动优化代码
5.Edit 精细调整:修 Bug / 重构
6.测试生成:自动生成单测
```

## 三 实战注意事项

### 3.1 不要一次性生成大系统

```
错误：做一个电商系统
```

### 3.2 推荐模块化生成

```
正确：先生成用户模块
```

### 3.3 必须 Git 管理

```
git commit -m "init project"
```

### 3.4 必须人工 Review

```
AI ≠ 最终代码
```

## 四 本篇总结

```
1.CodeBuddy 实战核心价值：
从“写代码”变成“指挥 AI 开发项目”

2.三大能力：

- 自动生成项目结构
- 自动生成业务代码
- 自动优化与测试

3.本质变化：

从：人写代码
到：人定义需求 + AI 生成系统
```

