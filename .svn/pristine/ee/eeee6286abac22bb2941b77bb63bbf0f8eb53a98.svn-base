import React from 'react';
import { useDrop } from 'react-dnd';
import { Accept } from '@/contants';
import { makerContext } from '@/store/Maker';
import { observer } from 'mobx-react-lite';
import update from 'immutability-helper';
import * as _ from 'lodash';
import styles from './index.less';
import * as formSv from '@/service/form';
import {
  DatePicker,
  Checkbox,
  Switch,
  NumberPicker,
  Radio,
  Input,
  Select,
} from '@formily/antd-components';
import { DeleteOutlined, EyeOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Table } from 'antd';
import {
  SchemaMarkupField as Field,
  FormButtonGroup,
  Form,
  FormItem,
  Submit,
  registerFormFields,
  connect,
} from '@formily/antd';
import { DndInput } from '@/components/formilyExtra/DndInput';

import DragWarpper from '@/components/DragWarpper';
import Options from '@/components/formilyExtra/Options';
import * as fdSv from '@/service/formData';
import { toJS } from 'mobx';

registerFormFields({
  DndInput: connect()(DndInput),
  Options: connect()(Options),
});

const { RangePicker } = DatePicker;

const Components = {
  DndInput: Input,
  DndTextarea: Input.TextArea,
  DndSelect: Select,
  DndInputNumber: NumberPicker,
  DndDatePicker: DatePicker,
  DndCheckbox: Checkbox.Group,
  DndSwitch: Switch,
  DndRadio: Radio.Group,
  DndRangePicker: RangePicker,
};

const FormBoard = () => {
  const maker = React.useContext(makerContext)!;

  const [{ isHover }, drop] = useDrop({
    accept: Accept,
    canDrop: () => maker.isCanAppend(),
    collect: montior => ({ isHover: !!montior.isOver() }),
    drop: (item: any) => {
      if (item.index === undefined) {
        maker.appendItem(item);
      }
    },
  });

  const moveItem = React.useCallback(
    (dragIndex: number, hoverIndex) => {
      const dragItem = maker.FieldPropsList[dragIndex];
      maker.resetMakerItems(
        update(maker.FieldPropsList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
          ],
        }),
      );
    },
    [maker],
  );

  const [visible, setVisible] = React.useState(false);
  const [flVisivle, setFlVisivle] = React.useState(false);
  const [formList, setFormList] = React.useState([]);
  const [fdlVisible, setFdlVisible] = React.useState(false);
  const [formDataList, setFormDataList] = React.useState([]);
  React.useEffect(() => {
    loadList();
  }, []);

  React.useEffect(() => {
    if (maker.formId) {
      loadFdlist();
    }
  }, [maker.formId]);

  const [column, setColumn] = React.useState([]);
  const loadFdlist = () => {
    fdSv.getPaged({ pageNum: 1, pageSize: 10, formId: maker.formId! }).then(res => {
      console.log(toJS(maker.FieldPropsList));
      setColumn(
        maker.FieldPropsList.map(({ fieldProps }) => ({
          dataIndex: fieldProps.name,
          title: fieldProps.title,
        })) as any,
      );
      const ss = res.dataList.map(({ fieldList }: { fieldList: any[] }) => {
        let result = {} as any;
        fieldList.forEach(x => (result[x.componentId] = x.value));
        return result;
      });
      setFormDataList(ss);
      console.log(ss);
    });
  };

  const loadList = () => {
    formSv.getPaged({ pageNum: 1, pageSize: 10 }).then(res => setFormList(res.dataList));
  };
  return (
    <div ref={drop} className={styles['container']}>
      <div style={{ textAlign: 'right' }}>
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => {
            maker.clear();
          }}
        >
          清空
        </Button>
        <Button type="link" icon={<EyeOutlined />} onClick={() => setVisible(true)}>
          预览
        </Button>
        <Button
          type="link"
          onClick={() => {
            setFlVisivle(true);
          }}
        >
          form list
        </Button>
        <Button
          type="link"
          onClick={() => {
            setFdlVisible(true);
          }}
        >
          formdata list
        </Button>
      </div>
      <Divider />

      <div className={styles.board}>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {maker.FieldPropsList &&
            maker.FieldPropsList.map(({ fieldProps, type }, index) => (
              <DragWarpper
                key={fieldProps.name}
                index={index}
                selected={maker.selected}
                onSelected={maker.resetSelected}
                onAddCopy={() => maker.addCopy()}
                onEnd={() => {}}
                onDelete={maker.deleteMakerItemById}
                moveItem={moveItem}
                widge={{ type, fieldProps }}
                data={fieldProps}
              >
                <FormItem
                  key={fieldProps.name}
                  label={fieldProps.title}
                  name={fieldProps.name}
                  props={{ ...fieldProps }}
                  {...fieldProps}
                  dataSource={fieldProps.enum}
                  component={(Components as any)[type]}
                  children={() => <></>}
                ></FormItem>
              </DragWarpper>
            ))}
        </Form>
      </div>
      <Modal
        title="表单预览"
        width={600}
        footer={null}
        visible={visible}
        destroyOnClose
        maskClosable={false}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onSubmit={value => {
            maker.submitFormData(value);
          }}
        >
          <>
            {maker.FieldPropsList.map(({ fieldProps, type }) => (
              <FormItem
                key={fieldProps.name}
                name={fieldProps.name}
                props={{ ...fieldProps }}
                {...fieldProps}
                dataSource={fieldProps.enum}
                component={(Components as any)[type]}
                children={() => <></>}
              ></FormItem>
            ))}
            {maker.formId && (
              <FormButtonGroup offset={6}>
                <Submit>提交</Submit>
              </FormButtonGroup>
            )}
          </>
        </Form>
      </Modal>
      <Modal visible={fdlVisible} title="表单数据列表" onCancel={() => setFdlVisible(false)}>
        <Table columns={column} dataSource={formDataList}></Table>
      </Modal>
      <Modal
        visible={flVisivle}
        footer={null}
        onCancel={() => setFlVisivle(false)}
        title="表单列表"
      >
        <Table
          columns={[
            { dataIndex: 'name', title: 'name' },
            {
              title: 'options',
              render: ({ style, id }) => {
                return (
                  <>
                    <Button
                      type="link"
                      onClick={() => {
                        const fieldProps = JSON.parse(style);
                        maker.FieldPropsList = fieldProps;
                        maker.resetFormId(id);
                        setFlVisivle(false);
                        setVisible(true);
                      }}
                    >
                      预览
                    </Button>
                    <Divider type="vertical"></Divider>
                    <Button type="link" danger onClick={() => formSv.deleteById(id).then(loadList)}>
                      删除
                    </Button>
                  </>
                );
              },
            },
          ]}
          dataSource={formList}
        ></Table>
      </Modal>
    </div>
  );
};

export default observer(FormBoard);
