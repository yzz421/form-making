import { isEmpty } from 'lodash';
import React from 'react';
import { Containers, Components } from './engine';

interface IProps {
  layout: IRenderer;
}

const Render: React.FC<IProps> = ({ layout }) => {
  let Component: any = null;
  const { componentType, componentName } = layout;

  const cnptName =
    componentName &&
    componentName.replace(/^\S/, function (s) {
      return s.toUpperCase();
    });

  if (componentType === 'container') {
    Component = Containers[cnptName];
  }

  if (componentType === 'component') {
    Component = Components[cnptName];
  }

  if (Component === null || Component === undefined) return null;

  return <Component layout={layout}></Component>;
};

export default Render;
