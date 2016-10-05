# 前言

　　几年前接触这个组件的时候，只需要在.NET平台进行一些常规的微积分计算，功能还比较少，只限于常规的数值计算，现在已经功能越来越多了，应该是目前最好的替代Matlab进行数值计算的.NET组件。本文及接下来的几篇文章将详细的对该组件进行介绍。还有在.NET平台使用相关Matlab混编进行数值计算的朋友该好好了解了解并学习下了。当然这个基础组件的功能很广泛，应该很多都比较喜欢吧。

如果本文章资源下载不了，或者文章显示有问题，请参考 本文原文地址：http://www.cnblogs.com/asxinyu/p/4264638.html 


# 1.Math.NET基本介绍

Math.NET官方网站：http://www.mathdotnet.com/

　　Math.NET初衷是开源建立一个稳定并持续维护的先进的基础数学工具箱，以满足.NET开发者的日常需求。目前该组件主要分为以下几个子项目，该组件同时也支持Mono，而且支持的平台也非常广泛(PCL Portable Profile 47: Windows 8, Silverlight 5,Xamarin: Android, iOS)。 
　　


# 2.Math.NET Numerics

　　Math.NET Numerics是核心功能是数值计算。主要是提供日常科学工程计算相关的算法，包括一些特殊函数，线性代数，概率论，随机函数，微积分，插值，最优化等相关计算功能。它是在 Math.NET Iridium和dnAnalytics 的基础上合并而来。该组件里面包括了一个读取Matlab数据格式的功能，我们将在后几篇博客中加以介绍。其主要特征有：http://en.wikipedia.org/wiki/Math.NET_Numerics

 　　支持概率分布:离散型、连续型和多元

　　伪随机数生成器 

　　支持稀疏矩阵和向量的复杂的线性代数解决方法 

　　LU, QR, SVD, EVD,Cholesky分解 

　　矩阵读写功能，支持Matlab和一些分开的文件 

　　复数计算 

　　特殊函数： Gamma, Beta, Erf,Bessel,Struve 等等 

　　插值，线性回归，曲线拟合 

　　数值积分，方程求解 

　　描述性统计、统计直方图,皮尔森相关系数 

　　马尔可夫链蒙特卡罗抽样 

　　基本的财务统计数据 

　　傅里叶变换(FFT) 

　　重载的数学操作符来简化复杂的表达式 

　　Mono平台支持，可选支持英特尔数学内核库(Microsoft Windows和Linux) 

　　可选更多的的F#扩展用法 

　　该子项目的主页：https://github.com/mathnet/mathnet-numerics
　　
　　
# 3.Math.NET Symbolics

　　Math.NET Symbolics是一个Math.NET下一个基础的代数计算项目，该项目的最终目的并不是要成为如Maple,Mathematica那样一个完善的计算机代数计算系统。以前在做Matlab.NET混合编程的时候，经常就有人问为什么混合编程的符号计算用不了，其实就是用不了，官方不支持，那怎么办，其实简单的功能，就可以使用这个项目来完成。详细的使用可以参考项目主页的帮助文档，接下来的文章也会加以介绍。

　　项目主页：https://github.com/mathnet/mathnet-symbolics
　　
　　
# 4.Math.NET Filtering

　　Math.NET Filtering是一个数字信号处理工具箱，提供了数字滤波器的基础功能，以及滤波器应用到数字信号处理和数据流转换的相关功能。

　　项目主页：https://github.com/mathnet/mathnet-filtering
　　
　　



# 5.Math.NET Spatial

　　是Math.NET下的一个几何处理工具箱。

　　项目主页：https://github.com/mathnet/mathnet-spatial
　　
　　
　　
# 6.其他

　　Math.NET在发展过程中的一些其他项目如Math.NET Iridium ，Math.NET Classic， Math.NET Linq Algebra， Math.NET Yttrium等都是历史（有一些是实验性的），现在都已经合并到上述几个子项目中。

　　相关源码在本系列文章下载完成后统一发布，敬请关注。基本资料可以去官网下载。

　　如果本文章资源或者显示有问题，请参考本文原文地址：http://www.cnblogs.com/asxinyu/p/4264638.html



<br/><br/><br/><br/><br/><br/>

****************

如果您觉得阅读本文对您有帮助，请点一下“**推荐**”按钮，您的“**推荐**”将是我最大的写作动力！欢迎各位转载，但是未经作者本人同意，转载文章之后**必须在文章页面明显位置给出作者和原文连接**，否则保留追究法律责任的权利。

.NET数据挖掘与机器学习，作者博客:
http://www.cnblogs.com/asxinyu

E-mail:1287263703@qq.com

[【目录】开源Math.NET基础数学类库使用总目录](http://www.cnblogs.com/asxinyu/p/Bolg_Category_For_MathNet.html)
　　
　　
　　
　　