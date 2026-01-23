---
title: Mac系统开发之——安装homebrew出错 Failed to connect to raw.githubusercontent.com port 443
categories:
  - 系统
  - Mac
tags:
  - homebrew
abbrlink: 60cc72f0
date: 2020-02-09 11:51:17
---
## 一 现象

Mac 装homebrew时，执行如下指令出现错误

```
/usr/bin/ruby -e "$(curl -fsSL https://cdn.jsdelivr.net/gh/Homebrew/install/master/install)"
```

![][1]

<!--more-->

## 二 解决办法

* 在浏览器中打开网页

  ```
  https://cdn.jsdelivr.net/gh/Homebrew/install/master/install
  ```

* 打开后如图所示
  ![][5]

* 在网页中右键保存(文件名为brew_install.rb，格式为页面源码)
  ![][6]

* 在brew_install.rb路径下，在终端执行以下命令

  ```
  ruby brew_install.rb
  ```

  ![][7]
* 出现如图所示，表示安装成功
 ![][8]

## 三 参考
* [安装homebrew报错curl: (7) Failed to connect to raw.githubusercontent.com port 443: Operation][10]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-commandlinetools-sdks.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-rm-old-commandline.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-select-install.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-install-webpage.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-install-save.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-ruby-install.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/homebrew-error-install-finish.png

[10]:https://www.jianshu.com/p/68efabd2e32b

