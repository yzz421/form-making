import React from 'react';
import { ConfigProvider } from 'antd';

export function rootContainer(container: any) {
  return React.createElement(ConfigProvider, null, container);
}
