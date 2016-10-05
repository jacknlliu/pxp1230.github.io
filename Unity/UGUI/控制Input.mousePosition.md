# 控制Input.mousePosition

1. 将UGUI中的 PointerInputModule.cs 和 StandaloneInputModule.cs 拷贝出一份，重命名为 PointerInputModule_plus.cs 和 StandaloneInputModule_plus.cs，并修改其中一些关联标识符。

1. 创建 NewMousePosition.cs 文件，代码如下：

	```
	using UnityEngine;
	using System.Collections;
	
	public class NewMousePosition : MonoBehaviour
	{
	    public static Vector3 mousePosition;
	    public RectTransform mouse;
	    public struct ButtonState
	    {
	        public int count;
	        public bool isDown;
	        public bool isUp;
	        public bool isCounting;
	        public void Update(bool isPressed)
	        {
	            if (isPressed)
	            {
	                isCounting = true;
	                ++count;
	            }
	            else
	                isCounting = false;
	
	            if (isUp)
	                count = 0;
	
	            if (count == 1)
	                isDown = true;
	            else
	                isDown = false;
	
	            if (count != 0 && !isCounting)
	                isUp = true;
	            else
	                isUp = false;
	        }
	    }
	    static ButtonState triggerButtonState;
	
	
	    void Update()
	    {
	        //原始：mousePosition = Input.mousePosition;
	        mousePosition = mouse.anchoredPosition;
	        triggerButtonState.Update(Input.GetButton("Fire1"));
	    }
	
	    public static bool GetMouseButtonDown(int button)
	    {
	        //原始：return Input.GetMouseButtonDown(button);
	        return triggerButtonState.isDown;
	    }
	
	    public static bool GetMouseButtonUp(int button)
	    {
	        //原始：return Input.GetMouseButtonUp(button);
	        return triggerButtonState.isUp;
	    }
	}
	```

1. 对 PointerInputModule_plus.cs 和 StandaloneInputModule_plus.cs 中的所有 Input 操作进行替换：
	Input.mousePosition → NewMousePosition.mousePosition
	Input.GetMouseButtonDown(buttonId) → NewMousePosition.GetMouseButtonDown(buttonId)
	Input.GetMouseButtonUp(buttonId) → NewMousePosition.GetMouseButtonUp(buttonId)


















