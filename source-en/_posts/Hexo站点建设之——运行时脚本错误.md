---
title: Hexo站点建设之——运行时脚本错误
categories:
  - 站点
  - Hexo博客
tags:
  - Hexo博客
abbrlink: 69a17152
date: 2021-09-08 15:35:39
---
## 一 问题

```
PS D:\Files\blog\blog-github> hexo g
hexo : 无法加载文件 C:\Users\Admin\AppData\Roaming\npm\hexo.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ hexo g
+ ~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
<!--more-->

## 二 现象

![][1]

## 三 原因[https:/go.microsoft.com/fwlink/][00]

### 3.1 脚本被禁止执行

PowerShell 执行策略是一项安全功能，用于控制 PowerShell 加载配置文件和运行脚本的条件。 此功能有助于防止恶意脚本的执行

### 3.2 PowerShell 执行策略

* AllSigned
* Bypass
* Default
* RemoteSigned
* Restricted
* Undefined
* Unrestricted

## 四 解决办法(修改PowerShell 管理执行策略)

### 4.1 打开PowerShell
![][2]

### 4.2 查看PowerShell策略

在PowerShell窗口中输入如下指令

```
Get-ExecutionPolicy -List
```

查看输出结果

```
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine       Undefined
```

结果图
![][3]

### 4.3 更改执行策略

在PowerShell窗口中执行如下的执行策略指令

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

在弹出的执行策略更改中，输入A(全是)
![][4]
再次执行`Get-ExecutionPolicy -List`查看是否修改完成
![][5]

### 4.4 重新执行Hexo指令(正常执行)

![][6]


[00]:https:/go.microsoft.com/fwlink/
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-run-error-priview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-run-error-powershell-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-run-error-powershell-policy-list.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-run-error-powershell-policy-remotedsigned.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-run-error-powershell-localMachine-change.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hexo/hexo-run-error-modify-run.png