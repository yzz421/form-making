import React from 'react';
import styles from './index.less';
import '@ant-design/compatible/assets/index.css';
import { observer } from 'mobx-react-lite';
import { ItemTypes } from '@/contants';
import { useDrag, useDrop } from 'react-dnd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

export interface FBProps {
  onSelected: (item: any) => void;
  onDelete: (uuid: string) => void;
  data: any;
  selected: any | undefined;
  index: number;
  onEnd: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onAddCopy: () => void;
  widge: any;
}

const DragWarpper: React.SFC<FBProps> = props => {
  const {
    selected,
    onSelected,
    data,
    onDelete,
    widge,
    index,
    onEnd,
    moveItem,
    onAddCopy,
    children,
  } = props;

  const isCurrent = selected && selected.fieldProps && selected.fieldProps.name === data.name;

  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.INPUT, index: index },
    end: () => onEnd(),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isHover }, drop] = useDrop({
    accept: ItemTypes.INPUT,
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;

      //drop new here
      if (dragIndex === undefined) {
        // maker.appendItem({ uuid: '', currentIndex: maker.MakerItems.length });
        return;
      }

      const hoverIndex = index!;

      if (hoverIndex === undefined) return;
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = (ref!.current as any).getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()!;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    drop: (item: any) => {
      const dragIndex = item.index;
      // if (dragIndex === undefined) {
      //   maker.appendItem(item.type);
      // }
    },
    collect: montitor => ({
      isHover: !!montitor.isOver(),
    }),
  });

  drag(drop(ref));

  const renderDragIcon = () => {
    return (
      <svg
        style={{ cursor: 'move' }}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2323"
        width="14"
        height="14"
      >
        <path
          d="M966.057143 505.485714L820.228571 390.4a8.262857 8.262857 0 0 0-13.371428 6.514286V470.857143H553.142857V217.142857h74.057143c6.857143 0 10.742857-8 6.514286-13.371428L518.514286 57.942857a8.16 8.16 0 0 0-12.914286 0L390.4 203.771429a8.262857 8.262857 0 0 0 6.514286 13.371428H470.857143v253.714286H217.142857v-74.057143c0-6.857143-8-10.742857-13.371428-6.514286L57.942857 505.485714a8.16 8.16 0 0 0 0 12.914286l145.714286 115.2c5.371429 4.228571 13.371429 0.457143 13.371428-6.514286V553.142857h253.714286v253.714286h-74.057143c-6.857143 0-10.742857 8-6.514285 13.371428l115.2 145.714286c3.314286 4.228571 9.714286 4.228571 12.914285 0l115.2-145.714286c4.228571-5.371429 0.457143-13.371429-6.514285-13.371428H553.142857V553.142857h253.714286v74.057143c0 6.857143 8 10.742857 13.371428 6.514286l145.714286-115.2a8.342857 8.342857 0 0 0 0.114286-13.028572z"
          p-id="2324"
          fill="#ffffff"
        ></path>
      </svg>
    );
  };

  const renderActions = () => {
    return (
      <>
        <svg
          style={{ marginLeft: 9, zIndex: 10 }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4052"
          width="14"
          height="14"
          onClick={() => {
            onAddCopy();
          }}
        >
          <path
            d="M877.714286 0H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h566.857143v786.285715c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V36.571429c0-20.228571-16.342857-36.571429-36.571428-36.571429zM731.428571 146.285714H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v606.514286c0 9.714286 3.885714 18.971429 10.742857 25.828571l198.057143 198.057143c2.514286 2.514286 5.371429 4.571429 8.457143 6.285714v2.171429h4.8c4 1.485714 8.228571 2.285714 12.571428 2.285714H731.428571c20.228571 0 36.571429-16.342857 36.571429-36.571429V182.857143c0-20.228571-16.342857-36.571429-36.571429-36.571429zM326.857143 905.371429L228.457143 806.857143H326.857143v98.514286zM685.714286 941.714286H400V779.428571c0-25.257143-20.457143-45.714286-45.714286-45.714285H192V228.571429h493.714286v713.142857z"
            p-id="4053"
            fill="#ffffff"
          ></path>
        </svg>
        <svg
          onClick={() => onDelete(data.name!)}
          style={{ marginLeft: 5 }}
          viewBox="0 0 1030 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3253"
          width="14"
          height="14"
        >
          <path
            d="M734.576758 366.308943a41.136298 41.136298 0 0 0-41.136299 41.136299v382.959349a41.136298 41.136298 0 1 0 82.762315 0V407.445242a41.136298 41.136298 0 0 0-41.626016-41.136299z m-444.663798 0a41.136298 41.136298 0 0 0-41.136298 41.136299v382.959349a41.136298 41.136298 0 1 0 82.762315 0V407.445242a41.136298 41.136298 0 0 0-40.646581-41.136299z m223.311335 0a41.136298 41.136298 0 0 0-41.136299 41.136299v382.959349a41.136298 41.136298 0 1 0 82.762315 0V407.445242a41.136298 41.136298 0 0 0-40.156863-41.136299zM881.492109 943.196557H158.178862V228.698231H881.492109v714.498326zM334.477284 81.293161h360.922046V146.915352H334.477284z m685.604973 77.865136a43.09517 43.09517 0 0 0-31.831659-12.242945h-211.558106V80.803443A80.803443 80.803443 0 0 0 695.889048 0H334.477284a80.803443 80.803443 0 0 0-80.803444 80.803443V146.915352H41.136298a41.136298 41.136298 0 1 0 0 82.272596h36.23912v714.008609a80.803443 80.803443 0 0 0 80.803444 80.803443H881.492109a80.803443 80.803443 0 0 0 80.803443-80.803443V228.698231h23.506457a42.115734 42.115734 0 0 0 42.605452-41.136299 40.156863 40.156863 0 0 0-9.794357-28.893352zM121.939742 1008.329029l-4.897179-4.897178z m10.773792 6.366332l-4.897178-4.897178z"
            fill="#ffffff"
            p-id="3254"
          ></path>
        </svg>
      </>
    );
  };

  const containerStyles = isCurrent ? styles['contianer-active'] : styles.container;
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      style={{ zIndex: 6, cursor: 'pointer', padding: 10, opacity }}
      className={containerStyles}
      onClick={() => onSelected(widge)}
      ref={ref}
    >
      {children}
      {isCurrent && (
        <>
          <div className={styles['drag-view']}>{renderDragIcon()}</div>
          <div id="action" className={styles['action-view']}>
            {renderActions()}
          </div>
        </>
      )}
    </div>
  );
};

export default observer(DragWarpper);
