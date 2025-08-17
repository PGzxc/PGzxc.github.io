---
title: Rust开发之——运行测试(34)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 9c7c58c7
date: 2025-08-18 07:07:31
---
## 一 概述

* 运行测试的基本命令
* 测试输出的解读
* 测试过滤：运行特定测试
* 控制测试的执行方式
* 集成测试的运行
* 测试相关的配置

<!--more-->

## 二 运行测试的基本命令

### 2.1 默认命令：cargo test

```
1、功能：
编译并运行所有测试（单元测试、集成测试），输出测试结果汇总。

2、示例输出包含：
-测试总数、通过数、失败数。
-每个测试的执行状态（ok/failed）及耗时。
```

### 2.2 测试的执行特性

```
并行运行：默认多线程并行执行测试，提高效率（可通过--test-threads调整）。
捕获输出：默认不显示测试函数中的println!输出，仅在测试失败时展示
```

## 三 测试输出的解读

### 3.1 成功测试的输出

```
1、输出案例
running 2 tests
test tests::test1 ... ok
test tests::test2 ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

2、关键信息：总测试数、通过数、耗时等。
```

### 3.2 失败测试的输出

```
失败测试会显示详细错误信息，包括断言位置、预期值与实际值：
test tests::test3 ... FAILED

failures:

---- tests::test3 stdout ----
thread 'tests::test3' panicked at 'assertion failed: `(left == right)`
  left: `5`,
 right: `6`', src/lib.rs:10:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

failures:
    tests::test3

test result: FAILED. 2 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

## 四 测试过滤：运行特定测试

### 4.1 按名称过滤

```
1、命令：
cargo test <测试名片段>，运行名称包含该片段的测试。

2、示例：
cargo test add：运行名称含add的测试（如test_add、test_add_neg）。
cargo test tests::math：运行tests模块下math子模块中的测试。
```

### 4.2 忽略测试：#[ignore]

```
1、说明
标记暂时不运行的测试，需显式指定--ignored才执行

2、示例
#[test]
#[ignore]
fn long_running_test() {  // 耗时较长的测试，默认跳过
    // 测试逻辑
}

运行忽略的测试：
cargo test -- --ignored。
```

## 五 控制测试的执行方式

### 5.1 禁用并行测试

```
命令：cargo test -- --test-threads=1，强制单线程执行，避免测试间资源竞争（如共享文件）。
```

### 5.2 显示测试输出

```
命令：cargo test -- --nocapture，显示测试函数中的println!等输出，方便调试
```

### 5.3 仅编译不运行测试

```
命令：cargo test --no-run，仅生成测试二进制文件，用于后续手动执行或分发。
```

## 六 集成测试的运行

### 6.1 集成测试的位置

```
位于项目根目录的tests文件夹中，每个文件为独立测试 crate
```

### 6.2 运行集成测试

```
cargo test默认包含集成测试，与单元测试一起执行。
单独运行某集成测试文件：cargo test --test <文件名>（无需.rs后缀）。
```

## 七 测试相关的配置

### 7.1 测试配置项

```
在Cargo.toml中通过[profile.test]配置测试编译选项（如优化级别）

[profile.test]
opt-level = 1  # 测试编译时开启轻度优化，平衡速度与调试体验
```

### 7.2 环境变量

```
RUST_TEST_THREADS：设置测试线程数（等价于--test-threads）。
RUST_BACKTRACE=1：显示测试失败时的栈回溯，帮助定位错误
```

## 八 总结

```
基本操作：cargo test是运行测试的核心命令，自动处理编译与执行。
灵活性控制：通过名称过滤、忽略测试、调整线程数等，适应不同测试场景。
输出解读：关注失败测试的详细信息（断言位置、值对比），结合栈回溯排查问题。
集成测试：与单元测试统一通过cargo test运行，支持单独指定文件执行
```


## 九 参考

* [Rust中文官网——控制测试如何运行](https://rust.bootcss.com/ch11-02-running-tests.html)