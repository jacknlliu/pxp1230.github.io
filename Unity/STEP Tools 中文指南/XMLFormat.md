官方文档：http://www.steptools.com/support/stdev_docs/stixmesh/XMLFormat.html

## step-assembly元素
XML的根节点为step-assembly元素，这个元素只有一个属性：
* root：根编组的id

## product元素
product元素描述了模型的装配树状结构（assembly tree of the model），该元素的属性有：
* id：该编组的id
* step：该编组的URL路径
* name：该编组的名称
* shape：该编组对应零件的id
* children：该编组的所有子编组id，空格隔开

## shape元素/child元素
shape元素描述了单个零件，零件可能包含多个子零件（child元素），如果该shape没有子零件，就会有shell属性，shape元素的属性有：
* id：零件的id
* shell：零件对应的网格id
* unit：单位，如"mm 0.001000"表示1单位等于0.001m
* shell：零件没有子零件时才有该属性，对应于该零件的网格id（shell元素）
child元素用于描述子零件和子零件相对于父节点的几何变换矩阵（OpenGL列主序），child元素的属性有：
* ref：子零件id（shape元素）
* xform：几何变换矩阵，由16个浮点数组成

## shell元素
shell元素描述了一个网格，包括顶点数组和三角形索引数组，该元素的属性有：
* id：网格的id
* color：网格的颜色，如"ff0000"

### shell/verts
顶点数组，无属性，一个shell只能有一个verts元素

### shell/verts/v
顶点数组中的顶点元素，含有一个p属性，如<v p="30 4.99999999999997 5"/>

### shell/facets
三角形索引数组，含有一个color属性（覆盖shell的color），一个shell可以有多个facets元素（多个子网格）

### shell/facets/f
一个三角形，包含顶点索引和法线，如：
```xml
<f v="35 43 42">
	<n d="-1.13138842236868e-016 0.923879535433178 -0.38268342531102"/>
	<n d="-1.13138842236897e-016 0.923879535433416 -0.382683425310447"/>
	<n d="-8.65927206881733e-017 0.707106781186547 -0.707106781186548"/>
</f>

```
