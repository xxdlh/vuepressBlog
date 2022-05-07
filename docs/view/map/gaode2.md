## 高德地图结合Vue自定义信息弹窗

#### 1.自定义信息弹窗
index.js
```js
import Vue from 'vue'
import infoWindow from './index.vue'

const infoWindowConstructor = Vue.extend(infoWindow)

const createInfoWindowComponent = function (options) {
  //传参数据
  options = options || {}
  let windowInstance = new infoWindowConstructor({
    propsData: options || {}
  }).$mount()
  return windowInstance.$el
}
export default createInfoWindowComponent

```

index.vue
```js
<template>
  <div class="info-window">
    <p class="name">头状四照花</p>
    <p class="age">树龄：200年</p>
  </div>
</template>

<script>
export default {
  name: "InfoWindow",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script> 

<style lang="less" scoped>
.info-window {
  padding: 15px 20px;
  background: rgba(10, 38, 27, 0.9);
  border: 1px solid #1eae51;
  border-radius: 2px;
  position: relative;
  &::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #1eae51;
    position: absolute;
    bottom: -20px;
    left: calc(50% - 10px);
  }
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #086d15;
    position: absolute;
    bottom: -16px;
    left: calc(50% - 8px);
  }
  .name,
  .age {
    font-size: 16px;
    color: #ffffff;
  }
  .name {
    font-weight: bold;
    margin-bottom: 6px;
  }
}
</style>

```


#### 2.使用自定义弹窗
```js
// 设置信息窗口
const infoWindow = new AMap.InfoWindow({
  // 使用自定义窗体
  isCustom: true,
  // 只有当组件渲染完毕后，通过$el才能拿到原生的dom对象
  content: createInfoWindowComponent(),
  // 设置定位偏移量
  offset: new AMap.Pixel(8, -15),
});
this.infoWindow = infoWindow;
// 视频监控窗口打开
infoWindow.open(this.map, lnglat);
```