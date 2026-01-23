---
title: IOS开发之——工具-Homebrew长时间停在Updating Homebrew
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: e5abee2d
date: 2021-01-14 17:29:00
---
## 一 现象

在国内的网络环境下使用 Homebrew 安装软件的过程中可能会长时间卡在 Updating Homebrew 这个步骤。

例：执行 brew install cocoapods命令

![][1]

<!--more-->

## 二 解决办法

### 2.1 方法一(关闭自动更新)

打开~/.bash_profile文件，添加下面的语句

```
#Homebrew自动更新-关闭
export HOMEBREW_NO_AUTO_UPDATE=true
```

### 2.2 方法二(替换brew源)

平时我们执行 brew 命令安装软件的时候，跟以下 3 个仓库地址有关：

* brew.git
* homebrew-core.git
* homebrew-bottles

通过以下操作将这 3 个仓库地址全部替换为 Alibaba 提供的地址

#### 2.2.1 替换 / 还原 brew.git 仓库地址

##### 替换成阿里巴巴的 brew.git 仓库地址

```
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```

##### 还原为官方提供的 brew.git 仓库地址

```
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
```

#### 2.2.2 替换 / 还原 homebrew-core.git 仓库地址

##### 替换成阿里巴巴的 homebrew-core.git 仓库地址:

```
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```

##### 还原为官方提供的 homebrew-core.git 仓库地址

```
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

#### 2.2.3 替换 / 还原 homebrew-bottles 访问地址

这个步骤跟你的 macOS 系统使用的 shell 版本有关系

所以，先来查看当前使用的 shell 版本

```
echo $SHELL
```

如果你的输出结果是 /bin/zsh，参考?的 zsh 终端操作方式
如果你的输出结果是 /bin/bash，参考?的 bash 终端操作方式

##### 2.2.3.1 zsh 终端操作方式

###### 替换成阿里巴巴的 homebrew-bottles 访问地址

```
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

###### 还原为官方提供的 homebrew-bottles 访问地址

```
vi ~/.zshrc
#然后，删除 HOMEBREW_BOTTLE_DOMAIN 这一行配置
source ~/.zshrc
```

##### 2.2.3.2 bash 终端操作方式
###### 替换 homebrew-bottles 访问 URL:

```
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

###### 还原为官方提供的 homebrew-bottles 访问地址

```
vi ~/.bash_profile
# 然后，删除 HOMEBREW_BOTTLE_DOMAIN 这一行配置
source ~/.bash_profile
```

## 三 参考

* [homebrew长时间停在Updating Homebrew 这个步骤](https://www.cnblogs.com/tulintao/p/11134877.html)
* [Mac 解决brew一直卡在Updating Homebrew](https://www.jianshu.com/p/7cb05a2b39a5)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-brew-updating-homebrew-waiting.png

