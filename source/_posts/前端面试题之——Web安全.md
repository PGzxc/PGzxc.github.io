---
title: 前端面试题之——Web安全
categories:
  - 面试相关
  - 前端面试题
tags:
  - 前端面试题
abbrlink: 2a7ce587
date: 2024-03-23 19:30:56
---
## 一 面试题汇总

1. 常见的网站漏洞有哪些？
2. 简要介绍一下XSS以及XSS如何防御
3. 简要介绍一下CSRF(跨站请求伪造)以及如何防御
4. 简要介绍一下DNS劫持？
5. 简要介绍一下SQL注入？<!--more-->
6. 简要介绍一下DNS污染？
7. 了解CSP吗，介绍一下？

## 二 面试题解答(仅供参考)

### 2.1 常见的网站漏洞有哪些？

```
有跨站脚本攻击（XSS）、
跨站请求伪造（CSRF）、
点击劫持、
SQL注入、
DDOS攻击、
DNS劫持
```

### 2.2 简要介绍一下XSS以及XSS如何防御

```
跨站脚本攻击是说攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击，
比如获取cookie或者其他用户身份信息。 

可以分为存储型和反射型，
存储型是攻击者输入一些数据并且存储到了数据库中，其他浏览者看到的时候进行攻击，
反射型的话 不存储在数据库中，往往表现为将攻击代码放在URL地址的请求参数中。
防御的话为cookie设置HttpOnly属性、对用户的输入进行 检查，进行特殊字符串的过滤
```

### 2.3 简要介绍一下CSRF(跨站请求伪造)以及如何防御

```
CSRF可以理解为攻击者盗用了用户的身份，以用户的名义发送了恶意请求。
比如，用户登录一个网站 之后，立即在另一个Tab页面访问了攻击者用来制造攻击的网站，
这个网站要求访问刚刚登陆的网站，并发送了一个 恶意请求，这时候CSRF就产生了。
比如这个制造攻击的网站使用一张图片，而这张图片的链接却是可以修改数据库的，
这时候攻击者就以用户的名义操作了这个数据库。

防御方式的话：使用验证码、检查HTTP头部referer、使用token。
```

### 2.4 简要介绍一下DNS劫持？

```
DNS劫持的话是指在用户请求过程的域名解析中，
分析请求的域名，返回假的IP地址，使用户访问的是假的网址。
```

### 2.5 简要介绍一下SQL注入？

```
SQL 注入（SQL Injection）是一种常见的网络安全攻击技术，
攻击者通过在应用程序的输入参数中注入恶意的 SQL 代码，
从而在数据库中执行非授权的 SQL 查询或操作，进而获取敏感信息、修改数据或者执行其他恶意操作。
简而言之，SQL 注入利用了应用程序对用户输入的不充分验证和过滤，从而使攻击者能够执行恶意的 SQL 查询。

SQL 注入通常发生在需要用户输入数据的 Web 应用程序中，如登录表单、搜索框、用户注册等。
攻击者可以通过在输入框中输入恶意的 SQL 代码，绕过应用程序的输入验证，
将恶意代码发送到后端数据库，从而实现攻击目的
```

### 2.6 简要介绍一下DNS污染？

```
DNS 污染（DNS Spoofing）是一种网络攻击技术，
攻击者利用漏洞或欺骗手段篡改 DNS 查询结果，使用户访问恶意网站或者误导用户到错误的网站。
DNS 污染通常通过修改 DNS 缓存或者欺骗 DNS 查询的方式进行
```

### 2.7 了解CSP吗，介绍一下？

```
CSP（Content Security Policy）是一种网络安全策略，用于减少和报告网站中的恶意脚本攻击，
通过限制浏览器加载和执行外部脚本的方式提高网站的安全性。
CSP 可以帮助网站管理员防御跨站脚本攻击（XSS）、数据窃取、点击劫持等攻击。

CSP 的主要原理是通过在 HTTP 响应头中添加 Content-Security-Policy 或者 X-Content-Security-Policy 字段，
向浏览器发送一组指令，告知浏览器允许加载和执行哪些资源，并阻止不安全的行为
```

## 三 参考

* [FE-Interview—Web安全](https://huruji.github.io/FE-Interview/#/docs/WebSecurity)


