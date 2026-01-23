---
title: Java开发之——各版本特性
categories:
  - 开发
  - A-基础语言
  - Java
tags:
  - Java
abbrlink: 2919b042
date: 2025-11-18 15:08:46
---
## 一 概述

```
本文介绍：
-从 Java 5 到 Java 21(LTS)的内容
-包含：版本变化、语法特性、JVM/性能优化以及迁移建议。
```

<!--more-->

## 二 Java 各版本特性总览

|     版本     | 发布时间 |                           主要特性                           |       适配/变更重点       |
| :----------: | :------: | :----------------------------------------------------------: | :-----------------------: |
| Java 5 (1.5) |   2004   |        泛型、枚举、注解、自动装箱、可变参数、增强 for        | 编译器泛型擦除、注解反射  |
|    Java 6    |   2006   |            性能优化、脚本引擎 (JSR-223)、JDBC 4.0            | Nashorn前身、JAXB、JAX-WS |
|    Java 7    |   2011   | try-with-resources、菱形语法、字符串 switch、多异常捕获、NIO.2 |        文件IO改进         |
|    Java 8    |   2014   |  Lambda、Stream API、Optional、Date/Time API、默认接口方法   |    函数式编程核心版本     |
|    Java 9    |   2017   |      模块化系统 (JPMS)、改进 REPL (JShell)、Stream 增强      |  模块适配、反射访问限制   |
|   Java 10    |   2018   |                       var 局部类型推断                       |      语法糖、小更新       |
|   Java 11    |   2018   |     LTS、HTTP Client、局部变量 Lambda 参数、移除 Java EE     |     推荐企业长期版本      |
|   Java 12    |   2019   |             Switch 表达式 (预览)、Shenandoah GC              |       性能、GC改进        |
|   Java 13    |   2019   |             文本块 (Text Block, 预览)、动态 CDS              |      多行字符串支持       |
|   Java 14    |   2020   |         instanceof 模式匹配、record（预览）、NPE增强         |   更安全高效的类型判断    |
|   Java 15    |   2020   |          Sealed Classes（预览）、Text Block 正式化           |       封闭继承结构        |
|   Java 16    |   2021   |           record 正式版、instanceof 模式匹配正式版           |    不可变数据类标准化     |
|   Java 17    |   2021   |        LTS、密封类、switch 模式匹配（预览）、JEP 整理        |      企业推荐稳定版       |
|   Java 18    |   2022   |               简易 Web Server、UTF-8 默认编码                |      开发者体验增强       |
|   Java 19    |   2022   |             虚拟线程（预览）、结构化并发（预览）             |      高并发模型变革       |
|   Java 20    |   2023   |              虚拟线程 & Record 模式（第二预览）              |       并发优化继续        |
|   Java 21    |   2023   |       LTS、虚拟线程正式版、模式匹配正式版、Record 模式       |        并发新时代         |

## 三 主要版本详解与代码示例

### 3.1 Java 5（1.5） —— 泛型与注解时代

```
1、特性：
-泛型 List<String>
-注解 @Override, @Deprecated
-枚举 enum
-自动装箱/拆箱
-增强 for 循环 for (String s : list)
-可变参数 foo(String... args)

2、意义：类型安全 + 语法现代化
3、兼容注意：泛型在编译后擦除，不影响 JVM 层。
```

### 3.2 Java 7 —— 安全与语法改进

```
1、特性：
-try-with-resources 自动关闭资源
-多异常捕获 catch (IOException | SQLException e)
-字符串支持 switch
-菱形语法 List<String> list = new ArrayList<>();
-NIO.2 新文件 API（Files, Path）

2、推荐用法：

try (BufferedReader br = Files.newBufferedReader(path)) {
    br.lines().forEach(System.out::println);
}
```

### 3.3 Java 8 —— Lambda / Stream / Optional（革命性版本）

```
1、特性：
-Lambda 表达式 (x) -> x * 2
-Stream API
-Optional
-新日期时间 API (LocalDate, Instant)
-接口默认方法 default
-并行流、函数式接口

2、示例：

List<String> list = Arrays.asList("a", "b", "c");
list.stream().map(String::toUpperCase).forEach(System.out::println);


3、兼容性重点：
-推荐迁移：匿名内部类 → Lambda
-注意 Stream 非短路时性能消耗
```

