import { configure } from '@storybook/react';
import 'antd/dist/antd.css';

function loadStories() {
  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
