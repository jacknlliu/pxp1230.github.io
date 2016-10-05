```
using UnityEngine;
using System.Collections;
using System.Reflection;
using DG.Tweening;

public class NewBehaviourScript : MonoBehaviour
{
    Tweener t;

    void Start()
    {
        Assembly assem = Assembly.Load("UnityEngine");
        Debug.Log(assem.GetType("UnityEngine.Vector3").FullName);
        
        System.Type type = typeof(ShortcutExtensions);
        try
        {
            MethodInfo m = type.GetMethod("DOMove", new System.Type[] { typeof(Transform), typeof(Vector3), typeof(float), typeof(bool) });
            t = m.Invoke(null, new object[] { transform, new Vector3(1, 1, 1), 1, false }) as Tweener;

            ParameterInfo[] ps = m.GetParameters();
            for (int i = 0; i < ps.Length; i++)
            {
                ParameterInfo p = ps[i];
                Debug.Log(p.ParameterType.Name + " " + p.Name + (p.IsOptional ? (" = " + p.DefaultValue) : ""));
            }
        }
        catch (System.Exception e)
        {
            Debug.Log(e.ToString());
        }
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.A))
        {
            t.Restart();
        }
    }
}
```