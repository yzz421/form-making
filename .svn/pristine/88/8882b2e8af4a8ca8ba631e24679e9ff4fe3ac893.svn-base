import React from 'react';
import { observable, action, toJS, autorun } from 'mobx';
import uuid, { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import * as formSv from '@/service/form';
import { message } from 'antd';
import { getGUID } from '@/utils/utils';

export interface MakerItemProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  default?: string | number; //默认值
  datePicker?: string; //时间选择器类型
}

interface Target {
  data?: any;
  index: number;
}

export class Maker {
  @observable FieldPropsList: any[] = [];
  @observable MakerItems: [] = [];
  @observable target: Target | undefined = undefined;

  @observable selected: any | undefined = undefined;

  @observable formId: string | undefined = undefined;

  constructor() {}

  @action
  resetFormId = (formId?: string) => {
    this.formId = formId;
  };

  @action
  submitFormData = (data: { [key: string]: string }) => {
    const fieldList: FMFieldList[] = [];
    Object.keys(data).forEach(key =>
      fieldList.push({ componentId: key, value: JSON.stringify(data[key]) }),
    );
    console.log(fieldList);
    const formData: FMFormData = {
      addUserId: '123',
      fieldList,
      formId: this.formId,
    };
    return formSv.submit(formData).then(this.resetFormId);
  };

  @action
  appendItem(item: any) {
    item.fieldProps.name = getGUID();
    this.FieldPropsList.push(item);
  }

  @action
  isCanAppend() {
    return this.target === undefined;
  }

  @action
  resetTarget(t: Target | undefined) {
    this.target = t;
  }

  @action
  resetMakerItems(makerItems: any[]) {
    this.FieldPropsList = makerItems;
  }

  @action
  deleteMakerItemById = (uuid: string) => {
    this.FieldPropsList = this.FieldPropsList.filter(({ fieldProps }) => fieldProps.name !== uuid);
  };

  @action
  resetSelected = (item: any) => {
    this.selected = item;
  };

  @action
  isSelected = (item: any) => {
    return this.selected?.name === item.name;
  };

  @action
  mutePrpos = (props: MakerItemProps) => {
    if (!!this.selected)
      this.FieldPropsList = this.FieldPropsList.map(x => {
        if (x.fieldProps.name === this.selected?.fieldProps.name) {
          return { ...x, fieldProps: props };
        }
        return x;
      }) as any;
  };

  @action
  addCopy = () => {
    let clone = _.cloneDeep(this.selected);
    clone.fieldProps.name = uuidv4();
    this.FieldPropsList.push(clone!);
  };

  @action
  clear = () => {
    this.FieldPropsList = [];
  };

  @action
  getSchema = () => {
    if (!!this.FieldPropsList && this.FieldPropsList.length === 0) {
      return undefined;
    }

    let result = {
      type: 'object',
      properties: {} as any,
    };

    this.FieldPropsList.forEach(
      ({ fieldProps }) => (result.properties[fieldProps.name] = { ...fieldProps }),
    );
    return result;
  };

  @action
  getDndSchema = () => {
    if (!!this.FieldPropsList && this.FieldPropsList.length === 0) {
      return undefined;
    }

    let result = {
      type: 'object',
      properties: {} as any,
    };

    return result;
  };
  @action
  saveFormData = (name?: string) => {
    const componentList: FMComponent[] = this.FieldPropsList.map(({ fieldProps, type }) => ({
      id: fieldProps.name,
      name: fieldProps.title,
      type: type,
    }));
    const formEntity: FormEntity = {
      addUserId: '123',
      componentList,
      name: name || getGUID(),
      style: JSON.stringify(this.FieldPropsList),
      remark: 'remark',
    };

    return formSv.add(formEntity).then(() => message.success('成功'));
  };
}

export const makerContext = React.createContext<Maker | null>(null);
