---
title: Rust开发之——处理环境变量(40)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: ca8ff41a
date: 2025-08-28 10:17:45
---
## 一 概述

```
本文主要介绍了在minigrep工具中通过环境变量控制搜索的大小写敏感性，
采用测试驱动开发（TDD）模式实现功能扩展
```

<!--more-->

## 二 功能目标与测试设计

### 2.1 功能目标

```
允许用户通过设置环境变量CASE_INSENSITIVE，控制搜索是否忽略大小写（默认大小写敏感）
```

### 2.2 测试用例设计

```
1、遵循 TDD 流程，先编写失败测试，明确功能预期：
 -大小写敏感测试（case_sensitive）：验证搜索"duct"时，仅匹配小写 "duct" 所在行，不匹配大写 "Duct"。
 -大小写不敏感测试（case_insensitive）：验证搜索"rUsT"时，匹配包含 "Rust"（大写 R）和 "Trust"（大写 T）的行。
 
2、示例
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
Duct tape.";
        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }

    #[test]
    fn case_insensitive() {
        let query = "rUsT";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
Trust me.";
        assert_eq!(vec!["Rust:", "Trust me."], search_case_insensitive(query, contents));
    }
}
```

## 三 实现大小写不敏感搜索函数

### 3.1 核心逻辑

```
定义search_case_insensitive函数，
将查询字符串和每行文本均转为小写后再检查包含关系，实现大小写无关匹配
```

### 3.2 示例

```
pub fn search_case_insensitive<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let query = query.to_lowercase(); // 转为小写
    let mut results = Vec::new();

    for line in contents.lines() {
        // 行文本转为小写后检查是否包含查询
        if line.to_lowercase().contains(&query) {
            results.push(line);
        }
    }

    results
}
```

## 四 集成环境变量控制

### 4.1 扩展配置结构体

```
1、说明
在Config中增加case_sensitive字段，存储是否大小写敏感的标志

2、示例
pub struct Config {
    pub query: String,
    pub filename: String,
    pub case_sensitive: bool, // 控制搜索模式
}
```

### 4.2 根据环境变量设置标志

```
1、说明
在Config::new中检查环境变量CASE_INSENSITIVE：
 -若该变量存在（无论值是什么），则case_sensitive为false（不敏感）；
 -否则为true（敏感）：
 
2、示例
use std::env;

impl Config {
    pub fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let filename = args[2].clone();
        // 环境变量存在则大小写不敏感
        let case_sensitive = env::var("CASE_INSENSITIVE").is_err();

        Ok(Config { query, filename, case_sensitive })
    }
}
```

### 4.3 在`run`中选择搜索函数

```
1、说明
根据case_sensitive的值，调用对应的搜索函数

2、示例
pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.filename)?;

    let results = if config.case_sensitive {
        search(&config.query, &contents) // 大小写敏感
    } else {
        search_case_insensitive(&config.query, &contents) // 不敏感
    };

    for line in results {
        println!("{}", line);
    }

    Ok(())
}
```

## 五 验证功能

```
大小写敏感模式（默认）：运行cargo run to poem.txt，仅匹配小写 "to" 的行。
大小写不敏感模式：设置环境变量后运行（如CASE_INSENSITIVE=1 cargo run to poem.txt），匹配包含 "to"、"To" 的行。
```

## 六 总结

```
通过 TDD 模式，先定义测试明确功能预期，再实现大小写不敏感搜索函数，并利用环境变量CASE_INSENSITIVE控制搜索模式。
这一过程展示了如何结合环境变量扩展命令行工具的灵活性，同时保持代码的可测试性和模块化。
```

## 七 参考

* [Rust中文官网—处理环境变量](https://rust.bootcss.com/ch12-05-working-with-environment-variables.html)