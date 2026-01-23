---
title: 'WinForm开发之——ListBox(12.13)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: bf8fdc3c
date: 2020-07-29 21:59:06
---
## 一 概述

列表框(ListBox)将所提供的内容以列表的形式显示出来，并可以选择其中的一项或多项内容，从形式上比使用复选框更好一些

<!--more-->

## 二 ListBox常用属性

### 2.1 属性列表

|    属性名     |                             作用                             |
| :-----------: | :----------------------------------------------------------: |
|  MultiColumn  | 获取或设置列表框是否支持多列，如果设置为True，则表示支持多列；如果设置为False，则表示不支持多列，默认为False |
|     Items     |                  获取或设置列表框控件中的值                  |
| SelectedItems |                  获取列表框中所选中项的集合                  |
| SelectedItem  |                   获取列表框中当前选中的项                   |
| SelectedIndex |          获取列表框中当前选中项的索引，索引从0开始           |
| SelectionMode | 获取或设置列表框中选择的模式，当值为One时，代表只能选中一项；当值为MultiSimple时，代表能选择多项；当值为None时，代表不能选择；当值为MultiExtended时，代表能选择多项，但要在按下Shift键后再选择列表框中的项 |

### 2.2 其他

* 列表框还提供了 一些方法来操作列表框中的选项，由于列表框中的选项是一个集合形式的，列表项的操作都是用Items属性进行的
* 例如：`Items.Add`方法用于向列表框中添加项，`Items.Inset`方法用于向列表框中的指定位置添加项，`Items.Remove`方法用于移除列表框中的项

## 三 实例 

### 3.1 实例一 <font size=5> 使用列表框的形式完成 C# CheckBox一节中爱好的选择 </font>

#### 3.1.1 默认布局

![][1]

#### 3.1.2 编辑ListBox数据
* 将鼠标放到ListBox上，出现右箭头，点击编辑项

  ![][2]
  
* 向ListBox中添加数据项

  ![][3]

#### 3.1.3 点击OK时的代码逻辑

```
public partial class ListBoxForm : Form
{
    public ListBoxForm()
    {
        InitializeComponent();
    }
    //单击“确定”按钮事件
    private void button1_Click(object sender, EventArgs e)
    {
        string msg = "";
        for(int i = 0; i < listBox1.SelectedItems.Count; i++)
        {
            msg = msg + " " + listBox1.SelectedItems[i].ToString();
        }
        if (msg != "")
        {
            MessageBox.Show("您选择的爱好是：" + msg, "提示");
        }
        else
        {
            MessageBox.Show("您没有选择爱好", "提示");
        }
    }
}
```

#### 3.1.4 效果图
![][4]
### 3.2 实例二 <font size=4> 在实例 1 的基础上添加两个按钮，一个负责向列表框中添加爱好，一个负责删除选中的列表项 </font>

#### 3.2.1 布局
![][5]

#### 3.2.2 添加和删除的代码逻辑

```
//将列表框中的选中项删除
private void button2_Click(object sender, EventArgs e)
{
    //由于列表框控件中允许多选所以需要循环删除所有已选项
    int count = listBox1.SelectedItems.Count;
    List<string> itemValues = new List<string>();
    if (count != 0)
    {
        for(int i = 0; i < count; i++)
        {
            itemValues.Add(listBox1.SelectedItems[i].ToString());
        }
        foreach(string item in itemValues)
        {
            listBox1.Items.Remove(item);
        }
    }
    else
    {
        MessageBox.Show("请选择需要删除的爱好！");
    }
}
//将文本框中的值添加到列表框中
private void button3_Click(object sender, EventArgs e)
{
    //当文本框中的值不为空时将其添加到列表框中
    if (textBox1.Text != "")
    {
        listBox1.Items.Add(textBox1.Text);
    }
    else
    {
        MessageBox.Show("请添加爱好！");
    }
}
```

#### 3.2.3 效果图
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-listbox-default-layout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-listbox-edit.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-listbox-add-content.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-listbox-view.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-listbox-add-remove-layout.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/csharp-windform-listbox-addmove-view.gif