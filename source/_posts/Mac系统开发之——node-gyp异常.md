---
title: Mac系统开发之——node-gyp异常
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: deeec0f2
date: 2020-03-31 22:26:13
---
## 一 现象

在执行`npm install`指令时出现了如下错误

![][1]
<!--more-->

## 二 错误信息

```
bogon:facility-content zxc$ npm install
⸨  ░░░░░░░░░░░░░░░░⸩ ⠏ fetchMetadata: sill pacote range manifest for kind-of@^4.0.0 fetched in 1ms

> fsevents@1.2.12 install /Users/zxc/Code/facility/facility-content/node_modules/fsevents
> node-gyp rebuild

No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error 
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:321:20)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
gyp ERR! System Darwin 19.4.0
gyp ERR! command "/usr/local/Cellar/node/13.8.0/bin/node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/zxc/Code/facility/facility-content/node_modules/fsevents
gyp ERR! node -v v13.8.0
gyp ERR! node-gyp -v v5.1.0
gyp ERR! not ok 
```

## 三 解决办法

1. 执行下面的指令

   ```
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   ```

2. 重新执行`npm install`

   ```
   npm install
   ```
3. 执行的过程
	![][2]

   

## 四 参考

* [在npm install时node-gyp出现错误][11]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-npm-install-gyp-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-npm-xcode-select.png

[11]:https://www.cnblogs.com/zhuxiaoxi/p/12088359.html