// @flow
import * as React from 'react';
/* task action icon */
import { ipcRenderer } from 'electron';
import startIcon from '../../assets/actions/start.svg';
import deleteIcon from '../../assets/actions/Delete.svg';
import { useGlobal } from '../../Context/GlobalContext';

export const ProxyItem = ({ idx, task, setTask, activeTask }) => {
  const StartItem = () => {
    console.log('stated the task');
  };
  const DeleteItem = (data) => {
    const DeleteSingleTask = task.filter((t) => t.id !== data.id);
    setTask(DeleteSingleTask);
    ipcRenderer.send('delete-group-proxy', idx, DeleteSingleTask);
  };
  return (
    <div className="task__item__content">
      {task &&
        task.length > 0 &&
        task.map((item, i) => (
          <div className="task__item__body" key={i}>
            <span className="content_id">{item.id}</span>
            <span className="content__mode">{item.Proxy}</span>
            <span className="content__speed_action">
              <span className="content__speed">{item.Speed}</span>
              <span className="speedStatus" />
            </span>
            <span className="content__action">
              <img src={startIcon} alt="start" onClick={StartItem} className="startIcon" />
              <img src={deleteIcon} alt="delete" onClick={() => DeleteItem(item)} className="deleteIcon" />
            </span>
          </div>
        ))}
    </div>
  );
};

export default ProxyItem;
