import React from 'react';
import { Input, Button } from 'antd';

const Options = (props: any) => {
  const { value, onChange } = props;

  React.useEffect(() => {
    if (value) setDataSource(value);
  }, [value]);

  const [dataSource, setDataSource] = React.useState<any[]>(value || []);

  const hanleAppendItem = () => {
    const text = 'option' + (dataSource.length + 1);
    setDataSource([...dataSource, { label: text, value: text }]);
  };

  const handleOptionChange = (item: any, index: any) => {
    setDataSource(dataSource.map((i, idx) => (idx === index ? item : i)));
  };

  const handelOptionDelete = (index: any) => {
    setDataSource(dataSource.filter((i, idx) => idx !== index));
  };

  React.useEffect(() => {
    onChange(dataSource);
  }, [dataSource, onChange]);

  const renderField = ({ value, label }: any, index: any) => {
    return (
      <div key={index} style={{ width: '100%' }}>
        <Input
          size="small"
          placeholder="名称"
          onChange={e => {
            handleOptionChange({ label: e.target.value, value }, index);
          }}
          value={label}
          style={{ width: '35%' }}
        ></Input>
        <Input
          size="small"
          placeholder="值"
          onChange={e => handleOptionChange({ label, value: e.target.value }, index)}
          value={value}
          style={{ width: '35%', marginLeft: 5 }}
        ></Input>
        <Button
          size="small"
          type="link"
          style={{ marginTop: 5 }}
          onClick={() => handelOptionDelete(index)}
        >
          删除
        </Button>
      </div>
    );
  };

  return (
    <div>
      {dataSource.map((i, index) => renderField(i, index))}
      <div style={{ marginLeft: 10 }}>
        <Button size="small" type="link" onClick={hanleAppendItem}>
          添加项
        </Button>
      </div>
    </div>
  );
};

export default Options;
