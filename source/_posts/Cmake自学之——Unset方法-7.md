---
title: Cmake自学之——Unset方法(7)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学  
tags:
  - Cmake
abbrlink: 5a9c4a7a
date: 2020-01-20 21:29:11
---
## 一 概述

set方法用于给变量设置值，同理，unset方法用于给变量清空值，其中变量的取值为以下三种：  

* 一般变量(Normal Variable)
* 缓存变量(Cache Variable)
* 环境变量(Environment Variable)  

<!--more-->

## 二 unset方法说明

### 2.1 一般变量(Normal Variable)

```
unset(<variable> PARENT_SCOPE)
```

* variable：设置要清除的变量名
* PARENT_SCOPE(可选)：如果set方法设置了PARENT_SCOPE，清除时，也请带上PARENT_SCOPE

### 2.2 缓存变量(Cache Variable)

```
unset(<variable> CACHE)
```

* variable：设置要清除的变量名
* 对于缓存变量清除，带上CACHE

### 2.3 环境变量(Environment Variable)  

```
unset(ENV{<variable>})
```

* ENV：Environment的简写，是环境变量的意思
* variable：设置要清除的变量名

## 三 示例

### 3.1 一般变量(Normal Variable)
* CMakeList.txt中设置

  ```
  #normal
  set(normal  "normal" )
  message(WARNING ${normal})
  unset(normal)
  message(WARNING ${normal}) 
  ```


* Debug信息

  ```
  CMake Warning at CMakeLists.txt:11 (message):
    normal
  
  CMake Warning at CMakeLists.txt:13 (message):#因为调用了unset，没有信息输出
  ```

### 3.2  缓存变量(Cache Variable)

* CMakeList.txt中设置

  ```
  set(string cmake CACHE STRING "string")#没有多次使用set，导致覆盖variable
  message(WARNING ${string})
  #unset(string)
  unset(string CACHE)
  message(WARNING ${string})
  
  
  
  set(normalCache "normalCache")#多次使用set，导致覆盖variable
  set(normalCache "NewnormalCache" CACHE STRING "string")
  message(WARNING ${normalCache})
  #unset(normalCache)
  unset(normalCache CACHE)
  message(WARNING ${normalCache})
  ```

* Debu信息(set方法使用了Cache，清除时unset，也需要使用Cache)

  ```
  CMake Warning at CMakeLists.txt:18 (message):
    cmake
  
  CMake Warning at CMakeLists.txt:21 (message):
  
  CMake Warning at CMakeLists.txt:27 (message):
    NewnormalCache
  
  CMake Warning at CMakeLists.txt:30 (message):
  ```

### 3.3 环境变量(Environment Variable) 

* CMakeList.txt中设置

  ```
  ##unset(ENV)
  set(ENV{DEFINE} DEFINE) #自定义的变量
  message(WARNING $ENV{DEFINE})
  unset(ENV{DEFINE})
  message(WARNING $ENV{DEFINE})
  ```

* Debug信息

  ```
  CMake Warning at CMakeLists.txt:35 (message):
    DEFINE
  
  CMake Warning at CMakeLists.txt:37 (message):
  ```

## 四 参考

* [Documentation>>cmake-command>>unset][1]

[1]:https://cmake.org/cmake/help/v3.16/command/unset.html?highlight=unset#unset-normal-variable-or-cache-entry