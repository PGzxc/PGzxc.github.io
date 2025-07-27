---
title: Flutter开发之——getX-用户登陆示例(116)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 4be71d32
date: 2022-05-04 22:40:59
---
## 一 用户登陆界面展示

| 没有勾选同意 | 用户名错误 | 密码错误 | 成功去登陆 |
| :----------: | :--------: | :------: | :--------: |
|    ![][1]    |   ![][2]   |  ![][3]  |   ![][4]   |

<!--more-->

## 二 项目结构说明

### 2.1 项目由来

* 最近学习了getX的相关知识点，getX可以简化项目书写和项目解藕(逻辑和界面展示分离)
* 看到[CSDN-Flutter-登录界面实战](https://blog.csdn.net/mrRuby/article/details/122366726)，作为getX练手

### 2.2 项目结构

![][5]

说明：

* Login：登陆界面，只负责与用户交互的界面内容展示
* LoginController：逻辑控制文件，负责处理，登陆按钮点击和隐私协议勾选

## 三 项目示例说明

### 3.1 LoginController(逻辑文件)

```
class LoginController extends GetxController {
  //登陆按钮点击事件
  login(TextEditingController userNameController, TextEditingController passWordController) {
    var userName = userNameController.text;
    var passWord = passWordController.text;

    //1-用户协议是否勾选
    if(!isChecked.value){
      Get.snackbar('用户协议未选中', '请勾选用户协议',snackPosition: SnackPosition.BOTTOM);
      return;
    }
    //2-用户名判断
    if(userName.isEmpty){
      Get.snackbar('用户名异常', '用户名为空',snackPosition: SnackPosition.BOTTOM);
      return;
    }
    //3-密码判断
    if(passWord.isEmpty){
      Get.snackbar('密码异常', '密码为空',snackPosition: SnackPosition.BOTTOM);
      return;
    }
    Get.snackbar('用户名、密码正确', '去登陆',snackPosition: SnackPosition.BOTTOM);
    print("用户名:$userName,密码：$passWord");
  }

  //用户协议勾选事件
  var isChecked = false.obs;

  void changeChecked(bool value) {
    isChecked.value = value;
  }
}
```

说明(LoginController包含两个方法调用和一个属性变量)：

* login方法：处理登陆按钮事件，分别对用户协议勾选、用户名、密码进行判断及处理
* changeChecked方法：用户协议勾选事件
* isChecked：保存用户协议勾选结果，并在界面中通过`Obx(()=>Checkbox(value: controller.isChecked.value`显示

### 3.2 Login登陆界面

```
void main() => runApp(GetMaterialApp(home: Login()));

late LoginController controller = Get.put(LoginController());

//登陆界面
class Login extends StatelessWidget {
  var userNameController = TextEditingController();
  var passWordController = TextEditingController();

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('登陆'),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 80),  //距离顶部距离
            buildTopWidget(), //设置登陆欢迎
            const SizedBox(height: 20), //距离上一个View距离
            buildAccountInputWidget(userNameController), //用户名
            const SizedBox(height: 20),//距离上一个View距离
            buildPasswordInputWidget(passWordController), //密码
            const SizedBox(height: 10,),//距离上一个View距离
            buildPrivacyWidget(), //隐私政策
            const SizedBox(height: 10,),//距离上一个View距离
            buildLoginButton(), //登陆按钮
          ],
        ),
      ),
    );
  }

//Widget-Top
  Widget buildTopWidget() {
    return const Text(
      "你好，欢迎登陆",
      style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800),
    );
  }

//手机号
  Widget buildAccountInputWidget(TextEditingController? userNameController) {
    return TextField(
      controller: userNameController,
      decoration: InputDecoration(labelText: "用户名"),
      style: TextStyle(fontSize: 16),
      keyboardType: TextInputType.phone,
    );
  }

//密码
  Widget buildPasswordInputWidget(TextEditingController? passWordController) {
    return TextField(
      controller: passWordController,
      obscureText: true,
      decoration: InputDecoration(labelText: "用户密码"),
      style: TextStyle(fontSize: 16),
    );
  }
//登陆按钮
  Widget buildLoginButton() {
    return SizedBox(
      child: RaisedButton(
        child: new Text("登录"),
        color: Colors.blue,
        textColor: Colors.white,
        onPressed: ()=>controller.login(userNameController, passWordController),
        disabledColor: Colors.grey,
        disabledTextColor: Colors.white,
        disabledElevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)), //圆角大小
      ),
      width: double.infinity,
    );
  }
  //隐私协议
  Widget buildPrivacyWidget() {
    return Row(
      children: [
        Obx(()=>Checkbox(value: controller.isChecked.value, onChanged: (value) =>controller.changeChecked(value!))),
        Text('同意', style: TextStyle(fontSize: 14)),
        Text('<服务协议>', style: TextStyle(fontSize: 14, color: Colors.blue)),
        Text('<隐私政策>', style: TextStyle(fontSize: 14, color: Colors.blue))
      ],
    );
  }
}
```

说明：

* 通过`Get.put(LoginController())`获取LoginController
* Widget之间的间距通过SizedBox设置
* 登陆界面中的每个Widget，单独剥离出来进行设置
* 登陆按钮和用户协议的勾选事件调用，通过LoginController来完成

## 四 参考

* [CSDN-Flutter-登陆界面实战](https://blog.csdn.net/mrRuby/article/details/122366726)
* [CSDN-参考代码](https://download.csdn.net/download/Calvin_zhou/85287169)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-06-login-agree-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-06-login-username-error.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-06-login-pwd-error.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-06-login-success-info.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-06-login-project-struct.png