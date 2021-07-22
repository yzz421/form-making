### 增加Render组件
#### 概述
组件想要完成Contianer级别包含Component在内部的渲染，想要达成这种效果，需要做一个新的Renderer。每次渲染时判断组件的类型（Engine），如果是Container则渲染它的Props的chilren属性，这个属性可能是新的Container或者是一个Component，如果是Component则直接渲染。如果是Container继续往下渲染。

### Engine
渲染引擎：Container和Component两种渲染引擎。分别渲染出不同功能的组件，Container负责包裹其他组件可以是Container组件也可以是Component组件，直到渲染完毕；

### Renderer
渲染器：将组件递归渲染完毕

#### 数据结构

```javascript
interface Render {
  id: string;
  componentType: 'contianer' | 'component' // 渲染器类型，容器或组件
  componentName: string // 渲染器名称
  children: Render[]
}
```

#### 渲染效果预览
```javascript
const page1: Render = {
  id: 'ctn1',
  componentType: 'container',
  componentName: 'page'
  children: [{
    id: 'cpnt1',
    componentType: 'component',
    componentName: 'chart',
  }]
}
// rendered page1
:
<Page>
    <Chart></Chart>
</Page>

const page2: Render = {
  id: 'ctn1',
  componentType: 'container',
  componentName: 'page',
  children: [{
    id: 'ctn2',
    componentType: 'container',
    componentName: 'block',
    children: [{
      id: 'cpnt1',
      componentType: 'component',
      componentName: 'chart'
    }]
  }]
}

// render page2
:
<Page>
  <Block>
    <Chart></Chart>
  </Block>
</Page>
```

  

