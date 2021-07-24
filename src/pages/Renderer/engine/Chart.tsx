import React from 'react';

const Chart: React.FC = (props: any) => (
  <div style={{ minHeight: '100px', width: '100%', border: '1px solid red' }}>
    <h5>
      {`this is chart container`}
      <br />
      {`type: "${props.layout.componentType}", name: "${props.layout.componentName}", id: "${props.layout.id}"`}{' '}
      {}
    </h5>
  </div>
);

export default Chart;
