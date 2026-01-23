---
title: 'WinForm开发之——读取查询结果(15.7)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: b3124fd9
date: 2020-08-17 21:57:58
---
## 一 概述

* 在C#中DataReader类的作用是读取查询结果，与在C# 数据库操作中介绍的Command类中的ExecuteReader方法一起使用
* 本节介绍DataReader类中常用的属性和方法，以及如何使用该类查询表中的数据

<!--more-->

## 二 DataReader 类概述

### 2.1 DataReader概述

 DataReader 类在 System.Data.SqlClient 命名空间中，对应的类是 SqlDataReader，主要用于读取表中的查询结果，并且是以只读方式读取的（即不能修改 DataReader 中存放的数据）。

正是由于 DataReader 类的特殊的读取方式，其访问数据的速度比较快，占用的服务器资源比较少。 

### 2.2 常用的属性和方法

| **属性或方法**  |                           **说明**                           |
| :-------------: | :----------------------------------------------------------: |
|   FieldCount    |                   属性，获取当前行中的列数                   |
|     HasRows     |             属性，获取 DataReader 中是否包含数据             |
|    IsClosed     |         属性，获取 DataReader 的状态是否为已经被关闭         |
|      Read       |           方法，让 DataReader 对象前进到下一条记录           |
|      Close      |                  方法，关闭 DataReader 对象                  |
| Get XXX (int i) | 方法，获取指定列的值，其中XXX代表的是数据类型。例如获取当前行第1列 double 类型的值，获取方法为GetDouble(o) |

## 三 使用 DataReader 类读取查询结果

 在使用 DataReader 类读取查询结果时需要注意，当查询结果仅为一条时，可以使用 if 语句查询 DataReader 对象中的数据，如果返回值是多条数据，需要通过 while 语句遍历 DataReader 对象中的数据。

在使用 DataReader 类读取查询结果时需要通过以下步骤完成： 

### 3.1 执行 SqlCommand 对象中的 ExecuteReader 方法

```
SqlDataReader dr=SqlCommand 类实例 .ExecuteReader();
```

### 3.2 遍历 SqlDataReader 中的结果

 SqlDataReader 类中提供的 Read 方法用于判断其是否有值，并指向 SqlDataReader 结果中的下一条记录。 

```
dr.Read()
```

 如果返回值为 True，则可以读取该条记录，否则无法读取。 

 在读取记录时，要根据表中的数据类型来读取表中相应的列。 

### 3.3 关闭 SqlDataReader

操作完成以后关闭数据流

## 四 实例  根据用户姓名查询用户的编号和密码，并将编号和密码显示在标签控件 (Label) 上 

### 4.1 界面布局

包含以下组件：

* 用户名：Label
* 输入框：TextBox
* 查询按钮：Button
* 查询结果：Label

![][1]

### 4.2 代码(查询)

```
private void button1_Click(object sender, EventArgs e)
{
 //编写数据库连接串
  string connStr = "Data Source=.;Initial Catalog=test;User ID=sa;Password=root";
  //创建 SqlConnection的实例
  SqlConnection conn = null;
  //定义SqlDataReader类的对象
  SqlDataReader dr = null;
  try
    {
      conn = new SqlConnection(connStr);
      //打开数据库连接
      conn.Open();
      string sql = "select id,password from userinfo where name='{0}'";
      //填充SQL语句
      sql = string.Format(sql, textBox1.Text);
      //创建SqlCommand对象
      SqlCommand cmd = new SqlCommand(sql, conn);
      //执行Sql语句
      dr = cmd.ExecuteReader();
      //判断SQL语句是否执行成功
      if (dr.Read())
      {
         //读取指定用户名对应的用户编号和密码
         string msg = "用户编号：" + dr[0] + " 密码：" + dr[1];
         //将msg的值显示在标签上
         label2.Text = msg;
      }else{
             label2.Text = "没有符合条件的结果";
           }
      }
      catch (Exception ex)
      {
          MessageBox.Show("查询失败！" + ex.Message);
      }
      finally
      {
         if (dr != null)
         {
            //判断dr不为空，关闭SqlDataReader对象
            dr.Close();
         }
         if (conn != null)
          {
             //关闭数据库连接
             conn.Close();
          }
}
```

### 4.3 效果图

![][2]
### 4.4 说明
从上面的运行效果可以看出，“张三”用户对应的用户编号为 1、密码为 123456。

需要注意的是，实现上述功能的要求是用户表中的用户名是唯一的，以避免出现查询错误


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-query-user-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-query-user-view.gif
