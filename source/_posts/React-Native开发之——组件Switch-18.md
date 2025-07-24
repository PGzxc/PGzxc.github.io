---
title: React Native开发之——组件Switch(18)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件Switch
abbrlink: 9e4bd9a5
date: 2018-03-12 11:16:07
---
## 一 概述
```
Switch：开关控件，类似于Android中的开关控件Switch。
它需要一个onValueChange更新的回调函数value为了使组件反映用户操作，
如果value组件未更新，组件将继续呈现所提供的value支持任何用户操作的预期结果。 
```

<!--more-->

## Switch 介绍

### 2.1 属性

```
它有以下属性：  

- value:是否打开。默认为false 
- disabled:是否禁用 默认false 
- onTintColor：打开时背景色 
- thumbTintColor：圆形按钮的背景颜色 
- tintColor：关闭时的边框颜色(iOS)或者背景颜色(Android)。 
- onValueChange：value值发生变化时的回调，参数为当前Switch的值。
```


### 2.2 实例 

```
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      switchstate: true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Switch
          value={this.state.switchstate}
          onValueChange={(value) => this.setState({ switchstate: value })}
        />
        <Switch disabled={true} />
        <Switch
          onTintColor={"#f00"}
          value={this.state.switchstate}
          onValueChange={(value) => this.setState({ switchstate: value })}
        />
        <Switch
          tintColor={"#00f"}
          value={this.state.switchstate}
          onValueChange={(value) => this.setState({ switchstate: value })}
        />
      </View>
    );
  }
}
```

### 2.3 效果图 
![][1]

## 三 参考
参考：[Github下载地址][2]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-switch.gif
[2]: https://github.com/PGzxc/RN_Switch