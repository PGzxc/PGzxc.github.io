---
title: Flutter开发之——网络请求-JsonToDart插件解析(81)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: f1be6ba3
date: 2021-05-24 16:45:08
---
## 一 概述

* JsonToDart是一个IDE插件，可以快速将Json转换为Dart数据类
* 插件安装完成后，通过File—>New —>JsonToDart，填入Json字符串即可完成Dart转换

<!--more-->

## 二 JsonToDart插件

### 2.1 IDE插件安装

* 依次点击：File—>Settings—>Plugins，搜索 **JsonToDart**

  ![][1]

### 2.2 JsonToDart的使用

* 在创建文件的位置，右键：New—>JsonToDart

  ![][2]

* 将Json结果填入文本框中，输入类名，点击Generate生成此类

  ![][3]

## 三 旧类替换并显示

### 3.1 代码

```
  Future<Article3> futureArticle3;

  @override
  void initState() {
    super.initState();
    futureArticle3=_httpGet2();
   } 
  //显示 
  FutureBuilder<Article3>(
          future: futureArticle3,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.separated(
                itemCount: snapshot.data.data.datas.length,
                separatorBuilder: (context, index) {return Divider(height: 10, color: Colors.grey,);},
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    children: [
                      Text("${snapshot.data.data.datas[index].author}"),
                      Text("${snapshot.data.data.datas[index].title}"),
                      Text("${snapshot.data.data.datas[index].niceShareDate}")
                    ],
                  );
                },
              );
            } else if (snapshot.hasError) {
              return Text("${snapshot.error}");
            }
            return CircularProgressIndicator();
          },
        )
    
    //网络请求
    Future<Article3> _httpGet2() async {
    var httpClient = new HttpClient();
    var uri = Uri(
      scheme: 'https',
      host: 'www.wanandroid.com',
      path: 'article/list/0/json',
    );

    HttpClientRequest request = await httpClient.getUrl(uri);
    HttpClientResponse response = await request.close();
    String responseBody = await response.transform(utf8.decoder).join();
    var jsonDecode = json.decode(responseBody);
    var article3=Article3.fromJson(jsonDecode);
    print(article3);
    return article3;
  }     
```

### 3.2 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-json-jsontodart-plugin-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-json-json2dart-new.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-json-json2dart-generate.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-result-hand.png
