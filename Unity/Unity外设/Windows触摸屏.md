# 设置指定屏幕对应的触摸屏

控制面板-tablet PC
3D Vision无效时，重新拔插多余的触摸屏(USB)即可恢复



# Windows触摸屏特点

外挂式触摸屏只支持两点触摸，两点单击等于鼠标右键
两点触摸精度很差，只用一点触摸就够了

3D场景拖拽代码示例：
```
// 记录一个手指的移动
Vector2 mov0 = new Vector2();
Vector2 touchPositionLatest = new Vector2();
void LateUpdate()
{
    if (Input.GetMouseButtonDown(0))
    {
        touchPositionLatest = Input.mousePosition;
    }
    else if (Input.GetMouseButton(0))
    {
        mov0 = Input.mousePosition - (Vector3)touchPositionLatest;
        touchPositionLatest = Input.mousePosition;
        xDeg += mov0.x / 8;
        yDeg -= mov0.y / 8;
    }
    else
    {
        mov0 = Vector2.zero;
    }
}
```

UGUI拖拽代码示例：
```
using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.EventSystems;
public class WindowsTouchDrag : MonoBehaviour, IDragHandler
{
    RectTransform rect;
    // Use this for initialization
    void Start()
    {
        rect = GetComponent<RectTransform>();
    }
    public void OnDrag(PointerEventData eventData)
    {
        rect.anchoredPosition += eventData.delta;
    }
}
```



# *Windows多点触摸实现

Windows多点触摸实现原理：利用DLL读取当前所有手指触摸信息

DLL源文件：
[DLLMain.cpp](Windows触摸屏_files/DLLMain.cpp)

已经编译好的DLL：
[Plugins.rar](Windows触摸屏_files/Plugins.rar)

实时检查触摸状态代码示例：
[TouchInput.cs](Windows触摸屏_files/TouchInput.cs)

读取所有手指触摸信息代码示例：
[Check1.cs](Windows触摸屏_files/Check1.cs)