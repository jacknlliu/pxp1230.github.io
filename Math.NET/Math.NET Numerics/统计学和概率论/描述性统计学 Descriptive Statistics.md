# 描述性统计学 Descriptive Statistics

## 初始化
使用统计学命名空间：
```
using MathNet.Numerics.Statistics;
```

## 单变元统计分析 Univariate Statistical Analysis

1. Statistics类，基础的数据集统计，如最小值，最大值，平均值，总体方差，标准差等等。为静态类，扩展了很多IEnumerable<double>方法，注意Statistics是一个总体的统计类，其很多函数的调用都是根据数据集的类型分开调用StreamingStatistics和ArrayStatistics；
	```
	//先生成数据集合
	var chiSquare = new ChiSquared(5);
	Console.WriteLine(@"2. Generate 1000 samples of the ChiSquare(5) distribution");
	var data = new double[1000];
	for (var i = 0; i < data.Length; i++)
	{
	    data[i] = chiSquare.Sample();
	}
	
	//使用扩展方法进行相关计算
	Console.WriteLine(@"3.使用扩展方法获取生成数据的基本统计结果");
	Console.WriteLine(@"{0} - 最大值", data.Maximum().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine(@"{0} - 最小值", data.Minimum().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine(@"{0} - 均值", data.Mean().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine(@"{0} - 中间值", data.Median().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine(@"{0} - 有偏方差", data.PopulationVariance().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine(@"{0} - 无偏方差", data.Variance().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine(@"{0} - 标准偏差", data.StandardDeviation().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine(@"{0} - 标准有偏偏差", data.PopulationStandardDeviation().ToString(" #0.00000;-#0.00000"));
	Console.WriteLine();
	```

1. ArrayStatistics，静态类，是普通的未排序数组数据集的统计，一次性都加载在内存，因此计算比较方便；
1. SortedArrayStatistics，静态类，是排序数组数据集的统计；
1. StreamingStatistics，静态类，是流数据集的统计，适合于一些大数据集，不能一次性读入内存的情况；
1. DescriptiveStatistics，非静态类，与Statistics类的功能类似，但不一样的是Statistics是静态方法，一一计算，而该类是初始化的时候，可以一次性计算所有的指标，直接通过属性进行获取。
	```
	var samples = new ChiSquare(5).Samples().Take(1000);
	var statistics = new DescriptiveStatistics(samples); //使用数据进行类型的初始化
	
	//直接使用属性获取结果
	var largestElement = statistics.Maximum;
	var smallestElement = statistics.Minimum;
	var median = statistics.Median;
	
	var mean = statistics.Mean;
	var variance = statistics.Variance;
	var stdDev = statistics.StandardDeviation;
	
	var kurtosis = statistics.Kurtosis;
	var skewness = statistics.Skewness;
	```

1. RunningStatistics，非静态类，和Statistics类功能差不多，但允许动态更新数据，进行再次计算；


# ArrayStatistics类原型和注释

