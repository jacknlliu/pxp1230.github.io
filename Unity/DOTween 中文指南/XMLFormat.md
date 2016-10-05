# dotween-assembly元素
XML的根节点为dotween-assembly元素，该元素的属性为一些文件描述信息：
* file_name：文件名，如“as1-ac-214.asmb”
* time_stamp：文件创建时间戳，如“1999-09-09T14:22:00+00:00”
* author：作者
* organization：作者所属机构
* generator：创建该文件所使用的工具，如“ASMB Editor v0.1”

# product元素
product元素描述了模型的装配树状结构（assembly tree of the model），该元素的属性有：
* id：该编组的id
* name：该编组的名称
* shape：该编组对应零件的id
* local_position：该编组的局部坐标位置
* local_rotation：该编组的局部旋转四元数
* type：该编组所属的类型，如“工具”

## product/hint
提示信息
* id：hint元素id

## product/product
同product元素

# shape元素
shape元素描述了单个零件（动态加载的AssetBundle），shape元素的属性有：
* id：该零件的id
* name：该零件的名称（同文件名，名字唯一）
* file_path：AssetBundle文件所在路径（缺省时根据name查找该文件）

## shape/hint
提示信息
* id：hint元素id

# tween元素
tween元素描述了product元素或shape元素的拆装动画信息，该元素的属性有：
* product_id：动画所属的编组
* shape_name：动画所属零件或子零件的名称（如"SL0017"、"SL0017/Arm/Hand"；缺省时代表该动画属于product元素）
* method：动画类型，如“DOMove”
* start：动画计时（可选），什么时候应播放动画，允许的值有"follow"（上一动画之后，默认值）、"together"（与上一动画同时）、"auto"（从一开始时）
* hint：hint元素id

## tween/parameter-info
parameter-info元素为tween元素的子元素，描述了对应动画类型的相关参数，该元素的属性有：
* name：参数名称，如“endValue”
* parameter_type：参数类型，如“System.Single”
* value：该参数的数值

## tween/tween-setting
tween-setting元素为tween元素的子元素，描述了该动画的相关设置信息，该元素的属性有：
* method：设置类型，如“SetEase”

### tween/tween-setting/parameter-info
同tween/parameter-info

# 范例
```xml
<dotween-assembly file_name="new.asmb" time_stamp="3/16/2016 5:55:30 PM" author="马小明" organization="江南造船厂" generator="ASMB Editor v0.1">
  <product id="0" name="底边舱分段" local_position="0 0 0" local_rotation="0 0 0 1" shape="1">
    <hint id="30">[这里输入提示信息]</hint>
    <product id="2" name="钢板1" local_position="-1 1 0" local_rotation="0 0 0 1" shape="3" />
    <product id="4" name="钢板2" local_position="1 0.6788976 0" local_rotation="0 0 0 1" shape="3" />
  </product>
  <product id="5" name="钢板1" local_position="-1 -1 0" local_rotation="0 0 0 1" shape="3" />
  <product id="6" name="钢板2" local_position="1 -1 0" local_rotation="0 0 0 1" shape="3" />
  <shape id="1" name="PrimitiveType.Capsule">
    <hint id="31">[这里输入提示信息]</hint>
  </shape>
  <shape id="3" name="PrimitiveType.Cube" />
  <tween product_id="2" method="DOLocalMoveY" start="click" hint="30">
    <parameter-info name="endValue" parameter_type="System.Single" value="1" />
    <parameter-info name="duration" parameter_type="System.Single" value="2" />
    <parameter-info name="snapping" parameter_type="System.Boolean" />
    <tween-setting method="Play" />
  </tween>
  <tween product_id="4" method="DOLocalMoveY" start="follow">
    <parameter-info name="endValue" parameter_type="System.Single" value="1" />
    <parameter-info name="duration" parameter_type="System.Single" value="2" />
    <parameter-info name="snapping" parameter_type="System.Boolean" />
    <tween-setting method="SetLoops">
      <parameter-info name="loops" parameter_type="System.Int32" value="-1" />
    </tween-setting>
  </tween>
</dotween-assembly>
```
