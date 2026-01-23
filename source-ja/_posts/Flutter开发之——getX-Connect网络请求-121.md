---
title: Flutter开发之——getX-Connect网络请求(121)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: bfb268b4
date: 2022-05-09 21:36:36
---
## 一 概述

* GetX提供一种简便的网络请求方式：GetConnect
* 该请求方式支持：Rest API的GET/POST/PUT/DELETE/SOCKET及websocket通信
* 支持自定义配置：请求拦截，响应拦截，Authen认证等

<!--more-->

## 二 GetConnect快速入门

### 2.1 添加getX依赖

```
dependencies:
  get:
```

### 2.2 定义Provider继承GetConnect，并实现网络方法

```
class UserProvider extends GetConnect {
  //Get请求
  Future<Response> getUser(int id) => get('http://youapi/users/$id');
}
```

## 三 getConnect示例

### 3.1 Provider

#### BaseProvider基类(处理请求拦截及相应拦截)

```
class BaseProvider extends GetConnect {
  @override
  void onInit() {
    httpClient.baseUrl = SERVER_API_URL;

    // 请求拦截
    httpClient.addRequestModifier<void>((request) {
      request.headers['Authorization'] = '12345678';
      return request;
    });

    // 响应拦截
    httpClient.addResponseModifier((request, response) {
      return response;
    });
  }
}
```

说明：

* 此处定义Provider基类，处理请求拦截和相应拦截
* SERVER_API_URL为服务器host主机地址

#### HomeProvider(首页网络请求)

```
class HomeProvider extends BaseProvider {
  Future<Response> getArticle(int id) => get('/article/list/$id/json');
}
```

说明：

* get前面拼接了`httpClient.baseUrl`

### 3.2 网络请求(HomeController)

```
class HomeController extends GetxController with StateMixin<Article>{

  HomeProvider userProvider=Get.find();

  void getArticle() async {
    //刚开始显示加载中。。
    change(null,status: RxStatus.loading());
    //执行网络请求
    Response response= await userProvider.getArticle(0);
    //请求出错时
    if(response.hasError){
      change(null,status: RxStatus.error('Error'));
    }else{
      //请求成功时，显示数据
      Article article= Article.fromJson(response.body);
      change(article,status: RxStatus.success());
    }
  }
  @override
  void onInit() {
    super.onInit();
    //初始化时请求数据
    getArticle();
  }
}
```

说明：

* 此处使用了StateMixin，请求前显示加载中，根据请求情况显示成功和失败结果
* Article：为数据类(自定义解析，不在列出，请查看源码)
* onInit：在程序初始化时，执行getArticle方法，请求网络数据
* 使用change方法执行状态改变

### 3.3 数据显示

```
class HomeGetWidget extends GetView<HomeController>{
  @override
  Widget build(BuildContext context) {
    return _buildMixState();
  }
Widget _buildMixState(){
    return controller.obx(
              (data) => ListView.separated(
                itemCount: data!.data!.datas.length,
                separatorBuilder: (context, index) {return Divider(height: 10, color: Colors.grey,);},
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    children: [
                      Text(data.data!.datas[index].author),
                      Text(data.data!.datas[index].title),
                      Text(data.data!.datas[index].niceShareDate)
                    ],
                  );
                },
              ),
          //onLoading: const CupertinoActivityIndicator(radius: 10), //加载中，默认是个Center(child:CircularProgressIndicator())
          onEmpty: const Text('No data found'), //空数据显示
          onError: (error) => Text(error!), //出错界面显示
        );
  }
}
```

说明：

* 通过GetView绑定Controller后，可以方便获取到controller
* 通过controller.obx设置数据改变

### 3.4 效果图

| 加载中 |  成功  |  失败  |
| :----: | :----: | :----: |
| ![][1] | ![][2] | ![][3] |

## 四 参考

* [Github-getX-GetConnect官方文档](https://github.com/jonataslaw/getx#getconnect)
* [CSDN-参考示例](https://download.csdn.net/download/Calvin_zhou/85331781)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-connect-10-loading.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-connect-10-success.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-connect-10-error.png