import { SDKProps } from '@/interface';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './index.less';

// label文本实现
const SceneSDK = forwardRef((props: SDKProps, ref) => {
  const { map } = props;
  const [data, setData] = useState<any>([]);

  useImperativeHandle(
    ref,
    () => {
      return {
        getData: () => {
          return data;
        },
        setData: (data: any) => setData(data),
      };
    },
    [data],
  );

  // 监听数据配置变换，更新data状态
  useEffect(() => {
    const { dataType, staticData } = props.data || {};
    if (dataType === 'staticData') {
      setData(staticData);
    }
  }, [props.data]);

  // 渲染
  useEffect(() => {
    if (!map || !data || data.length < 1) {
      return;
    }

    data.forEach((item: any) => {
      if (!item) {
        return;
      }

      const opts = {
        position: new BMapGL.Point(item.lng, item.lat), // 设置文本位置
        offset: new BMapGL.Size(item.offsetX, item.offsetY), // 设置文本偏移量
      };

      // 创建文本标注对象
      const label = new BMapGL.Label(item.text, opts);

      // 自定义文本标注样式
      label.setStyle(item.labelStyle || {});
      map.addOverlay(label);
    });
  }, [map, data]);

  return null;
});

export default SceneSDK;
export { SceneSDK };
