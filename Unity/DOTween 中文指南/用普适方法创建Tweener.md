# 用普适方法创建Tweener

用这种方法是最灵活的，这种方式还有一个From()版本，默认是To()版本。
在To()后面加From()变成FROM版本：
```
transform.DOMoveX(2, 1).From();
transform.DOMoveX(2, 1).From(true);
```

`static DOTween.To(getter, setter, to, float duration)`
`static DOTween.To(setter, float startValue, float endValue, float duration)`
```
// Tween a Vector3 called myVector to 3,4,8 in 1 second
DOTween.To(()=> myVector, x=> myVector = x, new Vector3(3,4,8), 1);
// Tween a float called myFloat to 52 in 1 second
DOTween.To(()=> myFloat, x=> myFloat = x, 52, 1);
```

使用示例：
```
DOTween.To(
    () => { return grayscale.rampOffset; },
    (x) => { grayscale.rampOffset = x; },
    1, 10
    );
```




# 除TO和FROM之外的其他动画

向一个方向上振动（没有FROM版本）：
`static DOTween.Punch(getter, setter, Vector3 direction, float duration, int vibrato, float elasticity)`
direction：方向和强度
vibrato：一个周期振动几次
elasticity：反弹到反方向的距离(0 to 1)
<br>

平移振动（没有FROM版本）：
`static DOTween.Shake(getter, setter, float duration, float/Vector3 strength, int vibrato, float randomness, bool ignoreZAxis)`
strength：每个坐标轴上振动的强度
vibrato：一个周期振动几次
randomness：来回折返的角度(0 to 360)，建议取90以内
elasticity：反弹到反方向的距离(0 to 1)
例子：
```
DOTween.Shake(()=> myVector, x=> myVector = x, 1, 5, 10, 45, false);
```
<br>

颜色的Alpha值动画：
`static DOTween.ToAlpha(getter, setter, float to, float duration)`
例子：
```
DOTween.ToAlpha(()=> myColor, x=> myColor = x, 0, 1);
```
<br>

分段动画：
`static DOTween.ToArray(getter, setter, float to, float duration)`
duration：每一段分动画的时长（可数组，数组长度必须和to数组相同）
例子：
```
// Tween a Vector3 between 3 values, for 1 second each
Vector3[] endValues = new[] { new Vector3(1,0,1), new Vector3(2,0,2), new Vector3(1,4,1) };
float[] durations = new[] { 1, 1, 1 };
DOTween.ToArray(()=> myVector, x=> myVector = x, endValues, durations);
```





