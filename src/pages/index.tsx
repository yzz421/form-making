import React from 'react';
import Layout from './layouts/Layout';
import Board from './layouts/Board';
import WidgeList from './layouts/WidgeList';
import { makerContext, Maker } from '@/store/Maker';
import 'antd/dist/antd.css';
import ConfigBlock from './layouts/FieldConfig';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export default function() {
  const store = React.useRef(new Maker()).current;

  return (
    <ConfigProvider locale={zhCN} componentSize="small">
      <makerContext.Provider value={store}>
        <Layout
          right={<ConfigBlock></ConfigBlock>}
          left={<WidgeList></WidgeList>}
          center={<Board></Board>}
        ></Layout>
      </makerContext.Provider>
    </ConfigProvider>
  );
}
