# 创建UGUI动画

**Fades out**
```
image.DOFade(0, 1.5f);
```

**颜色动画**
```
image.DOColor(RandomColor(), 1.5f);
```

**图片的Fill Amount动画**
```
image.DOFillAmount(0, 1.5f)
    .OnStepComplete(()=> {
        image.fillClockwise = !circleOutline.fillClockwise;
   });
```
   
**文字动画（打字特效）**
```
text.DOText("This text will replace the existing one", 2);  //替换原文字
text.DOText(" - This text will be added to the existing one", 2).SetRelative();  //在原文字后面添加
```

**改变滑块动画**
```
slider.DOValue(1, 1.5f);
```