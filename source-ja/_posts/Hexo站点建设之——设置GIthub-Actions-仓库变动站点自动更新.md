---
title: Hexo站点建设之——设置GIthub Actions 仓库变动站点自动更新
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: b039871f
date: 2020-11-12 23:44:11
---
## 一 背景

之前写过一篇文章[Hexo站点建设之——Github绑定Netlify改动代码后自动部署](posts/e9afa1d2.html),介绍了将GitHub仓库绑定Netlify后，每次更新文章，Netlify检测到仓库代码变动，重新编译生成发布站点

* 优点：每次将写好的文章更新到GitHub后，Netlify编译源码重新发布站点
* 缺点：Netlify编译生成发布站点的时间过长(30分钟左右)；站点访问的速度较慢(与GitHub+Coding相比)

<!--more-->

## 二 Hexo更新文章的一般过程

* hexo new "文章标题"：新生成的文章位于source/_posts目录下，找到文章后编写文章内容
* hexo generate：将MarkDown文件转换为HTML文件
* hexo service：检查本地预览(浏览器输入http://localhost:4000 )
* hexo deploy：把public文件夹下的文件推送到Github和Coding仓库分支(hexo)
* 使用git命令将源码备份到GitHub分支(master)

  - git add .
  - git commit -m "修改说明"
  - git push origin master

## 三 GitHub Actions入门

### 3.1 基本概念

*  **workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow 
*  **job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务 
*  **tep**（步骤）：每个 job 由多个 step 构成，一步步完成 
*  **action** （动作）：每个 step 可以依次执行一个或多个命令（action） 

### 3.2 workflow 文件

 GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows`目录。 

*  `name`字段是 workflow 的名称 

  ```
  name: GitHub Actions Demo
  ```

*  `on`字段指定触发 workflow 的条件，通常是某些事件 

  ```
  on:
    push:
      branches:    
        - master
  ```

   上面代码指定，只有`master`分支发生`push`事件时，才会触发 workflow 

*  `jobs`字段，表示要执行的一项或多项任务 

  ```
  obs:
    my-job:
      name: My Job
      runs-on: ubuntu-latest
      steps:
      - name: Print a greeting
        env:
          MY_VAR: Hi there! My name is
          FIRST_NAME: Mona
          MIDDLE_NAME: The
          LAST_NAME: Octocat
        run: |
          echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME
  ```

   `needs`字段指定当前任务的依赖关系，即运行顺序 

   `runs-on`字段指定运行所需要的虚拟机环境 

   `steps`字段指定每个 Job 的运行步骤，可以包含一个或多个步骤 


### 3.3 GitHub Actions 站点更新原理

* 在项目根目录下新建.github/workflows文件夹，并添加一个action.yml文件
* 打开action.yml文件，编写工作流workflow(监控分支，何时执行，配置，执行)
* 当GitHub源码发生改变，触发Action执行，自动部署站点

## 三 准备工作

### 3.1 Github pages项目

仓库名称为：用户名.github.io，且仓库下有2个分支

* master分支：项目源码
* hexo分支：源码执行hexo generate后渲染markdown文件生成的public文件夹下内容

### 3.2 将GitHub关联和授权的Netlify取消

进入Github后依次点击：个人资料(右上角)——>Settings(设置)——>Applications(左侧)，将Applications下的

* Installed Github Apps
* Authorized Github Apps
* Authorized OAuth Apps

关联的Netlify取消授权，否则提交代码后会执行Netlify编译更新

### 3.3 Access Token

#### 3.3.1   创建 GitHub Access Token

* 进入Github后依次点击：个人资料(右上角)——>Settings(设置)——>Developer settings(左侧)——> 单击 **Personal access tokens（个人访问令牌）**——> 单击 **Generate new token（生成新令牌）** ——>填写令牌名称和令牌权限
*  Personal Access Token 的生成教程见 [Creating a personal access token](https://docs.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token) 

#### 3.3.2 创建Coding Access Token

* 进入Coding后依次点击：个人资料(右上角)——>个人账户设置——>访问令牌——>新建令牌——>填写令牌名和权限
* 个人访问令牌的创建教程见：[个人访问令牌](https://help.coding.net/docs/member/tokens.html#%E5%88%9B%E5%BB%BA%E4%B8%AA%E4%BA%BA%E8%AE%BF%E9%97%AE%E4%BB%A4%E7%89%8C)

### 3.4 设置Pages仓库Secrets

* 依次点击：用户名.github.io仓库——>Settings——>Secrets，将GitHub和Coding Access Token添加进来

  ![][1]

### 3.5 编写workflow 脚本

在项目根目录下新建.github/workflows/action.yml文件，并编写任务执行脚本

#### 3.5.1 action.yml脚本

```
name: Hexo Auto-Deploy
on:
  push:
    branches: 
      - master

jobs:
  build:
    name: Hexo Auto-Deploy by GitHub Actions
    runs-on: ubuntu-latest

    steps:
    - name: 1. git checkout...
      uses: actions/checkout@v1
      
    - name: 2. setup nodejs...
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'

    - name: 3. Cache node modules
      uses: actions/cache@v1
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

    - name: 4. Install hexo dependencies 
      run: |
        npm install hexo-cli -g
        npm install
        
    - name: 5. hexo generate public files...
      run: |
        hexo clean
        hexo generate  

    - name: 6. hexo deploy ...
      env: 
        # Github 仓库
        GITHUB_REPO: github.com/用户名/用户名.github.io.git
        # Coding 仓库
        CODING_REPO: e.coding.net/用户名/文件夹/仓库名.git
      # 将编译后的博客文件推送到指定仓库
      run: |
        cd ./public && git init && git add .
        git config user.name "用户名"
        git config user.email "注册邮箱"
        git add .
        git commit -m "GitHub Actions Auto Builder at $(date +'%Y-%m-%d %H:%M:%S')"
        git push --force --quiet "https://${{ secrets.ACCESS_TOKEN }}@$GITHUB_REPO" master:hexo
        git push --force --quiet "https://Coding令牌名:${{ secrets.CODING_TOKEN }}@$CODING_REPO" master:hexo
```

#### 3.5.2 脚本修改说明

##### 触发条件

```
on:
  push:
    branches: 
      - master
```

当master检测到文件变动时，执行脚本

##### env

env: GitHub和Coding仓库(https模式下)

##### run

* secrets.ACCESS_TOKEN：Access Token中设置的GitHub Access Token
* secrets.CODING_TOKEN ：Access Token中设置的Coding Access Token
* master:hexo：推送到hexo分支

## 四 部署

将修改后的源码推送到master分支，当文章添加或修改后，GitHub Actions就会自动帮我们部署项目到GitHub pages和Coding pages

![][2]

测试后发现提交代码到Github后，经过3分钟左右就可以查看新增或修改过的文章了




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-github-action-secrets-tokens.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-github-action-all-workflows.png