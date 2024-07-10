---
title: VsCode工具之——终端模式无法输入解决办法
abbrlink: 54572af5
date: 2021-03-19 09:50:36
categories:
  - 工具
  - VsCode
tags:
  - VsCode
---
## 一 现象
VSCode终端模式下无法输入，如下图
![][1]
<!--more-->

## 二 原因及解决办法

### 2.1 原因

VSCode设置了`以兼容模式运行这个程序`

### 2.2 解决办法

图标——>右键属性——>兼容性选项卡——>兼容模式——勾选去掉
![][2]

setting.json中配置

```
{
    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
    "files.associations": {
        ".ejs": "html"
    },
    "[dart]": {
        "editor.formatOnSave": true,
        "editor.formatOnType": true,
        "editor.rulers": [
            80
        ],
        "editor.selectionHighlight": false,
        "editor.suggest.snippetsPreventQuickSuggestions": false,
        "editor.suggestSelection": "first",
        "editor.tabCompletion": "onlySnippets",
        "editor.wordBasedSuggestions": false
    },
    "dart.debugExternalLibraries": true,
    "dart.debugSdkLibraries": false,
    "dart.previewLsp": true,
    "terminal.integrated.allowMnemonics": true,
    "terminal.integrated.cursorBlinking": true,
}
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vscode-error-terminal-not-show.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vscode-terminal-setting-compatible.png