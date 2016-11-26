## Unity插件中需要修改的部位 ##
- VRManagerScript.cs：第138行（全屏限制），MiddleVRTools.IsEditor永远置为true。
- VRManagerScript.cs：第305行（抗锯齿限制），取消对QualitySettings的所有操作。
- VRCustomEditor.cs：第38行开始（分辨率对话框限制），添加return，取消对PlayerSettings的所有操作。
- （可选）VRManagerScript.cs：将所有MiddleVRTools.CreateViewportsAndCameras()注释掉，防止MiddleVR修改Camera。
- 去水印方法：将所有Camera上的GUILayer组件取消激活，但千万不要删除。

注意事项 ❶：必须将MiddleVR自动生成的Camera全部禁用，例如Camera0必须绑定DisableTheCamera.cs。
**DisableTheCamera.cs**：

    void Update()
    {
	    if(camera.enabled)
	    	camera.enabled = false;
	    this.enabled = false;
    }

注意事项 ❷：必须先以窗口模式进入游戏再按F11全屏，通过绑定F11FullScreen.cs。
**F11FullScreen.cs**：

	void Update()
	{
	    if(Input.GetKeyDown(KeyCode.F11)){
	        Screen.fullScreen = !Screen.fullScreen;
	    }
	}














