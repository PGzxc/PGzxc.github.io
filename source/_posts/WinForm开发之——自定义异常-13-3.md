---
title: 'WinForm开发之——自定义异常(13.3)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 5b9d0a70
date: 2020-08-03 20:47:34
---
## 一 概述

* 虽然在C#语言中已经提供了很多异常处理类，但在实际编程中还是会遇到未涉及的一些异常处理
* 例如想将数据的验证放置到异常处理中，即判断所输入的年龄必须为18~45，此时需要自定义异常类来实现

<!--more-->

## 二 自定义异常

 自定义异常类必须要继承 Exception 类 

### 2.1 声明异常的语句

```
class 异常类名 :Exception
{
}
```

### 2.2  抛出自己的异常，语句 

```
throw( 异常类名 );
```

## 三 实例 <font size=5>自定义异常类，判断从文本框中输入的年龄值处于 18〜45 </font>

### 3.1 自定义异常类

```
class MyException :Exception
{
    public MyException(string message) : base(message)
    {
    }
}
```

### 3.2 验证按钮

```
private void button1_Click(object sender, EventArgs e)
{
    try
    {
        int age = int.Parse(textBox1.Text);
        if (age < 18 || age > 45)
        {
            throw new MyException("年龄必须在18~45岁之间！");
        }
        else
        {
            MessageBox.Show("输入的年龄正确！");
        }
    }
    catch(MyException myException)
    {
        MessageBox.Show(myException.Message);
    }
    catch(Exception ex)
    {
        MessageBox.Show(ex.Message);
    }
}
```
### 3.3 效果图

![][1]

### 3.4 说明

* 从运行效果可以看出，若在文本框中输入的年龄不在18~45岁即会抛出自定义的异常
* 自定义异常也继承自Exception类，因此如果不能直接处理MyException异常，也可以直接使用Exception来来处理该异常




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-winform-define-exception-view.gif