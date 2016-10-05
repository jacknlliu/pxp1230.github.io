## 原生Stereoscopic Rendering ##
> Note: Currently, setting Unity to render in linear color space breaks stereoscopic rendering. This appears to be a Direct3D limitation. It also appears that the camera.stereoconvergence param has no effect at all if you have some realtime shadows enabled (in forward rendering). In Deferred Lighting, you will get some shadows, but insconsistent between left & right eye.

*窗口模式（在快捷方式中加参数-popupwindow可以去窗口边框）或全屏模式下的设置：

![](-原生Stereoscopic Rendering/1.png)

*遇到同步信号不同步时，只要切换一下主显示器即可（3D显示器必须作为主显示器）：

![](-原生Stereoscopic Rendering/2.jpg)

*窗口模式下也可以使用D3D9（在快捷方式中加参数-popupwindow可以去窗口边框）：

![](-原生Stereoscopic Rendering/3.png)

![](-原生Stereoscopic Rendering/4.png)

![](-原生Stereoscopic Rendering/5.png)

![](-原生Stereoscopic Rendering/6.png)










