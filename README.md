# Github个人博客

本博客使用hexo+github搭建

## 一 下面是搭建的过程

### 1.1 准备工作
 - 申请一个github账号
 - 安装了node.js、npm，并了解相关基础知识
 - 安装了git for windows（或者其它git客户端）

### 1.2 创建Github仓库

新建一个名为你的用户名.github.io的仓库

### 1.3 配置SSH key并添加到Github

	ssh-keygen -t rsa -C "邮件地址"

### 1.4 配置全局变量

	$ git config --global user.name "username"// 你的github用户名，非昵称
	$ git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱

### 1.4 安装hexo

	$ npm install -g hexo

### 1.6 新建本地仓库，并初始化

	$ cd /d/Code/hexo/
	$ hexo init

### 1.7 安装并修改主题

	$ cd /d/Code/hexo/
	$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia

### 1.8 测试没问题上传Github

	$ hexo g # 生成
	$ hexo s # 启动服务
	$ hexo d #提交
### 1.9 博客的备份及还原请见个人博客

## 二 github图床加速

### 2.1 jsdelivr

```
格式
https://cdn.jsdelivr.net/gh/{user}/{repo}/{folderpath}/{filename}
示例
https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-xmind.png
```

### 2.2 onmicrosoft

```
示例
https://jsd.onmicrosoft.cn/gh/PGzxc/CDN/blog-hmos/harmonyos-lesson1-xmind.png
```

### 2.3 githubusercontent(默认-不加速)

```
https://raw.githubusercontent.com/{user}/{repo}/master/{folderpath}/{filename}
```