　　上述有多个统计类，但核心的代码不多。上述多个实现，也只是为了满足多种不同的需求。我们一起看一个基本实现：ArrayStatistics类，类的核心实现，代码过多，只列举了代码原型，和注释：
```
/// <summary>
/// 对未排序的数组进行统计操作  警告: Methods with the Inplace-suffix may modify the data array by reordering its entries.
/// </summary>
public static class ArrayStatistics
{
    /// <summary>返回未排序数组的最小值,如果数据为空或者元素为NaN，则返回NaN.</summary>
    /// <param name="data">简单的未排序数组.</param>
    public static double Minimum(double[] data) 

    /// <summary>返回未排序数组的最小值,如果数据为空或者元素为NaN，则返回NaN.</summary>
    /// <param name="data">简单的未排序数组.</param>
    public static float Minimum(float[] data) ;

    /// <summary>返回未排序数组的最大值,如果数据为空或者元素为NaN，则返回NaN.</summary>
    /// <param name="data">简单的未排序数组.</param>
    public static double Maximum(double[] data) ;

    /// <summary>返回未排序数组的最大值,如果数据为空或者元素为NaN，则返回NaN.</summary>
    /// <param name="data">简单的未排序数组.</param>
    public static float Maximum(float[] data);

    /// <summary>计算未排序数组的算术平均值，如果数据是空的或者元素为NaN</summary>
    /// <param name="data">简单的未排序数组.</param>
    public static double Mean(double[] data) ;

    /// <summary>
    /// 计算未排序数组的无偏总体方差：对大小为N的数据集，使用N-1进行标准化.
    ///  (Bessel's correction). 贝塞尔（无偏估计）校正系数
    /// 如果数据连小于2，或者数据为NaN，则返回NaN
    /// </summary>
    /// <param name="samples">简单的未排序数组.</param>
    public static double Variance(double[] samples) ;
    
    /// <summary>
    /// 计算为排序数组的总体方差.对大小为N的数据集，使用N进行标准化.因此是有偏差的
    /// 如果数据为NaN，则返回NaN
    /// </summary>
    /// <param name="population">简单的未排序数组.</param>
    public static double PopulationVariance(double[] population) ;

    /// <summary>
    /// 计算无偏总体标准差：对大小为N的数据集，使用N-1进行标准化.
    /// 如果数据连小于2，或者数据为NaN，则返回NaN
    /// </summary>
    /// <param name="samples">简单的未排序数组.</param>
    public static double StandardDeviation(double[] samples)
    {
        return Math.Sqrt(Variance(samples));
    }

    /// <summary>
    /// 计算总体标准差：对大小为N的数据集，使用N进行标准化.
    /// 如果数据为NaN，则返回NaN.
    /// </summary>
    /// <param name="population">简单的未排序数组.</param>
    public static double PopulationStandardDeviation(double[] population)
    {
        return Math.Sqrt(PopulationVariance(population));
    }

    /// <summary>计算算术平均值和无偏总体偏差，是2个方法的综合</summary>
    /// <param name="samples">简单的未排序数组.</param>
    public static Tuple<double, double> MeanVariance(double[] samples)
    {
        return new Tuple<double, double>(Mean(samples), Variance(samples));
    }

    /// <summary>计算算术平均值和无偏总体标准差，是2个方法的综合</summary>
    /// <param name="samples">简单的未排序数组.</param>
    public static Tuple<double, double> MeanStandardDeviation(double[] samples)
    {
        return new Tuple<double, double>(Mean(samples), StandardDeviation(samples));
    }

    /// <summary>计算2个数组的无偏协方差：对大小为N的数据集，使用N-1进行标准化.</summary>
    /// <param name="samples1">第一个数组.</param>
    /// <param name="samples2">第二个数组.</param>
    public static double Covariance(double[] samples1, double[] samples2) ;

    /// <summary>计算2个数组的总体协方差：对大小为N的数据集，使用N进行标准化.</summary>
    /// <param name="population1">第一个数组.</param>
    /// <param name="population2">第二个数组.</param>
    public static double PopulationCovariance(double[] population1, double[] population2) ;

    /// <summary>计算数组的均方根误差(RMS).</summary>
    /// <param name="data">简单的未排序数组.</param>
    public static double RootMeanSquare(double[] data) ;

    /// <summary>计算未排序数组的 顺序统计量(1..N). 注意:会导致data数组的值会重新排序.</summary>
    /// <param name="data">数组，未排序，计算过程会被排序.</param>
    /// <param name="order">从1开始的顺序统计，1 - N 之间.</param>
    public static double OrderStatisticInplace(double[] data, int order) ;

    /// <summary>计算未排序数组的中位数：data数组会被重新排序.</summary>
    /// <param name="data">数组，未排序，计算过程会被排序.</param>
    public static double MedianInplace(double[] data)
    {
        var k = data.Length/2;
        return data.Length.IsOdd()
            ? SelectInplace(data, k)
            : (SelectInplace(data, k - 1) + SelectInplace(data, k))/2.0;
    }

    /// <summary>
    /// 计算未排序数组的p百分位数：如果需要非整数百分比，使用分位数替代.  
    /// Approximately median-unbiased regardless of the sample distribution (R8).
    /// WARNING: 计算过程会对data排序.
    /// </summary>
    /// <param name="data">数组，未排序，计算过程会被排序.</param>
    /// <param name="p">p分为点，0 - 100 之间.</param>
    public static double PercentileInplace(double[] data, int p)
    {
        return QuantileInplace(data, p/100d);
    }

    /// <summary>
    /// 计算未排序数组的第一个四分位数的值
    /// Approximately median-unbiased regardless of the sample distribution (R8).
    /// WARNING: 计算过程会对data排序.
    /// </summary>
    /// <param name="data">数组,未排序，计算过程会被排序.</param>
    public static double LowerQuartileInplace(double[] data)
    {
        return QuantileInplace(data, 0.25d);
    }

    /// <summary>
    /// 计算未排序数组的第三个四分位数的值
    /// Approximately median-unbiased regardless of the sample distribution (R8).
    /// WARNING: 计算过程会对data排序.
    /// </summary>
    /// <param name="data">数组,未排序，计算过程会被排序.</param>
    public static double UpperQuartileInplace(double[] data)
    {
        return QuantileInplace(data, 0.75d);
    }
```












