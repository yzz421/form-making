import { v4 as uuidV4 } from 'uuid';
export const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: 'none',

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'red',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: any) => ({
  // background: isDraggingOver ? 'lightblue' : 'grey',
});

export const getGUID = () => {
  return uuidV4().replace(/-/g, '');
};