### 3.4 Java 9 —— 模块化系统 JPMS

```
1、特性：
-模块系统 (module-info.java)
-JShell（交互 REPL）
-Stream API 新增 takeWhile, dropWhile
-私有接口方法

2、示例：

module com.example.myapp {
    requires java.sql;
    exports com.example.utils;
}


3、兼容注意：
-反射访问私有 JDK 模块将被警告
-第三方库可能需升级以适配 JPMS
```

### 3.5  Java 10 —— 局部类型推断

```
1、特性：
var 局部变量类型推断（编译期）

2、示例：
var map = new HashMap<String, Integer>();

3、注意：
var 仅限局部变量，不影响静态类型系统。
```

### 3.6 Java 11 —— LTS + HTTP Client + 新 API

```
1、特性：
-HTTP Client（标准库）
-字符串 API（isBlank, lines, strip）
-移除 Java EE / CORBA 模块
-var Lambda 参数
-ZGC 引入

2、HTTP 新用法：

HttpClient client = HttpClient.newHttpClient();
HttpRequest req = HttpRequest.newBuilder(URI.create("https://example.com")).build();
client.send(req, HttpResponse.BodyHandlers.ofString());
```

### 3.7 Java 14-17 —— Record、Sealed、Pattern Matching

```
1、Java 14：
-record（预览）
-NullPointerException 更清晰

2、Java 15：
-Text Block ("""多行字符串""")
-Sealed Class（预览）

3、Java 16：
-Record 正式版，instanceof 模式匹配正式化

4、Record 示例：
public record User(String name, int age) {}

5、Sealed 示例：
public sealed class Shape permits Circle, Rectangle {}
```

### 3.8 Java 17（LTS） —— 企业推荐稳定版本

```
1、特性：
-Sealed Class 正式版
-switch 模式匹配（预览）
-强封装 JDK 内部 API
-移除 Applet、RMI 激活等旧功能

2、兼容注意：
-反射访问 sun.misc.Unsafe 将报错
-推荐迁移至公开 API
```

### 3.9 Java 19-21 —— 虚拟线程与模式匹配新时代

```
1、Java 19-20：
-虚拟线程（预览）
-Record 模式（预览）
-Structured Concurrency（预览）

2、Java 21（LTS）：
-虚拟线程正式版（Project Loom）
-Record 模式正式版
-Switch 模式匹配正式版
-Sequenced Collections

3、虚拟线程示例：

try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> System.out.println(Thread.currentThread()));
}


4、Switch 模式匹配：

static String format(Object obj) {
    return switch (obj) {
        case Integer i -> "int " + i;
        case String s -> "String " + s;
        default -> "unknown";
    };
}


5、优势：百万并发任务毫秒级调度，无需阻塞 OS 线程。
```

## 四 版本迁移与兼容性建议

|  升级方向   |                            建议                            |
| :---------: | :--------------------------------------------------------: |
| JDK 8 → 11  |      优先迁移（LTS），适配 HTTP Client、Stream 新方法      |
| JDK 11 → 17 |            模块化清理、去除内部依赖、升级三方库            |
| JDK 17 → 21 | 并发体系重构（虚拟线程）、使用 record/模式匹配重写部分结构 |
|  构建工具   |          Gradle/Maven 需更新 JDK Toolchains 支持           |
|  测试框架   |          JUnit5 推荐（支持模块化与 Record 测试）           |

## 五 开发环境建议

|      场景       |    推荐版本    |                           说明                           |
| :-------------: | :------------: | :------------------------------------------------------: |
|     Android     |   Java 8/11    | Android Gradle 插件兼容最高至 17（部分新语法需 desugar） |
|    企业后端     | Java 17 (LTS)  |                  性能稳定，支持现代语法                  |
| 新项目 / 高并发 | Java 21 (LTS)  |                 虚拟线程正式版，性能突破                 |
|    学习/面试    | Java 8, 11, 17 |               三大里程碑版本，覆盖语法演进               |

## 六 快速记忆口诀

```
5 泛型注解，
7 资源异常，
8 函数式流，
9 模块新容器，
10 var，
11 LTS，
14 record，
17 LTS，
21 虚拟线程。
```

