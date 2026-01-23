---
title: Flutter开发之——json序列化(82)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e7f966b8
date: 2021-05-25 15:45:06
---
## 一 概述

* 添加json_serializeble开发依赖
* 根据json创建序列化类
* 序列化后类的应用

<!--more-->

## 二 添加json_serializeble开发依赖

### 2.1 确认Dart SDK版本(pubspec.yaml)

```
environment:
  sdk: '>=2.12.0 <3.0.0'
```

### 2.2  json_serializable依赖(pubspec.yaml)

```
dependencies:
  json_annotation: ^4.0.1   #json_annotation版本
  
dev_dependencies:
  build_runner: ^2.0.3      #build_runner版本
  json_serializable: ^4.1.2 #json_serializable版本
```

## 三 根据json创建序列化类

### 3.1 接口文件

* API：https://www.wanandroid.com/article/list/0/json

### 3.2 序列化类(Article.dart)

```
import 'package:json_annotation/json_annotation.dart';
part 'Article.g.dart';

@JsonSerializable()
class Article {
  int errorCode;
  String errorMsg;
  ArticleData data;
  Article(this.errorCode, this.errorMsg, this.data);

  factory Article.fromJson(Map<String, dynamic> json) => _$ArticleFromJson(json);
  Map<String, dynamic> toJson() => _$ArticleToJson(this);

}

@JsonSerializable()
class ArticleData {
  int curPage;
  int offset;
  bool over;
  int pageCount;
  int size;
  int total;
  List<Person> datas;

  ArticleData(this.curPage, this.offset, this.over, this.pageCount, this.size, this.total, this.datas);

  factory ArticleData.fromJson(Map<String, dynamic> json) => _$ArticleDataFromJson(json);
  Map<String, dynamic> toJson() => _$ArticleDataToJson(this);

}

@JsonSerializable()
class Person {
  String apkLink;
  int audit;
  String author;
  bool canEdit;
  int chapterId;
  String chapterName;
  bool collect;
  int courseId;
  String desc;
  String descMd;
  String envelopePic;
  bool fresh;
  String host;
  int id;
  String link;
  String niceDate;
  String niceShareDate;
  String origin;
  String prefix;
  String projectLink;
  int publishTime;
  int realSuperChapterId;
  int selfVisible;
  int shareDate;
  String shareUser;
  int superChapterId;
  String superChapterName;
  List<Tag> tags;
  String title;
  int type;
  int userId;
  int visible;
  int zan;

  Person(
      this.apkLink,
      this.audit,
      this.author,
      this.canEdit,
      this.chapterId,
      this.chapterName,
      this.collect,
      this.courseId,
      this.desc,
      this.descMd,
      this.envelopePic,
      this.fresh,
      this.host,
      this.id,
      this.link,
      this.niceDate,
      this.niceShareDate,
      this.origin,
      this.prefix,
      this.projectLink,
      this.publishTime,
      this.realSuperChapterId,
      this.selfVisible,
      this.shareDate,
      this.shareUser,
      this.superChapterId,
      this.superChapterName,
      this.tags,
      this.title,
      this.type,
      this.userId,
      this.visible,
      this.zan);

  factory Person.fromJson(Map<String, dynamic> json) => _$PersonFromJson(json);
  Map<String, dynamic> toJson() => _$PersonToJson(this);

}

@JsonSerializable()
class Tag {
  String name;
  String url;

  Tag(this.name, this.url);
  factory Tag.fromJson(Map<String, dynamic> json) => _$TagFromJson(json);
  Map<String, dynamic> toJson() => _$TagToJson(this);

}
```

注意：

* 添加`part 'Article.g.dart';`其中：Article是dart文件名，`文件名+g.dart`格式
* 在每个需要序列化的类前面添加`@JsonSerializable()`，如类：`Article`，`ArticleData`，`Person`，`Tag`
* 每个类里面有：变量，构造函数，`类名.fromJson() => _$类名FromJson(json)`，`toJson() => _$类名ToJson(this)`

### 3.3  生成`序列化类.g.dart文件`

执行如下指令

```
flutter pub run build_runner build
```

如无错误发生，生成`Article.g.dart`文件，Article.dart文件中_$类名FromJson(json)等不会再出现错误

## 四 序列化后类的应用

### 4.1 代码

```
 late Future<Article> futureArticle;
 
  @override
  void initState() {
    super.initState();
     futureArticle=_httpGet2();
  }
  
  Future<Article> _httpGet2() async {
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

    var article =Article.fromJson(jsonDecode);
    print(article);
    return article;
  }
  //显示
  FutureBuilder<Article>(
          future: futureArticle,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.separated(
                itemCount: snapshot.data!.data.datas.length,
                separatorBuilder: (context, index) {return Divider(height: 10, color: Colors.grey,);},
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    children: [
                      Text("${snapshot.data!.data.datas[index].author}"),
                      Text("${snapshot.data!.data.datas[index].title}"),
                      Text("${snapshot.data!.data.datas[index].niceShareDate}")
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
```

### 4.2 效果图

![][1]


## 五 参考
* [JSON and serialization](https://flutter.dev/docs/development/data-and-backend/json)
* [Fetch data from the internet](https://flutter.dev/docs/cookbook/networking/fetch-data)

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-result-hand.png