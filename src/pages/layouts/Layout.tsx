import React from 'react';
import { Row, Col, Divider, Button, Modal } from 'antd';
import { DndContext, DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { SaveOutlined } from '@ant-design/icons';
import styles from './Layout.less';
import { makerContext } from '@/store/Maker';
import SchemaForm, { createAsyncFormActions, SchemaMarkupField as Field } from '@formily/antd';

interface Props {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

const Layout: React.SFC<Props> = props => {
  const maker = React.useContext(makerContext)!;
  const { left, center, right } = props;
  const [visible, setVisible] = React.useState(false);
  const actions = React.useRef(createAsyncFormActions()).current;
  return (
    <DndProvider backend={Backend}>
      <div>
        <div className={styles.header}>
          <h1
            style={{
              color: 'whitesmoke',
              fontWeight: 400,
              fontSize: 24,
              marginLeft: 48,
            }}
          >
            未命名表单
          </h1>

          <div style={{ position: 'absolute', right: 48, top: 0 }}>
            <Button
              icon={<SaveOutlined />}
              shape="round"
              type="primary"
              onClick={() => {
                maker.saveFormData();
              }}
            >
              保存
            </Button>
          </div>
        </div>
      </div>
      <div style={{ padding: '0px 5px' }}>
        <div style={{ display: 'flex', height: '90vh' }}>
          <div className={styles.left}>{left}</div>
          <div className={styles.center}>{center}</div>
          <div className={styles.right}>{right}</div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Layout;
