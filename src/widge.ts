import { ItemTypes } from './contants';
import { getGUID } from './utils/utils';

export const Widges = [
  {
    label: '单行文本',
    type: ItemTypes.INPUT,
    icon: 'anticoninput',
    fieldProps: {
      'x-component': 'string',
      title: '单行文本',
    },
  },
  {
    label: '数字输入框',
    type: ItemTypes.INPUTNUMBER,
    icon: 'anticonfuhao-shuzishurukuang',
    fieldProps: {
      'x-component': 'NumberPicker',
      title: '数字输入框',
    },
  },
  {
    label: '多行文本',
    type: ItemTypes.TEXTAREA,
    icon: 'anticontextareabt_back',
    uuid: getGUID(),
    fieldProps: {
      'x-component': 'textarea',
      title: '多行文本',
    },
  },
  {
    label: '下拉选择器',
    type: ItemTypes.SELECT,
    icon: 'anticondrop-down',
    uuid: getGUID(),
    fieldProps: {
      'x-component': 'string',
      title: '下拉选择器',
      enum: [{ label: 'option1', value: 'option1' }],
    },
  },
  {
    label: '日期选择器',
    type: ItemTypes.DATEPICKER,
    icon: 'anticonmdatepicker',
    uuid: getGUID(),
    fieldProps: {
      type: 'daterange',
      title: '日期选择器',
      picker: 'date',
    },
  },
  {
    label: '日期范围选择',
    type: ItemTypes.RANGPICKER,
    icon: 'anticonmdatepicker',
    uuid: getGUID(),
    fieldProps: {
      type: 'RangePicker',
      title: '日期范围选择器',
      picker: 'date',
    },
  },
  {
    label: '多选框',
    type: ItemTypes.CHECKBOX,
    icon: 'anticonduoxuankuang',
    uuid: getGUID(),
    fieldProps: {
      'x-component': 'CheckboxGroup',
      title: '多选框',
      enum: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
      ],
    },
  },
  {
    label: '单选框',
    type: ItemTypes.RADIO,
    icon: 'anticondanxuankuangxuanzhong',
    uuid: getGUID(),
    fieldProps: {
      'x-component': 'RadioGroup',
      title: '单选框',
      enum: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
      ],
    },
  },
  {
    label: '开关按钮',
    type: ItemTypes.SWITCH,
    icon: 'anticonkaiguananniu',
    uuid: getGUID(),
    fieldProps: {
      'x-component': 'Switch',
      title: '开关按钮',
    },
  },
];
