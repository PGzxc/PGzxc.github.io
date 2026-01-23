---
title: 'WinForm开发之——更新数据表(15.9)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: c474b9a6
date: 2020-08-18 20:27:16
---
## 一 概述

* 在前面C#操作数据库一节中已经介绍了使用SqlCommand对象中的ExecuteNonQuery方法执行非查询SQL语句来实现对数据表的更新操作，使用DataSet对象也能实现相同的功能，并且能节省数据访问时间
* 每个DataSet都是由多个DataTable构成的，更新DataSet中的数据实际上是通过更新DataTable来实现的
* 每个DataTable对象都是由行(DataRow)和列(DataColumn)构成的，下面分别介绍DataRow类和DataColumn类的使用

<!--more-->

## 二 DataRow 类

DataRow类代表数据表中的行，并允许通过该类直接对数据表进行添加、修改、删除行的操作

### 2.1 DataRow常用的属性和方法

| **属性或方法**  |                           **说明**                           |
| :-------------: | :----------------------------------------------------------: |
|      Table      |          属性，设置DataRow对象所创建DataTable的名称          |
|    RowState     |                    属性，获取当前行的状态                    |
|    HasErrors    |                 属性，获取当前行是否存在错误                 |
| AcceptChanges() |                   方法，更新DaaTable中的值                   |
| RejectChanges() |               方法，撤销对Datable中的值的更新                |
|    Delete()     | 方法，标记当前的行被删除，并在执行AcceptChanges方法更新数据表 |

### 2.2 DataRow的创建

在DataRow类中没有提供构造方法，需要通过DataTable中的NewRow方法创建DataRow类的对象，具体的语句如下：

```
DataTable dt=new DataTable();
DataRow dr=dt.NewRow();
```

这样，dr即为新添加的行，每行数据是由多列构成的，如果在DataTable对象中已经存在表结构，则直接使用`dr[编号或列名]=值`的形式即可为表中的列赋值

## 三 DataColumn 类

DataColumn类是数据表中的列对象，与数据库中表的列定义一样，都可以为其设置列名以及数据类型

### 3.1 DataColumn构造方法

|                **构造方法**                 |                           **说明**                           |
| :-----------------------------------------: | :----------------------------------------------------------: |
|                DataColumn()                 |                         无参构造方法                         |
|        DataColumn(string columnName)        |        带参数的构造方法，columnName 参数代表的是列名         |
| DataColumn(string columnName,Type dataType) | 带参数的构造方法，columnName 参数代表的是列名，dataType 参数代表的是列的数据类型 |

### 3.2  DataColumn 对象常用的属性 

|     **属性**      |                           **说明**                           |
| :---------------: | :----------------------------------------------------------: |
|    ColumnName     |               属性，设置 DataColumn 对象的列名               |
|     DataType      |             属性，设置 DataColumn 对象的数据类型             |
|     MaxLength     |            属性，设置 DataColumn 对象值的最大长度            |
|      Caption      | 属性，设置 DataColumn 对象在显示时的列名，类似于给表中的列设置别名 |
|   DefaultValue    |               性，设置 DataColumn 对象的默认值               |
|   AutoIncrement   | 属性，设置 DataColumn 对象为自动增长列，与 SQL Server 中数据表的标识列类似 |
| AutoIncrementSeed |  属性，与 AutoIncrement 属性联用,用于设置自动增长列的初始值  |
| AutoIncrementStep | 性，与 AutoIncrement 属性联用，用于设置自动增长列每次增加的值 |
|      Unique       | 属性，设置 DataColumn 对象的值是唯一的，类似于数据表的唯一约束 |
|    AllowDBNull    |          属性，设置 DataColumn 对象的值是否允许为空          |

## 四 实例 <font size=4> 通过 DataRow 类、DataColumn 类以及 DataTable 类设计专业信息表，并向该表中添加专业，在 ListBox 控件中显示所有专业信息 </font>

### 4.1 分析

专业信息表的列包括专业编号、专业名称，要求专业编号是自动增长列，专业名称是唯一值 

### 4.2 页面布局

![][1]

### 4.3 代码

```
public partial class DataRowform : Form
{
    //创建DataTable类的对象其表明为major
    private DataTable dt = new DataTable("major");
    //在构造方法中初始化DataTable对象，设置DataTable 中的列
    public DataRowform()
    {
        InitializeComponent();
        //创建专业编号列，列明为id 、数据类型为整型
        DataColumn id = new DataColumn("id", typeof(int));
        //设置id为自动增长列
        id.AutoIncrement = true;
        //设置id的初始值
        id.AutoIncrementSeed = 1;
        //设置id每次增长的值
        id.AutoIncrementStep = 1;
        //将id列加入到DataTable中
        dt.Columns.Add(id);
        //创建专业名称列，列明为name，数据类型为字符串类型
        DataColumn name = new DataColumn("name", typeof(string));
        //设置name列的值是唯一的
        name.Unique = true;
        //将name列加入到DataTable 对象中
        dt.Columns.Add(name);
    }
    //添加按钮的单击事件
    private void button1_Click(object sender, EventArgs e)
    {
        //向DataTable中天加一行，创建DataRow对象
        DataRow dr = dt.NewRow();
        //添加专业名称列的值
        dr["name"] = textBox1.Text;
        //将DataRow添加到DataTable对象中
        dt.Rows.Add(dr);
        //设置ListBox控件中的DataSource属性
        listBox1.DataSource = dt;
        //设置在listBox控件中显示的列
        listBox1.DisplayMember = dt.Columns["name"].ToString();
    }
}
```

### 4.4 效果图
![][2]

### 4.5 说明

* 从上面的运行效果可以看出，DataTable 类的使用与直接设计数据库中的表是类似的，只是没有将数据存储到数据库中。
* 既然使用 DataTable 类能完成与表设计和操作相同的功能，那么通过更新 DataTable 来更新数据库中的数据表效果会事半功倍，并能在离线状态下保存数据 


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-update-data-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-update-data-view.gif