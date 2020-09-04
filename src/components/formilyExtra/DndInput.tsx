import React from 'react';
import { Input } from 'antd';
import DragWarpper from '../DragWarpper';

export const DndInput = (props: any) => {
  console.log(props);
  const { placeholder, required } = props;
  return <Input placeholder={placeholder} required={!!required}></Input>;
};
