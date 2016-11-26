## Kinect SDK 1.8更新 ##

**2013-09-21**
原文地址：http://guoming.me/kinect-sdk-1-8-released

[变化的SDK下载页面](http://www.microsoft.com/en-us/kinectforwindowsdev/Start.aspx)  [KinectSDK-v1.8-Setup.exe](http://download.microsoft.com/download/E/1/D/E1DEC243-0389-4A23-87BF-F47DE869FC1A/KinectSDK-v1.8-Setup.exe)      [KinectDeveloperToolkit-v1.8-Setup.exe](http://download.microsoft.com/download/D/0/6/D061A21C-3AF3-4571-8560-4010E96F0BC8/KinectDeveloperToolkit-v1.8.0-Setup.exe)

这是17号的微软新闻，但目前只有各大IT新闻网站报道，他们说的肯定很宽泛，不涉及技术问题，因此本文就弥补他们的不足。微软说这是第四次发布商业SDK版本（v1.8），这几个版本被下载次数超过70W次。

SDK1.8加入了一些新的特性，这些特性是客户一直提议的。

• 新的背景移除API：该API可以移除并替换用户的背后景物，像是影视行业的”绿幕”技术。它可以应用到增强实境游戏、训练和模拟等方面，并为使用者带来身临其境的体验。

[竟然只能作用于1个人，通过SkeletonID选择。相关函数名字是BackgroundRemovedColorStream，他们说用了许多图像处理技术来提升稳定性和精度。好吧，希望以后可以做成多人的。从官方提供的图像来看，他对于人与背景边界地方的处理还是不行，比不上国内一些人做的，以后会改进吧。1.7时也有绿幕技术的例子，改名为CoordinateMappingBasics。新增了KinectBackgroundRemoval180_32.dll和 KinectBackgroundRemoval180_64.dll，不需要使用就不用添加了，也说明这个功能不是很必须的。]



• Kinect Fusion的现实色彩捕捉API：该API为Kinect Fusion带来了感知场景颜色和深度信息的功能，可在3D建模和游戏时发挥作用。此外，该API还能映射其扫描物的网格纹理。

[这个应该是本次升级最大的变化了，做三维建模的人可是有福利了！另外，值得注意的一点是，他们结合Kinect Fusion和人脸追踪，现在可以扫描高清的人脸和人头了（WPF和C++都有例子）~这一点可是很多人想要的，现在微软实现了，哈利路亚！]

• Kinect Fusion追踪的稳健性改进：该算法使得其在扫描场景时更加地容易，Kinect Fusion也可以随着摄像头的移动而锁定住场景了，带来更可靠和一致性的扫描。

• 多Kinect传感器结合：能够使用两个传感器同时扫描一个物体或人物来创建3D模型，而不再需要移动传感器或物体。校准了两个Kinect传感器之后，并用Kinect Fusion API对多个传感器已捕捉影像进行建模。

此外，微软还在Kinect for Windows SDK 1.8版本中新增了HTML5和JavaScript支持，开发者可以用这两个开发语言开发Kinect程序界面，而且还拥有自适应的UI采样等全新功能。

[网页服务需要.NET4.5(Visual Studio 2012)和Windows 8(或者更高版本)，微软又升级了。提供了一些功能，这里不翻译了：

Web socket end points that expose Kinect interactions (hand pointer movement plus push and grip gestures), background removal, user viewer, skeleton data, etc. as data streams and events sent from server to a HTML5-capable browser client
REST end point that support GET operations to retrieve current stream configuration and POST operations to modify current stream configuration
REST end point that acts as a simple file server that serves static content
此外还有一个例子

WebserverBasics-WPF is a sample application that:

Configures the Microsoft.Samples.Kinect.Webserver component to serve Kinect data on a localhost port

Serves sample web page and associated static content

Provides UI to start/stop the server and view errors encountered while serving data

Writes informational messages to a log file]

由于本人身边没有Kinect，因此就不演示和测试新的Kinect特性了。主要更新内容是再一次增强了三维建模技术，相信做三维建模的朋友这个中秋很开心。显示三维建模的例子，虽然只能看到很小的图像，不过看起来对人彩色三维建模很不错啊！



 

官方新闻：http://blogs.msdn.com/b/kinectforwindows/archive/2013/09/16/updated-sdk-with-html5-kinect-fusion-improvements-and-more.aspx

官方更新说明：http://msdn.microsoft.com/en-us/library/jj663803.aspx

参考：http://win8.xapcn.com/news/86404.html