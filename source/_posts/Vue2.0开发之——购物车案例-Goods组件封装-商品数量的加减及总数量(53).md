---
title: Vue2.0开发之——购物车案例-Goods组件封装-商品数量的加减及总数量(53)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: aa0013d5
date: 2023-03-06 10:37:06
---
## 一 概述

* Goods点击加减实现修改数量的原理
* Goods点击`+`增加实现实例
* Goods点击`-`减少实现实例
* Footer计算商品总数量

<!--more-->

## 二  Goods点击加减实现修改数量的原理

* 点击Counter组件里面的加减，修改Counter组件里面的数量
* Counter组件的数量变化时，Goods商品的数量相应变化
* Goods组件的变化，最终导致App.vue中list中相应Item中goods_count的变化

显示：App(list)——>Goods([Item-goods_count])——>Counter(num)

变化：Counter(num)——>EventBus——>App(list)

## 三 Goods点击`+`增加实现实例

### 3.1 Counter组件中定义商品id

```
export default {
  props:{
    //商品id值，将来，使用EventBus方案，把数量传递到App.vue的时候，需要通知App组件，更新哪个商品的数量
    id:{
      type:Number,
      default:1
    }
  }
}
```

### 3.2 Goods组件中把id传递给Counter组件中

```
<Counter :num="good.goods_count" :id="id"></Counter>
```

### 3.3 Counter组件中点击`+`时点击方法

组件处添加click方法

```
<button type="button" class="btn btn-light btn-sm" @click="add">+</button>
```

add方法发送obj对象给App.vue

```
methods:{
    add(){
      const obj={id:this.id,value:this.num+1}
    }
  }
```

### 3.4 定义EventBus.js

```
import Vue from 'vue'

export default new Vue()
```

### 3.5 Counter组件导入Eventbus后，发送事件

导入eventBus

```
import bus from '@/components/eventBus.js'
```

add方法中发送事件给App.vue

```
add(){
      const obj={id:this.id,value:this.num+1}
      bus.$emit('share',obj)
}
```

### 3.6 在App.vue组件的created方法中接收事件

导入eventBus

```
import bus from '@/components/eventBus.js'
```

created方法中接收

```
created() {
    //调用请求数据的方法
    this.initCartList();
    //接收自定义事件
    bus.$on('share',val=>{
      this.list.some(item=>{
        if(item.id===val.id){
          item.goods_count=val.value
          return true
        }
      })
    })
  },
```

### 3.7 效果图
![][1]

## 四 Goods点击`-`减少实现实例

### 4.1 Counter组件中点击`-`时点击方法

组件处添加click方法

```
<button type="button" class="btn btn-light btn-sm" @click="sub">-</button>
```

sub方法中发送事件给App.vue

```
methods:{
    add(){
      const obj={id:this.id,value:this.num+1}
      bus.$emit('share',obj)
    },
    sub(){
      if(this.num-1==0)return
      const obj={id:this.id,value:this.num-1}
      bus.$emit('share',obj)
    }
}
```

### 4.2 效果图

![][2]

## 五 Footer计算商品总数量

### 5.1 App.vue中定义勾选商品的总数量

计算勾选商品的总数量

```
 //计算属性
  computed: {
    //已勾选商品的总数量
    total(){
      return this.list.filter(item=>item.goods_state).reduce((t,item)=>(t+=item.goods_count),0)
    }
  },
```

### 5.2 Footer组件中定义接收传递过来的总数量

定义勾选商品数量属性

```
props: {
    all:{
      type:Number,
      default:0
    }
  },
```

渲染到Footer组件中

```
<!-- 结算按钮 -->
<button type="button" class="btn btn-primary btn-settle">
      结算（{{ all }}）
</button>
```

### 5.3 父传子给Footer组件

```
<Footer
      :isFull="fullState"
      :amount="amt"
      :all="total"
      @full-change="getFullState">
</Footer>
```

### 5.4 效果图

![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-53-cart-goods-num-add.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-53-cart-goods-num-sub.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-53-cart-footer-total.gif
