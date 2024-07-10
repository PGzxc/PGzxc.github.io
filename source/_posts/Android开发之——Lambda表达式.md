---
title: Android开发之——Lambda表达式
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Lambda
abbrlink: 6c403126
date: 2017-12-13 22:25:54
---
## 一 概述
Lambda表达式是Java 8的一个新特性，可以替代只有一个函数的接口实现，告别匿名内部类，代码看起来更简洁易懂。   
Lambda表达式同时还提升了对集合的迭代、遍历、过滤数据的操作。   
那么在Android Studio中如何使用lambda表达式呢？   
<!--more-->

## 二 配置  
在Android Studio中使用Lambda需要进行适当的配置
###  2.1 安装JDK1.8    
安装后，打开CMD输入“java -version”查看当前JDK版本   
![jdk][1]
### 2.2 在app下的build.gradle中使用Java1.8

```
compileOptions
 {
   sourceCompatibility JavaVersion.VERSION_1_8
   targetCompatibility JavaVersion.VERSION_1_8
 }
```

![][2]

## 三 使用

### 3.1 第一个lambda表达式

比如按钮的点击事件：

#### 一般写法(匿名内部类)：

```
findViewById(R.id.btn_click).setOnClickListener(new View.OnClickListener() {   
        @Override
        public void onClick(View v) {
            Intent intent=new Intent(MainActivity.this, LambdaExampleActivity.class);
            startActivity(intent);
        }
    });
```

缺点：
- 可读性差，不能直接明了的体现我们的意图。
- 啰嗦，一行逻辑代码却有几行模板代码。


#### lambda表达式： 

```
findViewById(R.id.btn_click).setOnClickListener(view->
    {
        Intent intent=new Intent(this, LambdaExampleActivity.class);
        startActivity(intent);
    });
```
优点：  
- 参数的类型可省略
- Java编译器根据表达式的上下文推导出参数的类型   

### 3.2 lambda表达式的结构   

- 参数可以是零个或多个
- 参数类型可指定，可省略（根据表达式上下文推断）
- 参数包含在圆括号中，用逗号分隔
- 表达式主体可以是零条或多条语句,包含在花括号中
- 表达式主体只有一条语句时,花括号可省略
- 表达式主体有一条以上语句时，表达式的返回类型与代码块的返回类型一致
- 表达式只有一条语句时，表达式的返回类型与该语句的返回类型一致

  
  
```
  //零个
   Runnable runnable = () -> System.out.println("no argument");
   //一个
   IntToDoubleFunction intToDoubleFunction = (int x) -> x + 1;
   //两个
   IntBinaryOperator intBinaryOperator = (int x, int y) -> x + y;
   //省略参数类型
   View.OnClickListener oneArgument = view-> Log.d("TAG","one argument");
   //指定参数类型
   View.OnClickListener oneArgument1 = (View view)->Log.d("TAG","one argument");
   //多行语句
   //返回类型是代码块返回的void
   View.OnClickListener multiLine = (View view)->{
     	     Log.d("TAG","multi statements");
     	     Log.d("TAG","second line");
   };
```

![][3]

## 四 参考

[参考Demo][4]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lambda-jdk_8.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lambda-compileoptions.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/lambda_sample.png
[4]: https://github.com/PGzxc/LambdaDemo
