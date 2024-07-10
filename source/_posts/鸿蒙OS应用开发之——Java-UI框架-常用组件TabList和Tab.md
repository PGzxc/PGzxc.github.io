---
title: 鸿蒙OS应用开发之——Java UI框架-常用组件TabList和Tab
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 8ca81ecd
date: 2021-01-05 10:57:22
---
## 一 概念

* Tab为某个页签
* TabList为包含Tab的页签栏，可以实现多个页签的切换

![][1]

<!--more-->

## 二 创建TabList

### 3.1 XML中创建TabList

```
<?xml version="1.0" encoding="utf-8"?>
<DirectionalLayout
    xmlns:ohos="http://schemas.huawei.com/res/ohos"
    ohos:height="match_parent"
    ohos:width="match_parent"
    ohos:orientation="vertical">

    <TabList
        ohos:id="$+id:tab_list"
        ohos:top_margin="10vp"
        ohos:tab_margin="24vp"
        ohos:tab_length="140vp"
        ohos:text_size="20fp"
        ohos:height="36vp"
        ohos:width="match_parent"
        ohos:layout_alignment="center"
        ohos:orientation="horizontal"
        ohos:text_alignment="center"
        ohos:normal_text_color="#999999"
        ohos:selected_text_color="#FF0000"
        ohos:selected_tab_indicator_color="#FF0000"
        ohos:selected_tab_indicator_height="2vp"/>

</DirectionalLayout>
```

### 3.2 代码中添加Tab

```
 TabList tabList = (TabList) findComponentById(ResourceTable.Id_tab_list);

  TabList.Tab tab = tabList.new Tab(getContext());
  tab.setText("Image");
  tabList.addTab(tab);

  TabList.Tab tab2 = tabList.new Tab(getContext());
  tab2.setText("Video");
  tabList.addTab(tab2);

  TabList.Tab tab3 = tabList.new Tab(getContext());
  tab3.setText("Audio");
  tabList.addTab(tab3);

  TabList.Tab tab4 = tabList.new Tab(getContext());
  tab4.setText("HuaWei Share");
  tabList.addTab(tab4);

  tabList.setFixedMode(true);
  tabList.selectTab(tab);
```

### 3.3 响应焦点变化

```
tabList.addTabSelectedListener(new TabList.TabSelectedListener() {
   @Override
   public void onSelected(TabList.Tab tab) {
          // 当某个Tab从未选中状态变为选中状态时的回调
          new ToastDialog(getContext()).setText("onSelected").show();
     }
     @Override
     public void onUnselected(TabList.Tab tab) {
         // 当某个Tab从选中状态变为未选中状态时的回调
           new ToastDialog(getContext()).setText("onUnselected").show();

      }
     @Override
     public void onReselected(TabList.Tab tab) {
          // 当某个Tab已处于选中状态，再次被点击时的状态回调
          new ToastDialog(getContext()).setText("onReselected").show();
       }
  });
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-tablelist-switch.gif