---
title: OpenCV开发之——将图片转化为Base64字符串
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: 9ba24520
date: 2021-07-16 16:51:25
---

## 一 概述

* OpenCV将识别到的图片先行保存到本地
* 将本地图片上传时，转化为Base64字符串，效果更好
* 图片上传，服务器先要接收，然后再进行处理，耗时更多

<!--more-->

## 二 将图片转换为Base64工具类

### 2.1 依赖Base64

```
Android\SDK\sources\android-28\android\util\Base64.java
```

在java项目上测试时，直接copy出来使用

### 2.2 图片
![][1]


### 2.3 工具类(Base64Img2String)

```
import java.io.File;
import java.io.FileInputStream;


public class Base64Img2String {

    public static String encodeFile(String filePath) {
        String imgStr = "";
        try {
            File imageFile = new File(filePath);
            if (!imageFile.exists())
                return imgStr;
            byte[] bytes = new byte[(int) imageFile.length()];
            FileInputStream fileInputStream = new FileInputStream(imageFile);
            fileInputStream.read(bytes);
            imgStr = Base64.encodeToString(bytes, Base64.DEFAULT);
            //imgStr = "data:image/*;charset=utf-8;base64," + imgStr;
        } catch (Exception e) {
            return imgStr;
        }
        return imgStr;
    }
}
```

### 2.4 测试输出

**代码**

```
public class Main {

    public static void main(String[] args) {

        File file = new File("D:\\Code\\JavaCode\\Image2String\\images\\cat.jpg");
        String image2String = Base64Img2String.encodeFile(file.getAbsolutePath());
        System.out.print(image2String);

    }
}
```

**输出结果**
![][2]

**输出结果处理**

* 输出结果换行了，将结果copy到文档中，将换行符去除

### 2.5 反向验证([BASE64转图片](https://tool.jisuapi.com/base642pic.html))

将结果copy到输入框中，点击转图片，查看图片能否正确显示

![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-base64-image.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-base64-image-string.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/opencv-base64-2-image.png