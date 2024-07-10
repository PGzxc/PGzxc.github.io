---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件ListContainer
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: e7b1c0dd
date: 2021-01-07 17:04:03
---
## 一 概述

ListContainer用来呈现连续、多行数据的组件，包含一系列相同类型的列表项

* ListContainer的使用方法
* ListContainer的常用设置
* ListContainer的样式设置

<!--more-->

## 二 ListContainer的使用方法

### 2.1 在layout目录下的xml文件中创建ListContainer

```
<ListContainer
    ohos:id="$+id:list_container"
    ohos:height="200vp"
    ohos:width="300vp"
    ohos:layout_alignment="horizontal_center"/>
```

### 2.2 ListContainer的子布局(item_sample.xml)

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_content"
    ohos:width="match_parent"
    ohos:left_margin="16vp"
    ohos:right_margin="16vp"
    ohos:orientation="vertical">
    <Text
        ohos:id="$+id:item_index"
        ohos:height="match_content"
        ohos:width="match_content"
        ohos:padding="4vp"
        ohos:text="Item0"
        ohos:text_size="20fp"
        ohos:layout_alignment="center"/>
</DirectionalLayout>
```

### 2.3 ListContainer的数据包装类(类似于Android bean类)

```
public class SampleItem {
    private String name;
    public SampleItem(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
```

### 2.4 ListContainer数据适配类(类似于Android中adater类)

#### ListContainer常用方法

|                           **方法**                           |            **作用**            |
| :----------------------------------------------------------: | :----------------------------: |
|                        int getCount()                        |       返回填充的表项个数       |
|                 Object getItem(int position)                 |   根据position返回对应的数据   |
|                 long getItemId(int position)                 |         返回某一项的id         |
| Component getComponent(int position, Component covertComponent,ComponentContainer componentContainer) | 根据position返回对应的界面组件 |

#### SampleItemProvider

```
import ohos.aafwk.ability.AbilitySlice;
import ohos.agp.components.*;
import java.util.List;
public class SampleItemProvider extends RecycleItemProvider {
    private List<SampleItem> list;
    private AbilitySlice slice;
    public SampleItemProvider(List<SampleItem> list, AbilitySlice slice) {
        this.list = list;
        this.slice = slice;
    }
    @Override
    public int getCount() {
        return list.size();
    }
    @Override
    public Object getItem(int position) {
        return list.get(position);
    }
    @Override
    public long getItemId(int position) {
        return position;
    }
    @Override
    public Component getComponent(int position, Component convertComponent, ComponentContainer componentContainer) {
        Component cpt = convertComponent;
        if (cpt == null) {
            cpt = LayoutScatter.getInstance(slice).parse(ResourceTable.Layout_item_sample, null, false);
        }
        SampleItem sampleItem = list.get(position);
        Text text = (Text) cpt.findComponentById(ResourceTable.Id_item_index);
        text.setText(sampleItem.getName());
        return cpt;
    }
}
```

#### 在Java代码中添加ListContainer的数据，并适配其数据结构

```
    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        super.setUIContent(ResourceTable.Layout_page_listcontainer)
        initListContainer();
    }
    private void initListContainer() {
        ListContainer listContainer = (ListContainer) findComponentById(ResourceTable.Id_list_container);
        List<SampleItem> list = getData();
        SampleItemProvider sampleItemProvider = new SampleItemProvider(list,this);
        listContainer.setItemProvider(sampleItemProvider);
    }
    private ArrayList<SampleItem> getData() {
        ArrayList<SampleItem> list = new ArrayList<>();
        for (int i = 0; i <= 8; i++) {
            list.add(new SampleItem("Item"+i));
        }
        return list;
    }
```

####  ListContainer的界面显示效果

![][1]

## 三 ListContainer的常用设置

### 3.1 设置响应点击事件

#### 代码

```
listContainer.setItemClickedListener(new ListContainer.ItemClickedListener() {
            @Override
            public void onItemClicked(ListContainer listContainer, Component component, int position, long id) {
                SampleItem item = (SampleItem) listContainer.getItemProvider().getItem(position);
                new ToastDialog(getContext())
                        .setText("clicked:"+item.getName())
                        // Toast显示在界面中间
                        .setAlignment(LayoutAlignment.CENTER)
                        .show();
            }
        });
```

#### 响应点击事件效果
![][2]

### 3.2 设置响应长按事件

#### 代码

```
listContainer.setItemLongClickedListener(new ListContainer.ItemLongClickedListener() {
            @Override
            public boolean onItemLongClicked(ListContainer listContainer, Component component,int position, long id) {
                SampleItem item = (SampleItem) listContainer.getItemProvider().getItem(position);
                new ToastDialog(getContext())
                        .setText("long clicked:" + item.getName())
                        .setAlignment(LayoutAlignment.CENTER)
                        .show();
                return false;
            }
        });
```

#### 响应长按事件效果
![][3]

## 四 ListContainer的样式设置

ListContainer的样式设置相关的接口如下

|    **属性**    |                         **Java方法**                         |            **作用**            |
| :------------: | :----------------------------------------------------------: | :----------------------------: |
|  orientation   |               setOrientation(int orientation)                |          设置布局方向          |
|       \-       | setContentStartOffSet(int startOffset)<br>setContentEndOffSet(int endOffset)<br>setContentOffSet(int startOffset, int endOffset) | 设置列表容器的开始和结束偏移量 |
| rebound_effect |              setReboundEffect(boolean enabled)               |      设置是否启用回弹效果      |
|       \-       | etReboundEffectParams(int overscrollPercent, float overscrollRate, int remainVisiblePercent)<br>setReboundEffectParams(ListContainer.ReboundEffectParams reboundEffectParams) |        设置回弹效果参数        |
|  shader_color  |                 setShaderColor(Color color)                  |         设置着色器颜色         |

### 4.1 设置ListContainer的布局方向

orientation设置为“horizontal”，表示横向布局；

orientation设置为“vertical”，表示纵向布局。

默认为纵向布局。

#### 在xml中设置

```
<ListContainer
    ...
    ohos:orientation="horizontal"/>
```

#### Java代码中设置

```
listContainer.setOrientation(Component.HORIZONTAL);
```

#### 布局方向为horizontal的效果
![][4]

### 4.2 设置ListContainer的开始和结束偏移量

#### java代码中设置

```
listContainer.setContentOffSet(32,16);
```

#### 为了便于观察，设置背景颜色

在item_sample.xml的

```
<DirectionalLayout
    ...
    ohos:background_element="#FAEBD7">
    ...
</DirectionalLayout>
```

ListContainer布局文件中添加背景色

```
<ListContainer
    ...
    ohos:background_element="#FFDEAD"/>
```

#### 列表容器的开始偏移量为32，结束偏移量为16效果
![][5]

### 4.3 设置回弹效果

#### 在xml中设置

```
<ListContainer
    ...
    ohos:rebound_effect="true"/>
```

#### 在Java代码中设置

```
listContainer.setReboundEffect(true);
```

#### 回弹效果
![][6]

#### 调整回弹效果

在开启回弹效果后，可以调用setReboundEffectParams()方法调整回弹效果。

```
listContainer.setReboundEffectParams(40,0.6f,20);
```

### 4.4 设置着色器颜色

#### 在xml中设置

```
<ListContainer
    ...
    ohos:shader_color="#90EE90"/>
```

#### Java代码中设置

```
listContainer.setShaderColor(new Color(Color.getIntColor("#90EE90")));
```

#### 设置着色器效果
![][7]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-listcontainer-priview.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-listcontainer-click.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-listcontainer-longclick.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-listcontainer-horizontal.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-listcontainer-offset.gif
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-listcontainer-rebound-effect.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-listcontainer-shader-color.gif