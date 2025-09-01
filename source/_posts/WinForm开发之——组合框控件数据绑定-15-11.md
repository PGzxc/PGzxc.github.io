---
title: 'WinForm开发之——组合框控件数据绑定(15.11)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 856f0863
date: 2020-08-18 20:29:56
---
## 一 概述
* 在 Windows 应用程序中很多控件都提供了 DataSource 属性，并将 DataSet 或 DataTable 的值直接赋给该属性，这样在控件中即可显示从数据库中查询出来的数据
* 常用的数据绑定控件有文本框（TextBox）、标签（Label）、列表框（ListBox）、组合框（ComboBox）、数据表格（DataGridView）等

下面以组合框控件为例来讲解一下数据绑定的应用 

<!--more-->

## 二 可视化数据绑定

组合框控件（ComboBox）在 Windows 窗体应用程序中是常用的控件，例如用于存放省市信息、专业、图书类型、房间类型等。  
在 Windows 窗体应用程序中提供了可视化数据绑定和使用代码绑定数据的方法。 

### 2.1 绑定组合框控件

* 使用数据绑定的方式绑定组合框控件直接单击组合框的![数据绑定快捷键](http://c.biancheng.net/uploads/allimg/190408/4-1Z40Q50645Y2.gif)图标，弹出“ComboBox任务”菜单，如下图所示 

  ![][1]
  
* 在其中选中“使用数据绑定项”复选框，显示“数据绑定模式”菜单，如下图所示

  ![][2]
  在该餐单中：

  * “数据源”组合框用于选择要连接数据库中的数据表，相当于为控件设置 DataSource 属性；
  * “显示成员”组合框用于设置在组合框中显示的列名，可以通过组合框的Text属性获取；
  *  值成员”组合框用于设置组合框中的隐藏值，可以通过组合框的 Value 属性获取； 
  *  选定值”组合框用于设置组合框中所选值使用的列名。 
 
### 2.2 使用代码绑定组合框

与数据绑定控件设置的属性类似，需要通过代码设置组合框的数据源、显示成员、值成员等内容 
具体设置的语句如下。 

```
组合框对象.DataSource = DataTable 的对象
//设置组合框的显示成员属性
组合框对象.DisplayMember = 列名
//设置组合框的值成员属性
组合框对象.ValueMember = 列名
```

## 三 实例

### 3.1 实例一  创建 Windows 窗体应用程序，设置显示专业信息的组合框，并将“显示成员”设置为专业名称列、将“值成员”设置为专业编号、将“选定值”设置为“计算机” 

#### 3.1.1  根据题目要求，先创建专业信息表，建表语句如下 

```
create table major
(
    id int primary key identity(1,1),
    name varchar(20) unique
);
```

#### 3.1.2 选择数据源类型

 向该表中添加计算机、英语、自动化 3 个专业信息，通过“ComboEox任务”菜单设置数据绑定项，首先选择“数据源”组合框，并单击“添加项目数据源”链接，弹出如下图所示的对话框 

![][3]

#### 3.1.3 选择数据库模型
选择“数据库”选项，单击“下一步”按钮，显示如下图所示的对话框。 

![][4]

#### 3.1.4 选择数据集

 选择“数据集”选项， 由于连接字符串存储一些敏感信息，在界面中提供了两个供用户选择的单选按钮，这里选择“是，在连接字符串中包含敏感数据”单选按钮，单击“下一步”按钮 

![][5]

#### 3.1.5 连接信息保存到配置文件中

 在其中可以为连接字符串设置名称，也可以选择不保存连接串，保存后的连接字符串能在下一次建立数据库连接时使用 

![][6]

#### 3.1.6  选择数据库对象 

![][7]

#### 3.1.7  设置后的效果 
![][8]

#### 3.1.8 运行效果
![][9]

### 3.2 实例二  使用代码的方式绑定组合框显示专业名称，每次切换选项后弹出消息框显 示组合框中当前选择的值 

#### 3.2.1 代码

```
//窗体加载事件
private void ComboBoxForm_Load(object sender, EventArgs e)
{
    //数据库连接串
    string connStr = "Data Source=.;Initial Catalog=test;User ID=sa;Password=root";
    //创建SqlConnection的实例
    SqlConnection conn = null;
    try
    {
        conn = new SqlConnection(connStr);
        //打开数据库
        conn.Open();
        string sql = "select * from major";
        //创建SqlDataAdapter类的对象
        SqlDataAdapter sda = new SqlDataAdapter(sql, conn);
        //创建DataSet类的对象
        DataSet ds = new DataSet();
        //使用SqlDataAdapter对象sda将查新结果填充到DataSet对象ds中
        sda.Fill(ds);
        //设置组合框的DataSource属性
        comboBox1.DataSource = ds.Tables[0];
        //设置组合框的DisPlayMember 属性
        comboBox1.DisplayMember = "name";
        //设置组合框的ValueMember属性
        comboBox1.ValueMember = "id";
    }
    catch(Exception ex)
    {
        MessageBox.Show("出现错误！" + ex.Message);
    }
    finally
    {
        if (conn != null)
        {
            //关闭数据库连接
            conn.Close();
        }
    }
}
```

#### 3.2.2  组合框的选项改变事件 

```
private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
{
    if (comboBox1.Tag != null)
    {
        //获取组合框中显示的值
        string name = comboBox1.Text;
        //弹出消息框
        MessageBox.Show("您选择的专业是：" + name);
    }
}
```

![][10]

#### 3.2.3 说明

 在实际工作中，使用代码绑定的方式是应用最多的方式，一方面体现了代码的灵活性，另一个方面也增强了代码的可移植性 


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-combox-select.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-combobox-select-data-bind.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-datasource-select-view.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-model-select.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-connect-select.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-connect-save-config-file.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-table-object-select.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-combobox-bings.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-bingd-run-view.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-sql-combox-selecte-change.png
