# Github个人博客

本博客使用hexo+github搭建

## 下面是搭建的过程

### 准备工作
 - 申请一个github账号
 - 安装了node.js、npm，并了解相关基础知识
 - 安装了git for windows（或者其它git客户端）
 
### 创建Github仓库

新建一个名为你的用户名.github.io的仓库

### 配置SSH key并添加到Github
	
	ssh-keygen -t rsa -C "邮件地址"

### 配置全局变量

	$ git config --global user.name "username"// 你的github用户名，非昵称
	$ git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱

### 安装hexo

	$ npm install -g hexo

### 新建本地仓库，并初始化

	$ cd /d/Code/hexo/
	$ hexo init

### 安装并修改主题

	$ cd /d/Code/hexo/
	$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia

### 测试没问题上传Github

	$ hexo g # 生成
	$ hexo s # 启动服务
    $ hexo d #提交