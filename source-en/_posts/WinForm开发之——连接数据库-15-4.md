---
title: 'WinForm开发之——连接数据库(15.4)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: ba501380
date: 2020-08-14 22:26:06
---
## 一 概述

C#语言中Connection类是ADO.NET组件连接数据库时第一个要使用的类，也是通过编程访问数据库的第一步。接下也来我们来了解一下Connection类中的常用属性和方法，以及如何连接SQL Server数据库

<!--more-->

## 二 Connection类概述

Connection类根据要访问的数据和访问方式不同，使用的命名空间也不同，类名也稍有区别，SqlConnection类中提供的常用属性和方法如下

|             **属性或方法**             |                           **说明**                           |
| :------------------------------------: | :----------------------------------------------------------: |
|            SqlConnection()             |                         无参构造方法                         |
| SqlConnection(string connectionstring) |          带参数的构造方法，数据库连接字符串作为参数          |
|            Connectionstring            |                属性，获取或设置数据库的连接串                |
|                 State                  | 属性，获取当前数据库的状态，由枚举类型 Connectionstate 为其提供值 |
|           ConnectionTimeout            |   属性，获取在尝试连接时终止尝试并生成错误之前所等待的时间   |
|               DataSource               |            属性，获取要连接的 SQL Server 的实例名            |
|                 Open()                 |                   方法，打开一个数据库连接                   |
|                Close()                 |                     方法，关闭数据库连接                     |
|           BeginTransaction()           |                   方法，开始一个数据库事务                   |

## 三 使用 Connection 类连接数据库

 数据库连接串的书写方法有很多，这里介绍两种常用的方法 

### 3.1 第1种方式

```
server = 服务器名称 / 数据库的实例名 ; uid = 登录名 ; pwd = 密码 ; database = 数据库名称
```

其中：

* server：用于指定要访问数据库的数据库实例名，服务器名称可以换成IP地址或者数据库所在的计算机名称，如果访问的是本机数据库，则可以使用"."来代替。例如连接的是本机的默认数据库，则可以写成"server=."
* uid：登录到指定SQL Server数据库实例的用户名，相当于以SQL Server身份验证方式登录数据库时使用的用户名，例如sa用户
* pwd：与uid用户对应的密码
* database：要访问数据库实例下的数据库名

### 3.2 第2种方式

```
Data Source = 服务器名称 \ 数据库实例名 ; Initial Catalog = 数据库名称 ; User ID = 用户名 ; Password = 密码
```

其中：

* Data Source：与第1种连接串写法中的database属性的写法一样，用于指定数据库所在的服务器名称和数据库实例名，如果连接的是本机的默认数据库实例，则写成"Data Source=."的形式
* Initial Catalog：与第1种连接串写法中的database属性的写法一样，用于指定在Data Source中数据库实例下的数据库名
* User ID：与第1种连接串写法中的uid属性的写法一样，用于指定登录数据库的用户名
* Password：与第 1 种连接串写法中的 pwd 属性的写法一样，用于指定 User ID 用户名所对应的密码。

## 四 连接相关操作

 在完成了数据库连接串的编写后即可使用 SqlConnection 类与数据库连接，分以下 3 步完成 

### 4.1  创建 SqlConnection 类的实例

 对于 SqlConnection 类来说，上表中提供了两个构造方法，通常是使用带一个字符串参数的构造方法来设置数据库的连接串创建其实例，语句形式如下。 

```
SqlConnection 连接对象名 = new SqlConnection( 数据库连接串 );
```

### 4.2 打开数据库连接

 在创建 SqlConnection 连接类的实例后并没有连接上数据库，需要使用连接类的 Open 方法打开数据库的连接。

在使用 Open 方法打开数据库连接时，如果数据库的连接串不正确或者数据库的服务处于关闭状态，会出现打开数据库失败的相关异常，因此需要通过异常处理来处理异常。

打开数据库连接的语句形式如下。 

```
连接对象名.Open();
```

### 4.3 关闭数据库连接

在对数据库的操作结束后要将数据库的连接断开，以节省数据库连接的资源。

关闭数据库连接的语句形式如下。 

```
连接对象名.Close();
```

 如果在打开数据库连接时使用了异常处理，则将关闭数据库连接的语句放到异常处理的 finally 语句中，这样能保证无论是否发生了异常都将数据库连接断开，以释放资源 

 除了使用异常处理的方式释放资源外，还可以使用 using 的方式释放资源 。具体的语句如下。 

```
using(SqlConnection 连接对象名 = new SQLConnection( 数据库连接串 ))
{
    //打开数据库连接
    //对数据库先关操作的语句
}
```

 using 关键字的用法主要有两个，一个是引用命名空间，一个是创建非托管资源对象。

在 .NET 平台上资源分为托管资源和非托管资源，托管资源是由 .NET 框架直接提供对其资源在内存中的管理，例如声明的变量；非托管资源则不能直接由 .NET 框架对其管理，需要使用代码来释放资源，例如数据库资源、操作系统资源等。 

## 五 实例

### 5.1 实例一  创建与本机 SQL Server 数据库的连接，并使用异常处理 

#### 5.1.1 分析

 连接 SQL Server 数据库时使用的用户名为 sa、密码为 pwdpwd，连接的数据库为test 

#### 5.1.2 创建数据库test

打开Microsoft SQL Server Management Studio，登录后，在数据库上右键，新建数据库并输入创建的数据库名称

![][1]

#### 5.1.3 代码

 创建 Windows 窗体应用程序，并在窗体上放置一个按钮 ，在按钮的单击事件中加入以下代码 

```
private void button1_Click(object sender, EventArgs e)
 {
   //编写数据库连接串
   //string connStr = "Data source=.;Initial Catalog=test;User ID=sa;Password=root";
   string connStr = "Data source=.;Initial Catalog=test;Integrate Security = True";
   //var connStr = "server=.;uid=sa;pwd=root;database=test";
   //创建SqlConnection的实例
    SqlConnection conn = null;
    try
      {
         conn = new SqlConnection(connStr);
         conn.Open();
         MessageBox.Show("数据库连接成功！");
       }
      catch (Exception ex)
      {
           MessageBox.Show("数据库连接失败！" + ex.Message);
      }
      finally
      {
         if (conn != null)
         {
            //关闭数据库
            conn.Close();
          }
       }
}
```

#### 5.1.4 效果图
![][2]

### 5.2 实例二 在上一实例的基础上使用 using 关键字释放资源。

#### 5.2.1 代码

```
private void button1_Click(object sender, EventArgs e)
{
   //编写数据库连接串
   //string connStr = "Data source=.;Initial Catalog=test;User ID=sa;Password=root";
   //string connStr = "Data source=.;Initial Catalog=test;Integrate Security = True";
   var connStr = "server=.;uid=sa;pwd=root;database=test";
   //创建SqlConnection的实例
          
   try
      {
         using (SqlConnection conn=new SqlConnection(connStr))
         conn.Open();
         MessageBox.Show("数据库连接成功！");
       }
       catch (Exception ex)
       {
          MessageBox.Show("数据库连接失败！" + ex.Message);
       }
 }
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-create-tabe.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-server-connection-scucess.gif