---
title: 通过border实现三角
date: 2022-02-28
tags:
 - Css
categories:
 - frontEnd
---

::: tip
这是一个提示
:::

## 通过border实现三角

通过将元素宽高设置为0，控制border来得到想要的三角形.
将不需要方向的border设置为透明（transparent），就可以用来实现三角形了。
比如想实现下三角形，就将border-left，border-bottom，border-right设置为transparent即可。
```css
#box{
  width:0px;
  height:0px;
  border-top: 20px solid red;
  border-right:20px solid transparent;
  border-bottom:20px solid transparent;
  border-left:20px solid transparent;
}
```