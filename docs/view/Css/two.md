---
title: 切换分辨率，banner图水平居中
date: 2022-03-01
tags:
 - Css
categories:
 - frontEnd
---

# 切换分辨率，banner图水平居中

``` html
<div class="banner-box">
  <img class="banner-img" src="" alt="" />
</div>
```
#### 图片按1920*height设置,降低分辨率时，图片不变，宽度显示不全，两边多余部分隐藏，始终水平居中显示
``` css
.banner-box{
  width:100%;
  /* banner图高 */
  height: 400px;
  position: relative;
}
.banner-img {
  /* banner图宽 */
  width: 1920px;
  height: 100%;
  margin-left: -960px;
  position: absolute;
  left: 50%;
}
```