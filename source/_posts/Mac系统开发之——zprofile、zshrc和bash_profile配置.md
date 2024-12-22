---
title: Mac系统开发之——zprofile、zshrc和bash_profile配置
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: b577abb2
date: 2024-12-22 08:27:30
---
## 一 概述

 macOS 中，.zprofile、.zshrc 和 .bash_profile 是三个重要的配置文件，分别用于不同的 shell 和场景

<!--more-->


## 二 .zprofile

### 2.1 作用

* `.zprofile` 主要用于 Zsh shell 的全局配置。
* 它在每次用户登录时都会被读取。
* 通常用于设置环境变量、路径和其他全局配置。
* 适用于所有 Zsh shell 的启动过程。

### 2.2 新建或更新zsh配置文件

1-touch指令直接创建

* 打开terminal(终端)
* cd ~ (进入当前用户的home目录)
* open . (打开.zprofile文件)
* 如果打开文件失败，说明文件不存在，创建文件(touch .zprofile)

2-echo指令创建(homebrew)

```
echo >> /Users/xcz/.zprofile
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> /Users/xcz/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```

### 2.3 查看或编辑.zprofile配置文件(Finder)

依次打开：硬盘—>用户—>显示隐藏文件(shift+command+.)—>.zprofile文件

### 2.4 设置默认 shell 为 Zsh

```
chsh -s $(which zsh)
```

### 2.5 设置 PATH 环境变量

```
export PATH="/usr/local/bin:$PATH"
```

### 2.6 刷新配置，使之生效

```
source ~/.zshrc
```

## 三 .bash_profile

### 3.1 作用

* `.bash_profile` 是 Bash shell 的用户级配置文件。
* 它在每次用户登录时都会被读取。
* 通常用于设置环境变量、路径和其他全局配置。
* 适用于所有 Bash shell 的启动过程。

### 3.2  新建或更新.bash_profile配置文件(终端)

* 打开terminal(终端)
* cd ~ (进入当前用户的home目录)
* open .bash_profile (打开.bash_profile文件)
* 如果打开文件失败，说明文件不存在，创建文件(touch .bash_profile)

### 3.3 查看或编辑.bash_profile配置文件(Finder)

依次打开：硬盘—>用户—>显示隐藏文件(shift+command+.)—>.bash_profile文件

### 3.4 配置.bash_profile文件(以java为例)

```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk/Contents/Home
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH
```

### 3.5 刷新配置，使之生效

* 在terminal(终端)中输入source .bash_profile
* 检查配置文件是否生效(如：Java -version)


## 四 .bashrc

### 4.1 作用

* `.bashrc` 是 Bash shell 的用户级配置文件。
* 它在每次打开新的终端窗口或标签页时都会被读取。
* 通常用于设置个性化配置，如别名、函数等。

### 4.2 设置别名

```
alias ll='ls -al' alias la='ls -A'
```

### 4.3 设置默认提示符

```
export PS1="%n@%m %c %~ $ "
```

## 五 zshrc(不常用)

### 5.1 作用

* `.zshrc` 是 Zsh shell 的用户级配置文件。
* 它在每次打开新的终端窗口或标签页时都会被读取。
* 通常用于设置个性化配置，如别名、函数、主题等。

### 5.2 设置默认提示符

```
export PS1="%n@%m %c %~ $ " 
```

### 5.3 设置别名

```
alias ll='ls -al' alias la='ls -A'
```

### 5.4 加载插件

```
plugins=(git)
```

### 5.5 刷新配置

```
source /usr/local/share/oh-my-zsh/oh-my-zsh.sh
```


## 六 将.bash_profile环境变量添加到zsh shell

### 6.1 打开.zshrc文件

### 6.2 将.bash_profile添加到zsh

```
# 添加.bash_profile
cat ~/.bash_profile
```

### 6.3 刷新配置

```
source .zshrc
```

## 七 参考

* [知乎—bash添加到zsh](https://zhuanlan.zhihu.com/p/628952704)
* [博客园—Mac系统 .zprofile、.zshrc 和 .bash_profile 区别及作用](https://www.cnblogs.com/youhui/p/18402905)
* [博客园—zsh、bash以及.zprofile, .zshrc和.zshenv](https://www.cnblogs.com/oldmanzxl/p/18085387)
* [掘金.zprofile, .zshrc和.zshenv之间的区别](https://juejin.cn/post/7128574050406367269)
