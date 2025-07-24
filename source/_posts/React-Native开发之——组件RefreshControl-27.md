---
title: React Native开发之——组件RefreshControl(27)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件RefreshControl
abbrlink: fe876950
date: 2018-03-24 17:02:29
---
## 一 概述 
```
这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。
当ScrollView处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个onRefresh事件。  
```

<!--more-->

##  二 RefreshControl属性
```
- onRefresh function:在视图开始刷新时调用。
- refreshing bool:视图是否应该在刷新时显示指示器。
- colors(Android) [ColorPropType]:指定至少一种颜色用来绘制刷新指示器。
- enabled(Android) bool:指定是否要开启刷新指示器。
- progressBackgroundColor(Android) ColorPropType:指定刷新指示器的背景色。
- size RefreshLayoutConsts.SIZE.DEFAULT:指定刷新指示器的大小，具体数值可参阅RefreshControl.SIZE.
- progressViewOffset(Android) React.PropTypes.number：指定刷新指示器的垂直起始位置(top offset)。
- tintColor(IOS) ColorPropType ：指定刷新指示器的颜色。
- title(IOS) string ：指定刷新指示器下显示的文字。
```

## 三 示例

### 3.1 代码实例 

```
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { isRefreshing: false };
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
      //加载数据
    }, 2000);
  }

  render() {
    return;
    <View style={styles.contain}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={["#ff0000", "#00ff00", "#0000ff"]}
            progressBackgroundColor="#ffff00"
          />
        }
      >
        <Text>显示数据</Text>
      </ScrollView>
    </View>;
  }
}

const styles = StyleSheet.create({
  contain: { flex: 1 },
});
```

### 3.2 效果图
![][1]  
## 四 参考
参考：[Github下载][2]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-refreshcontrol.gif
[2]: https://github.com/PGzxc/RN_RefreshControl