# 创建动画序列（Sequence）

使用Sequence类可以方便的组织Tweens来制作复杂的过渡动画。Sequence的几个函数文档说明都比较简单，我列出每个函数调用后的Sequence变化以方便查阅。

例子：
```
Sequence s = DOTween.Sequence();  //创建一个动画序列
s.Append(cube.DOMoveX(6, duration).SetRelative().SetEase(Ease.InOutQuad));
s.Insert(0, cube.DORotate(new Vector3(0, 45, 0), duration / 2).SetEase(Ease.InQuad).SetLoops(2, LoopType.Yoyo));
s.Insert(duration / 2, cube.GetComponent<Renderer>().material.DOColor(Color.yellow, duration / 2));
s.SetLoops(-1, LoopType.Yoyo);  //悠悠球型循环
```

DOTween Sequence 使用图解：
http://blog.csdn.net/jiejieup/article/details/41521577