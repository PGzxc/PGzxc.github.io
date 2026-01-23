---
title: Rust开发之——编写测试(33)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 404cb275
date: 2025-08-15 08:07:58
---
## 一 概述

* 测试的基本结构与语法
* 测试断言宏
* 测试失败的处理
* 运行测试的命令
* 测试的分类

<!--more-->

## 二 测试的基本结构与语法

### 2.1 测试函数的定义

```
1、说明
使用#[test]属性标记测试函数，函数无参数且返回()。

2、示例：
#[test]
fn it_works() {
    let result = 2 + 2;
    assert_eq!(result, 4);  // 断言成功则测试通过
}
```

### 2.2 测试模块

```
1、说明
通常将测试代码放在#[cfg(test)]标注的模块中，仅在运行测试时编译

2、示例
#[cfg(test)]
mod tests {
    #[test]
    fn test1() { /* 测试逻辑 */ }
}

3、#[cfg(test)]的作用：
确保测试代码不包含在生产环境的二进制文件中，减少体积。
```

## 三 测试断言宏

Rust 提供多种断言宏验证测试结果，失败时自动触发`panic!`：

### 3.1 assert!宏

```
1、说明
验证布尔表达式为true，失败时输出消息
2、示例
assert!(result.is_ok(), "结果应为Ok，但实际为Err");
```

### 3.2 assert_eq!与assert_ne!宏

```
验证两个值相等（assert_eq!）或不等（assert_ne!），自动打印不匹配的值：
assert_eq!(add(2, 3), 5);    // 验证相等
assert_ne!(divide(10, 2), 3); // 验证不等


要求值实现PartialEq和Debug trait（基本类型已默认实现）
```

## 四 测试失败的处理

### 4.1 预期失败的测试

```
1、说明
使用#[should_panic]标注测试，预期函数触发panic!，否则测试失败：

2、示例
#[test]
#[should_panic(expected = "索引越界")]  // 可选：指定预期错误消息
fn test_index_out_of_bounds() {
    let v = vec![1, 2, 3];
    v[100];  // 触发panic，测试通过
}
```

### 4.2 返回Result<T, E>的测试

```
1、说明
测试函数可返回Result<T, E>，Err变体表示测试失败，避免显式panic!：

2、示例
#[test]
fn test_file_read() -> Result<(), std::io::Error> {
    let content = std::fs::read_to_string("test.txt")?;  // 错误时返回Err
    assert!(!content.is_empty());
    Ok(())
}
```

## 五 运行测试的命令

### 5.1 基本命令

```
cargo test：运行所有测试，输出通过 / 失败结果及执行时间。
```

### 5.2 过滤测试

```
按名称过滤：cargo test test_name 仅运行名称包含test_name的测试。
按模块过滤：cargo test tests::module 运行指定模块内的测试。
```

### 5.3 控制输出

```
cargo test -- --nocapture：显示测试函数中的打印输出（默认捕获输出）。
cargo test -- --test-threads=1：禁用并行测试，确保打印输出顺序。
```

## 六 测试的分类

### 6.1 单元测试(Unit Tests)

```
测试独立函数或模块，可访问private项（因测试模块与被测试代码在同一 crate）。
示例：测试add函数的边界情况（如负数相加）。
```

### 6.2 集成测试(Integration Tests)

```
测试多个模块的交互，通常放在项目根目录的tests文件夹中，作为独立 crate 运行。
示例：测试 API 接口的完整调用流程（从请求到响应）。
```

## 七 总结

```
-测试结构：通过#[test]标记函数，#[cfg(test)]隔离测试代码，避免影响生产环境。
-断言工具：assert!、assert_eq!、assert_ne!用于验证结果，#[should_panic]处理预期失败。
-运行方式：cargo test执行测试，支持过滤和输出控制，适应不同场景。
-测试类型：单元测试关注独立组件，集成测试验证整体功能，共同保障代码质量。
```


## 八 参考

* [Rust中文官网——如何编写测试](https://rust.bootcss.com/ch11-01-writing-tests.html)