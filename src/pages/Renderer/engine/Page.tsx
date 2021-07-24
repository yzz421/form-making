import React from 'react';
import Render from '../render';

type Props = { layout: IRenderer };

const Page: React.FC<Props> = ({ layout }) => {
  const { children: cilren, ...rest } = layout;
  return (
    <div style={{ width: '200px', padding: 10, border: '1px solid ' }}>
      <h5>
        {`this is page container`}
        <br />
        {`type: "${rest.componentType}", name: "${rest.componentName}", id: "${rest.id}"`} {}
      </h5>
      {cilren && cilren.length && cilren.map((child) => <Render key={child.id} layout={child} />)}
    </div>
  );
};

export default Page;
