---
title: TensorFlow开发之——Windows安装TensorFlow(1)
categories:
  - 开发
  - Q-AI
  - TensorFlow
tags:
  - TensorFlow
abbrlink: 884f7233
date: 2024-08-28 17:39:01
---
## 一 概述

* 开发环境及工具准备
* 安装开发工具
* 安装TensorFlow
* 验证TensorFlow

<!--more-->

## 二 开发环境及工具准备

### 2.1 开发环境

Windows 11专业版 23H2

### 2.2 工具

* Python 3.6-3.9(本文选择3.9)
* pip 19.0或更高版本(Python 3.9/Scripts目录下)
* Visual Studio的Miscrofoft Visual C++再发行软件

## 三 安装开发工具

### 3.1 下载安装Python

1-下载及安装Python

下载地址：https://www.python.org/downloads/windows/

图示

![][1]

2-验证Python、pip版本

```
C:\Users\83422>python --version
Python 3.9.12

C:\Users\83422>pip --version
pip 22.0.4 from D:\SoftWare\DevTools\Python\Python39\lib\site-packages\pip (python 3.9)
```

### 3.2 创建虚拟环境(用于将软件包安装与系统隔离开来)

1-创建一个新的虚拟环境，方法是选择 Python 解释器并创建一个 `.\venv` 目录来存放它

```
python -m venv --system-site-packages .\venv
```

2-激活虚拟环境

```
.\venv\Scripts\activate
```

3-在不影响主机系统设置的情况下，在虚拟环境中安装软件包。首先升级 `pip`

```
pip install --upgrade pip

pip list  # show packages installed within the virtual environment
```

4-退出虚拟环境(不再使用TensorFlow时)

```
deactivate
```

### 4.3 Visual Studio的Miscrofoft Visual C++

下载页面：https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170

图示

![][2]

## 四 安装TensorFlow软件包

### 4.1 软件包选择

* `tensorflow`：支持 CPU 和 [GPU](https://www.tensorflow.org/install/gpu?hl=zh-cn) 的最新稳定版（适用于 Ubuntu 和 Windows）
* `tf-nightly`：预览 build（不稳定）。Ubuntu 和 Windows 均包含 [GPU 支持](https://www.tensorflow.org/install/gpu?hl=zh-cn)。
* `tensorflow==1.15`：TensorFlow 1.x 的最终版本。

### 4.2 虚拟环境TensorFlow安装 (.\venv)

```
pip install --upgrade tensorflow
```

图示 

![][3]

## 五 验证TensorFlow

### 5.1 验证TensorFlow

打开CMD终端，输入python，进入python开发环境

```
>>> import tensorflow as tf
>>> tf.add(1, 2).numpy()
3
>>> hello = tf.constant('Hello, TensorFlow!')
>>> hello.numpy()
b'Hello, TensorFlow!'
```

###  5.2 图示

![][4]

## 六 参考

* [TensorFlow-使用 pip 安装 TensorFlow](https://www.tensorflow.org/install/pip?hl=zh-cn)
* [Python官网—下载](https://www.python.org/downloads/windows/)
* [Github—tensorflow](https://www.python.org/downloads/windows/)





[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-1-python-39-download-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-1-tensorflow-visual-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-1-install-tensorflow-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-ai/tensor-1-tensorflow-test-4.png
