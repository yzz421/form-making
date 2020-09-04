import React from 'react';
import styles from './index.less';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@/contants';
import { makerContext } from '@/store/Maker';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from 'antd';
import { MyIcon } from '@/contants';
import { Draggable, DragDropContext } from 'react-beautiful-dnd';

interface Props {
  type: string;
  label: string;
  icon: string;
  index?: number;
  data?: any;
}

const Widge: React.SFC<Props> = props => {
  const { label, type, icon, index, data } = props;
  const maker = React.useContext(makerContext)!;
  const [{ isDragging }, drag] = useDrag({
    item: { type: type, fieldProps: data.fieldProps },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ marginRight: 5, display: 'inline-block', width: 125 }}>
      <li
        className={styles['form-edit-widget-label']}
        style={{ cursor: 'move', opacity: isDragging ? 0.5 : 1 }}
      >
        <MyIcon type={icon} style={{ marginLeft: 10, marginRight: 10 }}></MyIcon>

        <a style={{ cursor: 'move' }}>
          <span>{label}</span>
        </a>
      </li>
    </div>
  );
};

export default Widge;
