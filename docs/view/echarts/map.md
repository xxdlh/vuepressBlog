## geojson地图下钻

### 获取地图json数据
从[DataV.GeoAtlas](http://datav.aliyun.com/portal/school/atlas/area_selector#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5)获取地图区域json数据

### 下钻和返回
下钻时使用选中区域的json，返回时使用上一级的json，只要在操作过程中存储下钻和返回的区域编码等标识信息，对应改变当前显示的区域json

### 利用echarts使用json显示地图
``` js
import cityMap from "@/assets/js/jin-cheng-map.js";
import api from "@/api/";
export const mapMethods = {
  data() {
    return {
      mapHistory: []
    };
  },
  methods: {
    async initMap() {
      let cityMapJson = await this.getWorldJson(cityMap["晋城市"]);
      this.loadMap("晋城市", cityMapJson);
    },
    // 地图文件
    getWorldJson(mapCode) {
      return new Promise((resolve) => {
        api
          .getJinchengJson(`/data/map-json/city-map/${mapCode}.json`)
          .then((res) => {
            resolve(res);
          });
      });
    },
    /**
     * mapName: 地图名称
     * mapJson: 地图数据
     */
    async loadMap(mapName, mapJson) {
      //注册地图
      this.$echarts.registerMap(mapName, mapJson); // mapName 如果不是china南海诸岛不会显示
      this.myChart.off("click"); // 解绑事件处理函数。为了解决地图下钻会重复触发点击事件的问题
      // mapChart的配置
      let option = {
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 32,
          },
          formatter: (params) => {
            let dataObj = params.data;
            if (params.componentType == "markPoint") {
              //marker的提示（当前分类的值）
              return `${dataObj.areaName}<br/>${dataObj.name}: ${dataObj.value}`;
            } else {
              //各区县的提示
              let str = "";
              this.typeList.map((item) => {
                //列出各分类的值
                str += `<br/>${item.name}数: ${this.regionCompanyList[item.valueName][params.name]}`;
                return;
              });
              return `${params.name}` + str;
            }
          },
        },
        geo: {
          map: mapName, //使用 registerMap 注册的地图名称
          roam: true, //开启鼠标缩放
          geoIndex: 0,
          scaleLimit: {
            min: 1,
            max: 3,
          },
          zoom: 1.2,
          //图形上的文本标签，可用于说明图形的一些数据信息
          label: {
            show: true,
            fontSize: 32,
            color: "#fff",
          },
          //地图区域的多边形 图形样式，有 normal 和 emphasis 两个状态
          itemStyle: {
            areaColor: "#04245f", //地图颜色
            borderColor: "#214b94", //地图边线颜色
            borderWidth: 2,
          },
          //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
          emphasis: {
            areaColor: "#F3B329",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        series: [
          {
            name: "晋城市",
            type: "map", //type必须声明为 map 说明该图标为echarts 中map类型
            geoIndex: 0,
            data: [
              {
                name: "沁水县"
              },
              {
                name: "阳城县"
              },
              {
                name: "高平市"
              },
              {
                name: "泽州县"
              },
              {
                name: "城区"
              },
              {
                name: "陵川县"
              }
            ],
            // markPoint: {//设置markers
            //   symbolSize: [65, 100],
            //   label: {
            //     show: true,
            //     silent: true, //图形是否不响应和触发鼠标事件
            //     position: "top",
            //     fontSize: 32,
            //     color: "#fff",
            //   },
            //   data: markerList,
            // },
          },
        ],
      };

      //使用制定的配置项和数据显示图表
      this.myChart.setOption(option, true);

      // 监听地图的点击事件
      this.myChart.on("click", (mdata) => this.lowerLevel(mdata));
    },
    // 下钻
    async lowerLevel(mdata) {
      let mapCode = cityMap[mdata.name];
      if (!mapCode) {
        //不存在此编码，无此区域地图显示
        return;
      } else if (
        this.mapHistory.length &&
        mapCode == this.mapHistory[this.mapHistory.length - 1].mapCode
      ) {
        //判断点击的编码和当前层相同，即防止无下级时重复点击
        return;
      }
      this.mapHistory.push({ name: mdata.name, mapCode: mapCode });
      let cityMapJson = await this.getWorldJson(mapCode);
      this.loadMap(mdata.name, cityMapJson, null, null);
    },
    //返回上一级地图
    async back() {
      // 弹出当前层信息
      this.mapHistory.pop();
      // 判断是否还存有，没有则加载顶层
      if (!this.mapHistory.length) {
        this.initMap();
        return;
      } else {
        //否则加载上一层
        let mapObj = this.mapHistory[this.mapHistory.length - 1];
        let cityMapJson = await this.getWorldJson(mapObj.mapCode);
        this.loadMap(mapObj.name, cityMapJson, null, null);
      }
    }
  },
}
```

#### jin-cheng-map.js
``` js
export default {
  "晋城市": "140500",
  "沁水县": "140521",
  "阳城县": "140522",
  "高平市": "140581",
  "泽州县": "140525",
  "城区": "140502",
  "陵川县": "140524"
}
```