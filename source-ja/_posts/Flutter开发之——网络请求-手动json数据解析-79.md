---
title: Flutter开发之——网络请求-手动json数据解析(79)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 6c753045
date: 2021-05-24 14:00:33
---
## 一 概述

* 网络请求结果json手动解析
* 解析结果的包装
* 包装数据的显示

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

## 三 网络请求结果json手动解析

### 3.1 处理前(String类型)

#### 数据类型(String类型)

![][1]

#### 数据结构
![][2]
### 数据结构分层

* 第一层：errorMsg(String)，errorCode(int),data(数据类)
* 第二层(data)：curPage(int)，offset(int)，over(bool)，pageCount(int)，size(int)，datas(数据集合类)
* 第三层(data/datas)：apkLink(String)，audit(int)，author(String)，canEdit(bool)，chapterId(int)，chapterName(String)，collect(bool)，courseId(int)，desc(String)，descMd(String)，envelopePic(String)，fresh(bool)，host(String)，id(int)，link(String)，niceDate(String)，niceShareDate(String)，origin(String)，prefix(String)，projectLink(String)，publishTime(int),realSuperChapterId(int),selfVisible(int)，shareDate(int)，shareUser(String)，superChapterId(int)，superChapterName(String)，tags(数据集合类),title(String)，type(int)，userId(int)，visible(int),zan(int)
* 第4层(data/datas/tags)

### 3.2 将String类型转换为Json类型(Map)

#### 调用函数(String类型—>Json)

```
var jsonDecode = json.decode(responseBody);
```

![][3]

### 3.3 Json类型转换为数据类(Article-第一层)

#### 数据类(data设置为Object)

```
class Article {
  int errorCode;
  String errorMsg;
  Object data;
  Article(this.errorCode, this.errorMsg, this.data);
  Article.formJson(Map<String, dynamic> json) {
    Article(
        errorCode=  json['errorCode'],
        errorMsg = json['errorMsg'],
        data = json['data']
        );
  }
}
```

#### 转换后
![][4]

### 3.4 将Json彻底转换为数据类

#### 数据类

```
class Article {
  int errorCode;
  String errorMsg;
  ArticleData data;
  Article(this.errorCode, this.errorMsg, this.data);

  Article.formJson(Map<String, dynamic> json) {
    Article(
        errorCode=  json['errorCode'],
        errorMsg = json['errorMsg'],
        data = ArticleData.fromJson(json['data'])
        );
  }
}

class ArticleData {
  int curPage;
  int offset;
  bool over;
  int pageCount;
  int size;
  int total;
  List<Person> datas;

  ArticleData(this.curPage, this.offset, this.over, this.pageCount, this.size,
      this.total, this.datas);

  ArticleData.fromJson(Map<String, dynamic> json) {
    var personList = List<Person>();
    for (Map<String, dynamic> map in json['datas']) {
      personList.add(Person.fromJson(map));
    }

    ArticleData(
        curPage = json['curPage'],
        offset = json['curPage'],
        over = json['over'],
        pageCount = json['pageCount'],
        size = json['size'],
        total = json['total'],
        datas = personList);
  }
}

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

  Person.fromJson(Map<String, dynamic> json) {
    var tagList = List<Tag>();
    for (Map<String, dynamic> map in json['tags']) {
      tagList.add(Tag.fromJson(map));
    }
    Person(
        apkLink = json['apkLink'],
        audit = json['audit'],
        author = json['author'],
        canEdit = json['canEdit'],
        chapterId = json['chapterId'],
        chapterName = json['chapterName'],
        collect = json['collect'],
        courseId = json['courseId'],
        desc = json['desc'],
        descMd = json['descMd'],
        envelopePic = json['envelopePic'],
        fresh = json['fresh'],
        host = json['host'],
        id = json['id'],
        link = json['link'],
        niceDate = json['niceDate'],
        niceShareDate = json['niceShareDate'],
        origin = json['origin'],
        prefix = json['prefix'],
        projectLink = json['projectLink'],
        publishTime = json['publishTime'],
        realSuperChapterId = json['realSuperChapterId'],
        selfVisible = json['selfVisible'],
        shareDate = json['shareDate'],
        shareUser = json['shareUser'],
        superChapterId = json['superChapterId'],
        superChapterName = json['superChapterName'],
        tags = tagList,
        title = json['title'],
        type = json['type'],
        userId = json['userId'],
        visible = json['visible'],
        zan = json['zan']);
  }
}

class Tag {
  String name;
  String url;

  Tag(this.name, this.url);

  Tag.fromJson(Map<String, dynamic> json) {
    Tag(name = json['name'], url = json['url']);
  }
}
```

#### 解析后效果图
![][5]

## 四 解析结果的包装

### 4.1  不返回结果的请求

```
  void _httpGet2() async {
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
    var article = Article.formJson(jsonDecode);
    print(article);
  }
```

### 4.2 返回Article的请求(因为async，自动添加为Future\<Article>)

```
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
    var article = Article.formJson(jsonDecode);
    print(article);
    return article;
  }
```

### 4.3 赋值

```
Future<Article> futureArticle; //声明变量
  @override
  void initState() {
    super.initState();
    futureArticle=_httpGet2(); //请求结果赋值
 }
```

## 五 包装数据的显示

### 5.1 说明

展示网络请求后的数据使用FutureBuilder

future：请求后返回的数据

builder：根据请求的结构，显示页面状态(请求中，请求失败，请求成功)

```
FutureBuilder<T>(
  future: futureAlbum,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data!.title);
    } else if (snapshot.hasError) {
      return Text("${snapshot.error}");
    }
    return CircularProgressIndicator();
  },
)
```

### 5.2 代码

```
FutureBuilder<Article>(
          future: futureArticle,
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
```

### 5.3 效果图
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-resopnse-string.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-struct.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-string-json.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-article-1.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-article-2.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-request-response-result-hand.png