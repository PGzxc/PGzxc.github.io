---
title: Vue2.0开发之——购物车案例-Goods组件封装-修改商品的勾选状态(49)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: b2d4bc8d
date: 2023-03-06 09:53:46
---
## 一 概述

* 如何修改商品的勾选状态
* 自定义state-change事件
* 修改对应商品的勾选状态

<!--more-->

## 二 如何修改商品的勾选状态

### 2.1 App.vue中data每个Item中goods_state的变化伴随商品勾选状态变化

![][1]

### 2.2 Goods.vue中复选框的值是props属性

```
<input
       type="checkbox"
       class="custom-control-input"
       id="cb1"
       :checked="good.goods_state"
       />
```

说明：

* props是只读的，不是data属性，无法修改

### 2.3 监听Goods复选框状态变化，并将变化值修改到数据源中(子向父传值)

通过自定义事件，将商品id和商品的事件传递到父组件

#### Goods.vue中添加商品id

```
export default {
  props: {
    //商品id
    //为啥在这里要封装一个id属性呢？
    //原因：将来，子组件中商品的勾选状态变化后，需要通过子—>父的形式，通知父组件根据id修改对应商品的勾选状态
    id:{
      require:true,
      type:Number
    },
    good:{
      default:{},
      type:Object
    },
  },
};
```

#### App.vue中Goods组件设置id属性

```
<Goods
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      :good="item"></Goods>
```

### 2.4 自定义事件传值

#### Goods.vue(子组件)

* 在子组件中，要监听复选框状态变化的事件。拿到最新的勾选状态<input type='checkbx' @change="stateChange" />只要复选框的勾选状态发生变化，会自动触发change事件
* 当监听到勾选状态变化之后，应该立即把最新的状态，通过自定义事件的形式，发送给父组件。this.$emit('state-change',{id,value})，其中，id表示当前这件商品的id，value的值是最新的勾选状态

#### App.vue(父组件)

* 子组件勾选状态发生时，触发父控件的<Goods @state-change="getNewState"><\/Gods>中state-change的发生
* state-change触发时，会调用App.vue中的getNewState(e)方法
* getNewState(e)中，形参中的e，就是子组件通过$emit()传递到父控件的数据，格式为{id,value}

## 三 自定义state-change事件

### 3.1 Goods.vue中绑定事件监听

```
<input
        type="checkbox"
        class="custom-control-input"
        id="cb1"
        :checked="good.goods_state"
        @change="stateChange"
       />
```

stateChange方法将自定义事件传递给父组件

```
methods: {
    //只要复选框的勾选状态发生变化，就会调用这个函数
    stateChange(e){
      const newState=e.target.checked
      //触发自定义事件
      this.$emit('state-change',{id:this.id,value:newState})
    }
},
```

### 3.2 App.vue父组件接收自定义事件

```
<Goods
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      :good="item"
      @state-change="getNewState"
    ></Goods>
```

getNewState方法接收传递事件

```
getNewState(e){
      console.log(e)
}
```

## 四 修改对应商品的勾选状态

### 4.1 修改勾选状态代码

```
getNewState(e){
      this.list.some(item=>{
        if(item.id === e.id){
          item.goods_state=e.value
          return true
        }
      })
    }
```

### 4.2 存在的问题(修改第3条图表，第1条勾选发生变化)

![][2]



### 4.3 原因及解决办法

#### 原因—Goods.vue中id为固定值

```
<input
       type="checkbox"
       class="custom-control-input"
       id="cb1"
       :checked="good.goods_state"
       @change="stateChange"
       />
<label class="custom-control-label" for="cb1">
```

#### Goods.vue中id修改

```
<input
        type="checkbox"
        class="custom-control-input"
        :id="'cb'+id"
        :checked="good.goods_state"
        @change="stateChange"
       />
<label class="custom-control-label" :for="'cb'+id">
```





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-49-cart-check-change.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2.0-49-cart-check-change-problem.gif