## 使用
首先需要选中一个包含**mesh**或**skinned mesh**的asset或GameObject，然后运行"GameObject/Cruncher/Convert Selection…"，Cruncher将会创建一个新的asset到硬盘中。
**注意：不要使用Unity自带的"Optimize Mesh"，会和Cruncher产生冲突。**

## Convert Selection窗口
你能改变asset的文件后缀名，默认是"LOD"。还可以设置生成几个LOD，每个LOD可以单独控制Mesh的质量或数量，质量是数量的规范化。
* 质量：范围0~1，1表示无损优化
* 数量：你想要得到的三角面数，Cruncher会产生一个最接近该值的Mesh

## Cruncher Target Inspector
你可以通过Live Preview（实时）或Preview Changes（非实时）来预览生成的Mesh。单击Apply按钮将更改保存到硬盘上，单击Revert按钮将撤销更改。

## Cruncher Root Inspector
* 修改模式
	* 绝对修改：每个LOD都会变成该数值
	* 相对修改：每个LOD应用相对值修改
