---
title: Flutter开发之——表单组件(34)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 4ca72ace
date: 2021-04-12 16:56:57
---
## 一 表单组件

表单组件时Flutter中用来进行用户输入，提交用户输入信息的组件。在使用表单组件时，需要将其放入表单容器中，使用时类似于H5中的form。常用表单组件有：

* Form
* FormField
* TextFormField

<!--more-->

## 二 表单组件介绍

### 2.1 Form

* Form类似于H5中的form，是表单控件的容器
* Form的child通常为多组件容器，比如Column，Row

### 2.2 FormField

* FormField是一个表单控件，此控件包含表单的状态，方便更新UI
* 通常情况下，我们不会直接使用FormField，而是使用TextFormField

### 2.3 TextFormField

* TextFormField继承自FormField，是一个输入框表单
* TextFormField用于接收输入信息，比如：用户名，密码

## 三 表单组件基本用法

### 3.1 基本用法代码

```
Form(child: Column(
          children: [
            Text("用户名："),
            TextFormField(),
            Text("密码："),
            TextFormField(),
            RaisedButton(onPressed: (){},child: Text("登录"),)
          ],
        ),)
```

### 3.2 效果图
![][1]
## 四 表单属性用法

### 4.1 表单属性代码

```
 //变量定义
 var userNameController = new TextEditingController();
  var passWordController = new TextEditingController();
  var _userNameFieldValue = '';
  var _passWordFieldValue = '';
  
  var _name = '';
  var _pwd = '';
  final _formKey = GlobalKey<FormState>();
  
  //body部分
  body: Form(
          key: _formKey,
          onWillPop: () async {
            return await showDialog<bool>(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: Text('提示'),
                    content: Text('确认退出吗？'),
                    actions: <Widget>[
                      FlatButton(
                        child: Text('取消'),
                        onPressed: () {
                          Navigator.of(context).pop(false);
                        },
                      ),
                      FlatButton(
                        child: Text('确认'),
                        onPressed: () {
                          Navigator.of(context).pop(true);
                        },
                      ),
                    ],
                  );
                });
          },
          //autovalidateMode:AutovalidateMode.disabled ,
          child: Column(
            children: [
              Text(
                "用户名",
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: FontWeight.bold),
              ),
              TextFormField(
                controller: userNameController,
                decoration: InputDecoration(
                    icon: Icon(Icons.person),
                    suffixIcon: Icon(Icons.delete),
                    labelText: "请输入用户名",
                    counterText: "${_userNameFieldValue.length}/32"),
                autovalidateMode: AutovalidateMode.disabled,
                validator: (userName) {
                  if (userName.length < 3) {
                    return "用户名过短";
                  }
                  return null;
                },
                onChanged: (value) {
                  setState(() {
                    _userNameFieldValue = value;
                  });
                },
                onSaved: (value) {
                  _name = value;
                },
                keyboardType: TextInputType.number,
                textCapitalization: TextCapitalization.words,
                textInputAction: TextInputAction.search,
              ),
              Text("密码",
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.bold)),
              TextFormField(
                controller: passWordController,
                decoration: InputDecoration(
                  icon: Icon(Icons.lock),
                  suffixIcon: Icon(Icons.delete),
                  labelText: "请输入密码",
                  counterText: "${_passWordFieldValue.length}/32",
                ),
                autovalidateMode: AutovalidateMode.disabled,
                obscureText: true,
                validator: (passWord) {
                  if (passWord.length < 3) {
                    return "密码过短";
                  }
                  return null;
                },
                onChanged: (value) {
                  setState(() {
                    _passWordFieldValue = value;
                  });
                },
                onSaved: (value) {
                  _pwd = value;
                },
              ),
              RaisedButton(
                onPressed: () {
                  var _state = _formKey.currentState;
                  if (_state.validate()) {
                    _state.save();
                    login(_name, _pwd);
                  }
                  //login(_userNameFieldValue, _passWordFieldValue);
                },
                child: Text("登录"),
              )
            ],
          ),
          onChanged: () {
            //print("用户名：${userNameController.text}");
            //print("密码：${passWordController.text}");
          },
        ));
  //login方法
  void login(String name, String pwd) 
  {
    print("用户名：$name,密码：$_pwd");
    userNameController.clear();
    passWordController.clear();
  }
```

### 4.2  效果图

![][2]

### 4.3 Form属性

|       属性       |             说明             |        取值         |
| :--------------: | :--------------------------: | :-----------------: |
|       key        |   整个应用程序中唯一的密钥   |       Key对象       |
|    onWillPop     | 返回按钮拦截后的小控件的方法 | WillPopCallback对象 |
| autovalidateMode |        输入框变化校验        |      bool对象       |
|    onChanged     |  输入框发生变化时的回调函数  |    Function对象     |

