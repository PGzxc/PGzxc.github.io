---
title: Cmake自学之——Set方法(6)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学 
tags:
  - Cmake
abbrlink: ddd38c81
date: 2020-01-20 21:24:46
---
## 一 概述

set方法是cmake-commands中的脚本方法，用于给下面的变量设置值：


* 一般变量(Set Normal Variable)
* 缓存变量(Set Cache Entry)
* 环境变量(Set Environment Variable)

<!--more-->

## 二 Set方法说明
### 2.1 一般变量(Set Normal Variable)

```
set(<variable> <value>... [PARENT_SCOPE])
```

* variable：只能有一个
* value：可以有0个，1个或多个，当value值为空时，方法同unset，用于取消设置的值
* PARENT_SCOPE(父作用域)：作用域，除PARENT_SCOPE外还有function scope(方法作用域)和directory scope(目录作用域)


### 2.2 缓存变量(Set Cache Entry)

```
set(<variable> <value>... CACHE <type> <docstring> [FORCE])
```
* variable：只能有一个
* value：可以有0个，1个或多个，当value值为空时，方法同unset，用于取消设置的值
* CACHE：关键字，说明是缓存变量设置
* type(类型)：必须为以下中的一种：
	 - BOOL：有ON/OFF，两种取值
	 - FILEPATH：文件的全路径
	 - PATH：目录路径
	 - STRING：字符串
	 - INTERNAL：字符串
* docstring：总结性文字(字符串)
* [FORCE]：变量名相同，第二次调用set方法时，第一次的value将会被覆盖

### 2.3 环境变量(Set Environment Variable)

```
set(ENV{<variable>} [<value>])
```

* variable：只能有一个
* value：一般来说，只有一个，为空时，将清除之前设置的变量值，多个时，取值最近的一个，之后的值将被忽略

## 三 示例

### 3.1 一般变量(Set Normal Variable)

* CMakeLists.txt中设置

  ```
  #normal
  set(normal "normalValue")
  message(WARNING ${normal})
  set(a 1 b 2 "c" [PARENT_SCOPE])
  message(WARNING ${a})
  ```

* Debug输出结果

  ```
  CMake Warning at CMakeLists.txt:10 (message):
    normalValue
  
  CMake Warning at CMakeLists.txt:12 (message):
    1b2c[PARENT_SCOPE]
  ```

### 3.2 缓存变量(Set Cache Entry)

* CMakeLists.txt中设置

  ```
  # cache
  set(isOn ON CACHE BOOL "Bool" [FORCE])
  message(WARNING ${isOn})
  set(isOFF OFF CACHE BOOL "Bool" )
  message(WARNING ${isOFF})
  
  ## cache-FILEPATH
  set(filePath ${PROJECT_SOURCE_DIR}/CMakeLists.txt CACHE FILEPATH "file path")
  message(WARNING ${filePath})
  set(filePath ${PROJECT_SOURCE_DIR}/main.cpp CACHE FILEPATH "file path" [FORCE])
  message(WARNING ${filePath})
  
  ## cache-PATH
  set(path ${PROJECT_SOURCE_DIR} CACHE PATH "path")
  message(WARNING ${path})
  set(path ${PROJECT_BINARY_DIR} CACHE PATH "path" [FORCE])
  message(WARNING ${path})
  
  ## cache-STRING
  set(string cmake CACHE STRING "string")
  message(WARNING ${string})
  set(string newcmake CACHE STRING "newstring" [FORCE])
  message(WARNING ${string})
  
  ##cache-internal
  set(internal internal CACHE INTERNAL "internal")
  message(WARNING ${internal})
  set(internal newinternal CACHE INTERNAL "newinternal" [FORCE])
  message(WARNING ${internal})
  ```

* Debug输出结果

  ```
  CMake Warning at CMakeLists.txt:12 (message):
    ONCACHEBOOLBool[FORCE]
  
  CMake Warning at CMakeLists.txt:14 (message):
    OFF
  
  CMake Warning at CMakeLists.txt:18 (message):
    E:/Code/ClionDemo/CmakeSet/CMakeLists.txt
  
  CMake Warning at CMakeLists.txt:20 (message):
    E:/Code/ClionDemo/CmakeSet/main.cppCACHEFILEPATHfile path[FORCE]
  
  CMake Warning at CMakeLists.txt:24 (message):
    E:/Code/ClionDemo/CmakeSet
  
  CMake Warning at CMakeLists.txt:26 (message):
    E:/Code/ClionDemo/CmakeSet/cmake-build-debugCACHEPATHpath[FORCE]
  
  CMake Warning at CMakeLists.txt:30 (message):
    cmake
  
  CMake Warning at CMakeLists.txt:32 (message):
    newcmakeCACHESTRINGnewstring[FORCE]
  
  CMake Warning at CMakeLists.txt:36 (message):
    internal
  
  CMake Warning at CMakeLists.txt:38 (message):
    newinternalCACHEINTERNALnewinternal[FORCE]
  ```

### 3.3 环境变量(Set Environment Variable)

* CMakeLists.txt中设置

  ```
  message(WARNING $ENV{JAVA_HOME}) #JAVA_HOME是windows中设置的变量
  set(ENV{JAVA_HOME} 1)
  message(WARNING $ENV{JAVA_HOME})
  
  set(ENV{DEFINE} DEFINE  DEFINE2 DEFINE3) #自定义的变量
  message(WARNING $ENV{DEFINE})
  
  set(a) #没有value值，a值清空
  message(WARNING ${a})
  ```

* Debug输出结果

  ```
  CMake Warning at CMakeLists.txt:42 (message):
    D:\SoftWare\Java\jdk1.8.0_191
  
  CMake Warning at CMakeLists.txt:44 (message):
    1
  
  CMake Warning at CMakeLists.txt:49 (message):
    DEFINE
  
  CMake Warning at CMakeLists.txt:52 (message):
  ```

## 四 参考

* [Documentation>>cmake-command>>set][1]  



[1]:https://cmake.org/cmake/help/v3.16/command/set.html