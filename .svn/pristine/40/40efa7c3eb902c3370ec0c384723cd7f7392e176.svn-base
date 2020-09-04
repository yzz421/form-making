import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Tabs, Checkbox } from 'antd';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createAsyncFormActions,
  FormSlot,
} from '@formily/antd';
import { setup } from '@formily/antd-components';
import { Switch } from '@formily/antd-components';
import Options from '@/components/formilyExtra/Options';
import { MakerItemProps, Maker, makerContext } from '@/store/Maker';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as configSchema from '@/schemajson';
import { ItemTypes } from '@/contants';

setup();

const { TabPane } = Tabs;
const ConfigBlock = () => {
  const maker = React.useContext(makerContext)!;

  React.useEffect(() => {
    console.log(toJS(maker.selected));
    if (!!maker.selected) {
      actions.setFormState(state => {
        state.values = toJS(maker.selected?.fieldProps!);
      });
    }
  }, [maker.selected]);

  const actions = React.useRef(createAsyncFormActions()).current;

  const selected = maker.selected;

  const type = selected?.type;

  const getSchema = (type: string) => {
    if (!!type) {
      return (configSchema as any)[type];
    }
    return undefined;
  };

  const [value, setValue] = React.useState({});

  return (
    <div style={{ padding: '0px 10px' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="字段属性" key="1">
          <SchemaForm
            actions={actions}
            components={{ Switch, Options }}
            schema={getSchema(type)}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onChange={(value: any) => {
              maker.mutePrpos(value);
            }}
          ></SchemaForm>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default observer(ConfigBlock);
