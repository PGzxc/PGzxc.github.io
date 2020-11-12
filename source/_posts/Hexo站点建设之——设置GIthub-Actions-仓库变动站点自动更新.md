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

之前写过一篇文章[Hexo站点建设之——Github绑定Netlify改动代码后自动部署](Hexo站点建设之——Github绑定Netlify改动代码后自动部署.md),介绍了将GitHub仓库绑定Netlify后，每次更新文章，Netlify检测到仓库代码变动，重新编译生成发布站点

* 优点：每次将写好的文章更新到GitHub后，Netlify编译源码重新发布站点
* 缺点：Netlify编译生成发布站点的时间过长(30分钟左右)；站点访问的速度较慢(与GitHub+Coding相比)

<!--more-->

## 二 GitHub Actions

### 2.1 之前更新文章的过程

* hexo new "文章标题"：新生成的文章位于source/_posts目录下，找到文章后编写文章内容
* hexo generate：将MarkDown文件转换为HTML文件
* hexo service：检查本地预览(浏览器输入http://localhost:4000 )
* hexo deploy：把public文件夹下的文件推送到Github和Coding仓库分支(hexo)
* 使用git命令将源码备份到GitHub分支(master)
  - git add .
  - git commit -m "修改说明"
  - git push origin master

### 2.2  GitHub Action入门

#### 2.2.1 基本概念

*  **workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow 
*  **job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务 
*  **tep**（步骤）：每个 job 由多个 step 构成，一步步完成 
*  **action** （动作）：每个 step 可以依次执行一个或多个命令（action） 

#### 2.2.2 workflow 文件

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


### 2.3 GitHub Actions 站点更新原理

* 在项目根目录下新建.github/workflows文件夹，并添加一个action.yml文件
* 打开action.yml文件，编写工作流workflow(监控分支，何时执行，配置，执行)
* 当GitHub源码发生改变，触发Action执行，自动部署站点