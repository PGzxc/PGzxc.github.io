---
title: React Native开发之——组件Button(14)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件Button
abbrlink: cba43e80
date: 2018-03-07 10:14:43
---
## 一 概述
```
Button-按钮，平时开发中再熟悉不过的东西了，React Native 0.37之前并没有Button按钮，
一直用TouchableOpacity 或 TouchableNativeFeedback替代，
React Native 0.37开始加入Button组件，今天我们要学的就是Button组件。

- title
- color
- disabled
- accessibilityLabel
- onPress
```

<!--more-->

## 二 Button属性

```
1、title属性
设置Button上显示的文字，类型为string

2、color属性
Button没有background属性，通过color来显示Button的背景色

3、disabled属性
boolean类型值，设置Button是否可以点击。

4、accessibilityLabel属性
辅助功能，用于显示盲人可访问性特征的文本

5、onPress属性
设置Button的点击事件。
```

## 三 实战
### 3.1 代码 

	export default class App extends Component<Props> {
	  render() {
	    return (
	      <View style={styles.container}>
	        <Button
	          onPress={this.onPress}
	          title="Learn More"
	          color="#f00"
	          disabled={false}
	          testID={"button"}
	          accessibilityLabel="Learn more about this purple button"
	        />
	      </View>
	    );
	  }
	  onPress() {
	    alert("onPress");
	  }
	}

### 3.2 效果图 
![][1]
## 四 参考
参考： [RN_Button][2]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-button-look.gif
[2]: https://github.com/PGzxc/RN_Button