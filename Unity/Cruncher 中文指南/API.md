## 第1步 创建CruncherIO类实例
创建一个CruncherIO类实例，并填充它的所有属性，你会发现它和Unity Mesh的属性很类似，唯一的不同是它没有65K的数量限制。
```
using UnityEngine;
using System.Collections;

#if (CRUNCHER_ASSEMBLY == true)
namespace CruncherPlugin
{
#endif
	//------------------------------------------------------------------------------
	// class definition
	//------------------------------------------------------------------------------
	public class CruncherAdjustment
	{
		public enum Type { TargetQuality, TargetQuantity };
		public CruncherAdjustment.Type type;
		public float quality;
		public int quantity;
	}	
	
	//------------------------------------------------------------------------------
	// class definition
	//------------------------------------------------------------------------------
	public class CruncherIO
	{
		// core mesh data
		public Vector3[] vertices;
		public int[] triangles;
		public Vector3[] normals;
		public Vector2[] uv0s;
		public Vector2[] uv1s;
		public Color[] colors;
		public BoneWeight[] boneWeights;
		public Vector4[] tangents;
		public Matrix4x4[] bindPoses;
		public int[][] subMeshTriangles;
		public int[] originalIndexes;
		public int[] lockedVertices;
	}
#if (CRUNCHER_ASSEMBLY == true)
}  // namespace CruncherPlugin
#endif
```
```
CruncherIO cruncherIO = new CruncherIO();
int meshId = CruncherPluginManager.AddMesh(cruncherIO);
```

## 第2步 执行优化
```
CruncherAdjustment cruncherAdjustment = new CruncherAdjustment();
cruncherAdjustment.type = CruncherAdjustment.Type.TargetQuality;
cruncherAdjustment.quality = 0.5f;
if(CruncherPluginManager.AdjustMeshes(cruncherAdjustment) == true)
{
	// save new quality setting
	int quality = cruncherAdjustment.quality;
	int quantity = cruncherAdjustment.quantity;
	#if LOG_EXTRA_INFO
	Debug.Log("INFO: " + meshGroup.meshGo.name + " Post-AdjustMeshes Quality=" + quality + ", Quantity=" +  quantity);
	#endif
}
```

## 第3步 获得优化后的网格
```
CruncherIO cruncherIO = CruncherPluginManager.RetrieveMesh(meshId);
```
**注意：如果你有额外的meta-data，比如skinning info、colors等，该方法支持返回原始索引**
```
static public CruncherIO RetrieveMesh(int meshId, bool retrieveOriginalIndexes = false)
```