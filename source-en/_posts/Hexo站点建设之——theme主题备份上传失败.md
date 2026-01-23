---
title: Hexo站点建设之——theme主题备份上传失败
categories:
  - 站点
  - Hexo博客
tags:
  - theme
abbrlink: fe5037b9
date: 2020-10-11 23:52:11
---
## 一 现象

Hexo升级时，theme主题上传到GitHub时，只有主题名，主题文件夹下并没有主题对应文件(主题文件备份失败)

![][1]
<!--more-->

## 二 原因

这是因为用到了 git 的子模块（git submodule）功能（你在你的 git 项目里 clone 的别人的项目）。

在你的主项目的 git 库里，子模块只是一个 HEAD 指针，指向子模块的 commit。

这个功能的意义： 

*  在这里，如果你需要修改 next 主题（可能需要很多文档），又想保证能够随时更新最新版本，其实用子模块功能是很方便的 
*  只需要 clone 下来新建一个 branch，用来自己用，每次官方更新 pull 到另一个分支，merge 一下就行。 
*  相当于把一个大项目分成多个小项目，尽可能减少项目之间的关联，方便调试和修改。 
*  这里我偷懒直接将子模块删除，将整个仓库进行备份了 

## 三 修改过程

### 3.1 themes目录下的文件结构

```
next-v7.1.1
next-v7.8.0
```

### 3.2 移除没有上传的next主题

```
git rm --cached themes/next-v7.8.0
```
![][2]

### 3.3  git status—查看移除主题后的状态

```
On branch hexo
Your branch is up-to-date with 'origin/hexo'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        deleted:    themes/next-v7.8.0

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        themes/next-v7.8.0/
```

###    3.4 git add themes/next-v7.8.0/ (重新提交主题文件夹next-v7.8.0)

### 3.5  git status —查看提交主题后的状态

```
On branch hexo
Your branch is up-to-date with 'origin/hexo'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        deleted:    themes/next-v7.8.0
        new file:   themes/next-v7.8.0/.editorconfig
        new file:   themes/next-v7.8.0/.eslintrc.json
        new file:   themes/next-v7.8.0/.gitattributes
        new file:   themes/next-v7.8.0/.github/CODE_OF_CONDUCT.md
        new file:   themes/next-v7.8.0/.github/CONTRIBUTING.md
        new file:   themes/next-v7.8.0/.github/ISSUE_TEMPLATE/bug-report.md
        new file:   themes/next-v7.8.0/.github/ISSUE_TEMPLATE/feature-request.md
        new file:   themes/next-v7.8.0/.github/ISSUE_TEMPLATE/other.md
        new file:   themes/next-v7.8.0/.github/ISSUE_TEMPLATE/question.md
```

### 3.6  git commit -m “备份next-v7.8.0主题” (提交)

### 3.7  git push origin hexo(推送到GitHub备份到hexo分支)
![][3]

## 四 参考

* [hexo 无法备份 theme 主题目录][11]
* [Hexo主题备份问题][12]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-github-theme-next-backup-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-cached-themes-remove.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/hexo-next-branch-backup-success.png



[11]:https://www.dazhuanlan.com/2019/08/18/5d58496a9da79/?__cf_chl_jschl_tk__=372bb05bb8e50001d1662fa2a190cd8dbc163678-1602429794-0-AcNTEfQQqJNwucpWTiskea87Bvhgc6IwD1AjQgH0-fFFV8YDaW4Vpux2DvJ357Sr0OQP-TavxXJaeCsVtvf-GqAI46N-mAyru4-3ua3dfgNH27IwlSSpYnz8AfVR9vyQUnnl33l-O5HIH-h7ykItGrYlfUppPqz08acJIlgPZqD4_4ZqVA5kFu8AXUVCIq_kEbjMyojsQNTGqtw5gSunUhAFUFHxsG1fX3BA1N5qQ_jzb8gt2IlnBqAyG13NsgA6uUHz-gqLfiHpFt2glTJ_v7ZQky96kE--unyCwznJn3Nb71KFL1B4IRP7pJuAaPuvrw
[12]:https://blog.csdn.net/weixin_40375601/article/details/99439860