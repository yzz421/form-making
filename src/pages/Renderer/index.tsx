import React from 'react';
import Render from './render';

interface IProps {
  layout: IRenderer;
}

const Renderer: React.FC<IProps> = ({ layout }) => {
  return <Render layout={layout}></Render>;
};

export default Renderer;
