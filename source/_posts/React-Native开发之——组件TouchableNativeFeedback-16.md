---
title: React Native开发之——组件TouchableNativeFeedback(16)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件TouchableNativeFeedback
abbrlink: 2d3fe878
date: 2018-03-08 10:37:29
---
## 一 概述
```
TouchableNativeFeedback，用于使视图正确响应触摸的包装器(仅android)。
在android上，该组件使用本地状态drawable来显示触摸反馈。
目前它只支持将单个视图实例作为子节点，因为它通过将该视图替换为另一个中的节点实例，并设置一些附加属性。
```

<!--more-->

## 二 TouchableNativeFeedback
### 2.1 属性 

```
- background
- useForeground
```

### 2.2 示例 

	export default class App extends Component<Props> {
	  render() {
	    return (
	      <TouchableNativeFeedback
	        onPress={this.onPressButton}
	        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
	        background={TouchableNativeFeedback.SelectableBackground()}
	      >
	        <View style={{ height: 100, backgroundColor: "#ccc" }}>
	          <Text style={{ margin: 30, textAlign: "center", color: "#000" }}>
	            Button
	          </Text>
	        </View>
	      </TouchableNativeFeedback>
	    );
	  }
	  onPressButton() {
	    alert("onPressButton");
	  }
	}

### 2.3 效果图
![][1]  
## 三 参考
参考：[RN_TouchableNativeFeedback][2]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-TouchableNativeFeedback.gif
[2]: https://github.com/PGzxc/RN_TouchableNativeFeedback


