---
title: 'WinForm开发之——异常处理(13.2)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: dfc501a2
date: 2020-08-03 20:46:00
---
## 一 概述

在C#语言中异常与异常处理语句包括三种形式，即try catch、try finally、try catch finally。在上述三种异常处理的形式中所用到的关键字其含义如下：

* try：用于检查发生的异常，并帮助发送任何可能的异常
* catch：以控制权更大的方式处理错误，可以有多个catch子句
* finally：无论是否引发了异常，finally的代码块都将被执行

<!--more-->

## 二 三种异常形式

### 2.1  try catch

#### 2.1.1 说明

* 在try语句中放置可能出现异常的语句，而在catch语句中放置异常时处理异常的语句，通常在catch语句中输出异常信息或者发送邮件给开发人员等
* 下面通过实例来演示try catch的应用，另外，在处理异常时，catch语句是允许多次使用的，相当于多分支的if语句，仅能执行其中一个分支

#### 2.1.2 实例一 在文本框中输入一个整数，并判断其是否大于100( 根据题目要求，如果在文本框中输入的是一个字符串或者浮点数，就会出现类型转换错误 )

##### 界面布局
![][1]

##### 代码

```
public partial class tryCatchForm : Form
{
    public tryCatchForm()
    {
        InitializeComponent();
    }
    //“确认”按钮单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //获取文本框中的值
        string str = textBox1.Text;
        //将字符串装换为整数
        try
        {
            int num = int.Parse(str);
            MessageBox.Show("您输入的数字是：" + num);
        }
        catch (Exception ex)
        {
            MessageBox.Show(ex.Message);
        }
    }
}
```

##### 未加异常处理前
![][2]

##### 异常处理后
![][3]

#### 2.1.3 实例二   使用多个 catch 语句对程序做异常处理 
##### 分析
从控制台输入 5 个数存入整数数组中，首先判断输入的值是否为数值，再判断数组元素是否越界， 根据题目要求，创建控制台应用程序完成该实例 

##### 代码

```
class Program
{
    static void Main(string[] args)
    {
        //定义存放5个整数的数组
        int[] a = new int[5];
        try
        {
            for(int i = 0; i < a.Length; i++)
            {
                a[i] = int.Parse(Console.ReadLine());
            }
            for(int i = 0; i < a.Length; i++)
            {
                Console.Write(a[i] + " ");
            }
        }
        catch(FormatException f)
        {
            Console.WriteLine("输入的数字格式不正确！");
        }
        catch(OverflowException o)
        {
            Console.WriteLine("输入的值已经超出 int 类型的最大值！");
        }
        catch(IndexOutOfRangeException r)
        {
            Console.WriteLine("数组越界异常！");
        }
    }
}
```

##### 效果

![][4]

### 2.2 try finally

#### 2.2.1 说明

在try finally形式中没有单独对出现异常时处理的代码，finally语句无论是try中的语句是否正确执行都会执行的语句，通常在finally中编写的代码是关闭流、关闭数据库连接等操作，以免造成资源的浪费

#### 2.2.2 实例一   验证 finally 语句的使用 

##### 代码

```
public partial class tryCatchForm : Form
{
    public tryCatchForm()
    {
        InitializeComponent();
    }
    //“确认”按钮单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //获取文本框中的值
        string str = textBox1.Text;
        //将字符串装换为整数
        try
        {
            int num = int.Parse(str);
            MessageBox.Show("您输入的数字是：" + num);
        }
        finally
        {
            MessageBox.Show("finally 语句");
        }
    }
}
```

#### 2.2.3 实例二   从文本框中输入当天的天气情况，并将其写入文件中，无论写入是否成功都将文件流关闭 

##### 代码

```
public partial class TryFinallyForm : Form
{
    public TryFinallyForm()
    {
        InitializeComponent();
    }
    //"确认"按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //获取文本框
        string city = txtCity.Text;
        string msg = txtMsg.Text;
        string min = txtMin.Text;
        string max = txtMax.Text;
        //将文本框中的内容组成一个字符串
        string message = city + "：" + msg + "：" + min + "~" + max;
        //定义文件路径
        string path = "D:\\C#_test\\weather.txt";
        FileStream fileStream = null;
        try
        {
            //创建fileSteam类的对象
            fileStream = new FileStream(path, FileMode.OpenOrCreate);
            //将字符串转换成字节数组
            byte[] bytes = Encoding.UTF8.GetBytes(message);
            //向文件中写入字节数组
            fileStream.Write(bytes, 0, bytes.Length);
            //刷新缓冲区
            fileStream.Flush();
            //弹出录入成功的消息框
            MessageBox.Show("天气信息录入成功！");
        }
        finally
        {
            if (fileStream != null)
            {
                //关闭流
                fileStream.Close();
            }
        }
    }
}
```

##### 效果
![][5]

### 2.3 try catch finally
#### 2.3.1 说明

try catch finally形式语句是使用最多的一种异常处理语句，在出现异常时能提供相应的异常处理，并能在finally语句中保证资源的回收

#### 2.3.2 实例  使用 try catch finally 形式完成实例 4 的题目要求 

```
public partial class TryFinallyForm : Form
{
    public TryFinallyForm()
    {
        InitializeComponent();
    }
    //"确认"按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //获取文本框
        string city = txtCity.Text;
        string msg = txtMsg.Text;
        string min = txtMin.Text;
        string max = txtMax.Text;
        //将文本框中的内容组成一个字符串
        string message = city + "：" + msg + "：" + min + "~" + max;
        //定义文件路径
        string path = "D:\\C#_test\\weather.txt";
        FileStream fileStream = null;
        try
        {
            //创建fileSteam类的对象
            fileStream = new FileStream(path, FileMode.OpenOrCreate);
            //将字符串转换成字节数组
            byte[] bytes = Encoding.UTF8.GetBytes(message);
            //向文件中写入字节数组
            fileStream.Write(bytes, 0, bytes.Length);
            //刷新缓冲区
            fileStream.Flush();
            //弹出录入成功的消息框
            MessageBox.Show("天气信息录入成功！");
        }
        catch(Exception ex)
        {
            MessageBox.Show("出现错误！" + ex.Message);
        }
        finally
        {
            if (fileStream != null)
            {
                //关闭流
                fileStream.Close();
            }
        }
    }
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-exception-trycatch-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-exception-try-catch-not-do.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-exception-trycatch-done.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-exception-trycatch-sample-2.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-exception-tryfinally-weather.png