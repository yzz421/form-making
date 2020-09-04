import React from 'react';
import Widge from '../../../components/Widge';
import { Tabs, Button } from 'antd';
import { Widges } from '@/widge';
import { Draggable, DragDropContext } from 'react-beautiful-dnd';

interface Data {
  label: string;
  type: string;
  icon: string;
}

const { TabPane } = Tabs;

const WidgeList = () => {
  return (
    <div style={{ padding: 10 }}>
      <Tabs defaultActiveKey={'1'}>
        <TabPane tab="控件列表" key="1">
          {Widges.map((x, index) => (
            <Widge key={index} {...x} index={index} data={x}></Widge>
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default WidgeList;
