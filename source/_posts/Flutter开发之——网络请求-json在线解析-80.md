---
title: Flutter开发之——网络请求-json在线解析(80)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: fde84565
date: 2021-05-24 15:09:38
---
## 一 概述

* json数据手动解析是基本的技能，解析时注意字段数据类型和字段名称
* json在线解析：填入请求结果，和转换名称即可快速完成转换

<!--more-->

## 二 网络请求接口

### 2.1 网络接口

* URL：[wanandroid-首页文章列表](https://wanandroid.com/blog/show/2)：https://www.wanandroid.com/article/list/0/json
* 请求方法：GET

### 2.2 网络请求示例

```
  var httpClient = new HttpClient();
  var uri = Uri(
      scheme: 'https',
      host: 'www.wanandroid.com',
      path: 'article/list/0/json',
    );

  HttpClientRequest request = await httpClient.getUrl(uri);
  HttpClientResponse response = await request.close();
  String responseBody = await response.transform(utf8.decoder).join();
  print(responseBody);
```

## 三 在线解析

### 3.1 网站(可能需要翻墙)

网站地址：https://app.quicktype.io/

GitHub地址：https://github.com/quicktype/quicktype

### 3.2 解析过程

* 将返回的结果填入框中，并输入要转换为的类和转换前类型

  ![][1]
  
* 点击Options，选择转换为何种语言，并copy转换后的代码

  ![][2]

* 将转换后的文件copy到代码中

  ![][3]

## 四 将在线解析替换为手动解析并显示

### 4.1 将在线解析类替换为手动解析类

```
  Future<Article2> futureArticle2;

  @override
  void initState() {
    super.initState();
    futureArticle2=_httpGet2();
   } 
  //显示 
  FutureBuilder<Article2>(
          future: futureArticle2,
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
    Future<Article2> _httpGet2() async {
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
    var article2=Article2.fromJson(jsonDecode);
    print(article2);

    // var article = Article.formJson(jsonDecode);
    // print(article);
    // return article;

    return article2;
  }     
```

### 4.2 效果图
![][4]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-json-online-left-select.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-json-online-language.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-json-onlie-code.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-result-hand.png