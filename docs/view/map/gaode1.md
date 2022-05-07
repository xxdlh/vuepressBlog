## 高德地图 绘制区域遮罩及边界线

### 1.通过 AMap.DistrictSearch 搜索获取区域边界点，利用边界点信息通过AMap.Polygon绘制多边形

```js
//行政区划查询
var opts = {
  // level: 'province',// 设置查询行政区级别
  showbiz: false, //最后一级返回街道信息
  extensions: "all", // 返回行政区边界坐标点
  subdistrict: 1, //返回下一级行政区
};
let district = new AMap.DistrictSearch(opts); //注意：需要使用插件同步下发功能才能这样直接使用

//行政区查询
district.search("太原市", (status, result) => {
  if (status === "complete") {
    // 绘制区域
    let polygons = []; //绘制区域面积图的数组
    var bounds = result.districtList[0].boundaries;
    if (bounds) {
      for (var i = 0, l = bounds.length; i < l; i++) {
        var polygon = new AMap.Polygon({
          map: this.map,
          strokeWeight: 2,
          strokeColor: "#00FF00",
          fillColor: "#099F3D",
          fillOpacity: 0.3,
          path: bounds[i],
        });
        polygons.push(polygon);
      }
      // this.map.setFitView(); //地图自适应
    }
  }
});
```


### 2.通过[DataV.GeoAtlas](http://datav.aliyun.com/portal/school/atlas/area_selector#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5)获取区域的geoJson数据,利用AMap.GeoJSON的getPolygon()方法
```js
//获取geoJson数据
api.getJinchengJson("data/map-json/ty.json").then((geoJSON) => {
  var geojson = new AMap.GeoJSON({
    geoJSON: geoJSON,
    //指定面要素的绘制方式
    getPolygon: (geojson, lnglats) => {//geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
      //绘制多边形
      return new AMap.Polygon({
        map: this.map,
        path: lnglats,
        strokeWeight: 2,
        strokeColor: "#00FF00",
        fillColor: "#099F3D",
        fillOpacity: 0.3,
      });
    },
  });
```