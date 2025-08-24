---
title: Rust开发之——测试驱动开发(39)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 643b1d97
date: 2025-08-25 07:15:42
---
## 一 概述

```
本文主要介绍了采用测试驱动开发（TDD）模式为minigrep工具实现搜索功能的过程，
重点包括测试编写、功能实现及集成
```

<!--more-->

## 二 测试驱动开发(TDD)流程

```
TDD 遵循 “编写失败测试→实现代码使测试通过→重构优化” 的循环，
确保功能开发围绕测试目标进行。

本节以实现search函数（在文本中搜索包含指定字符串的行）为例展开。
```

## 三 编写失败的测试

### 3.1 测试目标

```
定义search函数，接收查询字符串(query)和文本内容(contents)，返回包含query的所有文本行(字符串切片)
```

### 3.2 测试用例

```
1、说明
设计测试函数one_result，验证当query为"duct"、contents包含三行文本（仅中间行含"duct"）时，
search返回包含中间行的向量：

2、代码
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(
            vec!["safe, fast, productive."],
            search(query, contents)
        );
    }
}
```

### 3.3 初始实现(确保测试失败)

```
1、说明
定义search函数返回空向量，此时测试因结果不匹配而失败：

2、示例
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    vec![] // 初始返回空向量，测试失败
}
```

## 四 实现功能使测试通过

### 4.1 核心逻辑

```
search函数需完成：
 -遍历文本的每一行；
 -检查行中是否包含query；
 -收集所有包含query的行并返回。
```

### 4.2 代码实现

```
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new(); // 存储匹配的行

    // 遍历每一行
    for line in contents.lines() {
        // 检查行是否包含查询字符串
        if line.contains(query) {
            results.push(line); // 加入结果向量
        }
    }

    results // 返回匹配结果
}
```

### 4.3 生命周期注解

```
函数签名中显式声明生命周期'a，关联contents参数与返回值，
确保返回的字符串切片引用有效(与contents生命周期一致)。
```

## 五 集成`search`函数到主程序

```
1、说明
在run函数中调用search，并打印所有匹配的行：

2、示例
pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.filename)?; // 读取文件内容

    // 搜索并打印匹配的行
    for line in search(&config.query, &contents) {
        println!("{}", line);
    }

    Ok(())
}
```

## 六 验证与扩展

```
测试通过：运行cargo test，one_result测试通过，证明search功能正确。
实际运行：通过命令行调用minigrep，如cargo run frog poem.txt，成功输出包含"frog"的行。
```

## 七 总结

```
通过 TDD 模式，先明确测试目标，再逐步实现功能，确保代码符合预期。
search函数利用lines()遍历行、contains()检查包含关系，结合向量收集结果，完成了核心搜索功能。
生命周期注解保证了引用安全性，集成到run函数后，实现了从文件读取到搜索打印的完整流程。
```

## 八 参考

* [Rust中文官网—采用测试驱动开发完善库的功能](https://rust.bootcss.com/ch12-04-testing-the-librarys-functionality.html)