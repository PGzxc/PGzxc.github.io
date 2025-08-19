---
title: Rust开发之——测试的组织结构(35)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 3b426faf
date: 2025-08-19 10:28:32
---
## 一 概述

* 单元测试(Unit Tests)
* 集成测试(Integration Tests)
* 集成测试中的共享代码
* 测试二进制文件(Binary Crate)
* 单元测试与集成测试的对比

<!--more-->

## 二 单元测试(Unit Tests)

```
单元测试用于验证代码中独立组件（如函数、结构体方法）的正确性，
通常与被测试代码放在同一文件中。
```

### 2.1 单元测试的位置与结构—测试模块

```
1、说明
一般在被测试代码所在文件中，用#[cfg(test)]标注的模块包裹测试函数，
确保测试代码仅在运行测试时编译。

2、示例
// src/lib.rs
pub fn add(a: i32, b: i32) -> i32 { a + b }

#[cfg(test)]  // 仅测试时编译
mod tests {
    use super::*;  // 导入外部模块的函数

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}
```

### 2.2 单元测试的位置与结构—访问私有项

```
单元测试可直接访问同一模块中的私有函数或字段（因测试模块与被测试代码在同一 crate），
无需暴露不必要的接口
```

## 三 集成测试(Integration Tests)

集成测试用于验证多个组件协同工作的正确性，模拟外部用户使用库的方式，关注公共 API 的行为

### 3.1 集成测试的目录结构

```
1、说明
需在项目根目录创建tests文件夹，每个.rs文件作为独立的测试 crate，文件名即为测试模块名

2、目录结构
project/
├── src/
│   └── lib.rs    # 被测试的库代码
└── tests/
    ├── integration_test.rs  # 集成测试文件
    └── common/              # 共享测试代码（需包含mod.rs）
        └── mod.rs
        
3、测试文件的编写
3.1、说明
集成测试需通过use导入被测试的库，只能访问公共 API

3.2、示例
// tests/integration_test.rs
use my_crate;  // 导入被测试的库

#[test]
fn test_add_public() {
    assert_eq!(my_crate::add(2, 3), 5);  // 仅调用公共函数
}
```

### 3.2 运行集成测试

```
-默认命令：cargo test会自动运行所有集成测试（与单元测试一起）。
-单独运行：cargo test --test <文件名>（无需.rs后缀），
如cargo test --test integration_test。
```

## 四 集成测试中的共享代码

### 4.1 放置位置

```
若多个集成测试文件需要共享代码，可在tests目录下创建子目录（如common），并在其中放置mod.rs

// tests/common/mod.rs
pub fn setup() { /* 共享的初始化逻辑 */ }
```

### 4.2 导入共享代码

```
其他测试文件通过use导入共享代码

// tests/integration_test.rs
use common::setup;  // 导入共享函数
```

## 五 测试二进制文件(Binary Crate)

```
对于仅包含src/main.rs的二进制项目（无库 crate），集成测试无法直接导入代码，
需将核心逻辑提取到库 crate（src/lib.rs）中，再在main.rs中调用，以便集成测试访问。
```

## 六 单元测试与集成测试的对比

|   维度   |                   单元测试                   |            集成测试             |
| :------: | :------------------------------------------: | :-----------------------------: |
| 测试对象 |             独立组件(函数、方法)             |        多个组件协同工作         |
| 访问权限 |                 可访问私有项                 |        仅能访问公共 API         |
|   位置   | 与被测试代码在同一文件（`#[cfg(test)]`模块） |    项目根目录的`tests`文件夹    |
|   目的   |            验证组件内部逻辑正确性            | 验证公共 API 的整体行为符合预期 |

## 七 总结

```
-分层测试策略：单元测试确保组件独立功能正确，集成测试验证整体交互，两者结合提升代码可靠性。
-代码组织：单元测试嵌入被测试模块，集成测试放在tests目录，通过目录结构区分职责。
-公共 API 聚焦：集成测试强制通过公共接口访问，模拟真实使用场景，确保 API 设计的合理性
```

## 八 参考

* [Rust中文官网——测试的组织结构](https://rust.bootcss.com/ch11-03-test-organization.html)