### 4.4 TextFormField

|        属性         |        说明        |           取值           |
| :-----------------: | :----------------: | :----------------------: |
|    initialValue     |       初始值       |        String对象        |
|    keyboardType①    |      键盘类型      |    TextInputType对象     |
| textCapitalization② |   文本的断行方式   | TextCapitalization枚举值 |
|  textInputAction③   | 键盘输入按钮的类型 |  TextInputAction枚举值   |
|     decoration④     |     输入框试图     |   InputDecoration对象    |
|        style        |      文本风格      |      TextStyle对象       |
|    textDirection    |      文本方向      |   TextDirection枚举值    |
|      textAlign      |    文本对齐方式    |     TextAlign枚举值      |
|     obscureText     |  文本显示是否加密  |         bool对象         |
|     autocorrect     |  是否开启自动更正  |         bool对象         |
|    autovalidate     | 是否自动有效性检查 |         bool对象         |
|      maxLines       |      最大行数      |         int对象          |
|  onEditingComplete  |  编辑完成时的回调  |         Function         |
|  onFieldSubmitted   |  表单提交时的回调  |         Function         |
|       onSaved       |  表单保存时的回调  |         Function         |
|      validator      |   有效性校验函数   |         Function         |
|       enabled       |   输入框是否可用   |         bool对象         |

#### keyboardType①

|     名称     |     说明      |
| :----------: | :-----------: |
|   datetime   | 日期时间类型  |
| emailAddress | Email地址类型 |
|  multiline   | 多行文本类型  |
|    number    | 数字键盘类型  |
|    phone     |   电话类型    |
|     text     |   文本类型    |
|     url      | 网址链接类型  |

#### textCapitalization②

|    名称    |       说明       |
| :--------: | :--------------: |
| characters | 使用字符进行断行 |
|   words    | 使用单词进行断行 |
| sentences  | 使用句子进行断行 |

#### textInputAction③

|      名称      |       说明        |
| :------------: | :---------------: |
| continueAction |     继续按钮      |
|      done      |     完成按钮      |
| emergencyCall  | 紧急电话按钮(IOS) |
|       go       |     前进按钮      |
|      join      |     加入按钮      |
|    newline     |     换行按钮      |
|      next      |    下一步按钮     |
|    previous    |    上一步按钮     |
|     route      |     跳转按钮      |
|     search     |     查找按钮      |
|      send      |     发送按钮      |
|  unspecified   |     默认按钮      |

#### decoration(InputDecoration)④

|      属性      |          说明          |          取值          |
| :------------: | :--------------------: | :--------------------: |
|     border     |      提示试图边框      |    InputBorder对象     |
| counterPadding |      内容的内间距      | EdgeInsetsGeometry对象 |
|  counterText   | 输入框下方标识文字个数 |       String对象       |
|  counterStyle  |   显示字数文本的风格   |     TextStyle对象      |
| disabledBorder |     不可用时的边框     |    InputBorder对象     |
|    enabled     |        是否可用        |        bool对象        |
| enabledBorder  |      可用时的边框      |    InputBorder对象     |
|  errorBorder   |      出错是的边框      |    InputBorder对象     |
| errorMaxLines  |   出错文本的最大行数   |        int对象         |
|   errorStyle   |     出错文本的风格     |     TextStyle对象      |
|   errorText    |        错误文本        |       String对象       |
|   fillColor    |        填充颜色        |       Color对象        |
|   helperText   |        帮助文本        |       String对象       |
|  helperStyle   |   帮助文本的字体风格   |     TextStyle对象      |
|    hintText    |    提示文本显示文本    |       String对象       |
|   hintStyle    |    提示文本字体风格    |     TextStyle对象      |
|      icon      |          图标          |       Widget对象       |
|   labelText    |        标签文本        |       String对象       |
|   labelStyle   |   标签文本的字体风格   |     TextStyle对象      |
|     prefix     |        前缀组件        |       Widget对象       |
|   prefixIcon   |        前缀图标        |       Widget对象       |
|   prefixText   |        前缀文本        |       String对象       |
|  prefixStyle   |   前缀文本的字体风格   |     TextStyle对象      |
|     suffix     |        后缀组件        |       Widget对象       |
|   suffixIcon   |        后缀图标        |       Widget对象       |
|   suffixText   |        后缀文字        |       String对象       |
|  suffixStyle   |    后缀文字字体风格    |     TextStyle对象      |




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-form-simple.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-form-textformfield.gif

