---
title: Jenkins开发之——Android项目每次编译版本号增加1
categories:
  - 开发
  - L-自动化
  - Jenkins
tags:
  - Jenkins
abbrlink: 20fdf19b
date: 2020-12-16 17:42:52
---
## 一 思路

* 获取Android版本配置文件
* 遍历文件获取版本号`versionCode`或者版本名`versionName`
* 编译前将版本号增加一(版本名的修改类似)
* 执行`assembleRelease`打包执行，重新打包

<!--more-->

## 二 修改代码

### 2.1 config.gradle中配置

```
  versionCode              : 12,
  versionName              : "1.4",
```

### 2.2 代码文件

```
task modifyVersionCode {
    File file = new File(projectDir.getParent(), '/setting/config.gradle')
    RandomAccessFile raf = null
    try {
        raf = new RandomAccessFile(file, "rw")
        String line = null
        long lastPoint = 0 //记住上一次的偏移量
        while ((line = raf.readLine()) != null) {
            final long point = raf.getFilePointer()
            if (line.contains("versionCode")) {
                String line2 = line.replaceAll(Pattern.compile("\\s*|\t|\r|\n"), "")
                String version = line2.substring(line2.indexOf(':') + 1, line2.indexOf(','))
                String lineNew = line.replace(version, (version.toInteger() + 1) + "")
                raf.seek(lastPoint)
                raf.writeBytes(lineNew)
            }
            lastPoint = point
        }
    } catch (Exception e) {
        e.printStackTrace()
    } finally {
        try {
            raf.close()
        } catch (IOException e) {
            e.printStackTrace()
        }
    }
    return true
}
preBuild.dependsOn modifyVersionCode
```

### 2.2 代码说明

* 文件边读编写使用`RandomAccessFile`来操作
* `/setting/config.gradle`是项目根目录下的配置文件
* 当遍历到`versionCode`行时，将空格去除后，找到`versionCode`后的版本号，并将版本号+1，重新写到文件中
* 其他行的内容保持不变

## 三 效果图

![][1]

## 四 参考

*  [java修改文件内容](https://www.cnblogs.com/wangjinyu/p/10803596.html)

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-jenkins/jenkins-modify-version-animal.gif