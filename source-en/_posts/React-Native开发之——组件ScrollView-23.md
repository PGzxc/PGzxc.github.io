---
title: React Native开发之——组件ScrollView(23)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件ScrollView
abbrlink: 13ea2994
date: 2018-03-19 17:50:17
---
## 一 概述 
```
ScrollView是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。
ScrollView不仅可以垂直滚动（默认），还能水平滚动（通过horizontal属性来设置）。  
```

<!--more-->

## 二 组件ScrollView属性
### 2.1 本文介绍一些ScrollView常用属性  
```
- horizontal（布尔值）：当此属性为true的时候，所有的的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为false。
- showsHorizontalScrollIndicator（布尔值）：当此属性为true的时候，显示一个水平方向的滚动条。
- showsVerticalScrollIndicator（布尔值）：与showsHorizontalScrollIndicator相对，当此属性为true的时候，显示一个垂直方向的滚动条。
- OnMomentumScrollEnd（function） ：当一帧滚动完毕的时候调用，e.nativeEvent.contentOffset，可以用来获取偏移量。
- onScrollBeginDrag（function） ：当开始手动拖拽的时候调用。
- onScrollEndDrag（function） ：当结束手动拖拽的时候调用。
- onScroll（function） ：在滚动的过程中，每帧最多调用一次此回调函数。调用的频率可以用scrollEventThrottle属性来控制。
```

## 三 代码实例 

### 3.1 示例-轮播图 

```
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {/* 实例化ScrollView */}
        <ScrollView
          style={styles.scrollViewStyle}
          horizontal={true} // 水平方向
          showsHorizontalScrollIndicator={false} // 隐藏水平指示器
          showsVerticalScrollIndicator={false} // 隐藏垂直指示器
          pagingEnabled={true} // 开启分页功能
        >
          {/* 实例化内部子视图 */}
          {this.renderItem()}
        </ScrollView>
      </View>
    );
  }
  // scrollView子视图
  renderItem() {
    var itemAry = [];
    // 获取json中图片
    var imgAry = constantData.data;
    // 根据json数据实例化视图
    for (var i = 0; i < imgAry.length; i++) {
      // 取出单个对象
      var item = imgAry[i];
      // 将子视图放进 itemAry
      itemAry.push(
        // 实例化子视图
        <Image key={i} style={styles.itemStyle} source={{ uri: item.image }} />
      );
    }

    // 返回数组
    return itemAry;
  }
}
```

### 3.2 效果图 
| 1-效果1 | 2-效果2 |
| :-----: | :-----: |
| ![][1]  | ![][2]  |

## 四 参考 
参考：[Github下载][3]

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-scroll-view.gif
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-scroll-top.gif
[3]: https://github.com/PGzxc/RN_ScrollView