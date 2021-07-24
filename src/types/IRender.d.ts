interface IRenderer {
  id: string;
  componentType: string;
  componentName: string;
  children?: IRenderer[];
  [key: string]: any;
}
