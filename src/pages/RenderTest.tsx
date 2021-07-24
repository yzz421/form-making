import React from 'react';
import Renderer from './Renderer';

const RenderTest: React.FC = (props) => {
  const page2: IRenderer = {
    id: 'ctn1',
    componentType: 'container',
    componentName: 'page',
    children: [
      {
        id: 'cpnt1',
        componentType: 'component',
        componentName: 'chart',
      },
    ],
  };

  return (
    <div>
      render Test:
      <div style={{ padding: '0 20px' }}>
        <Renderer layout={page2}></Renderer>
      </div>
    </div>
  );
};

export default RenderTest;
