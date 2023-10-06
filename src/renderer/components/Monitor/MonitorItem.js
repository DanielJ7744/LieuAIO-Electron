// @flow
import * as React from 'react';
import deleteIcon from '../../assets/actions/Delete.svg';
import startIcon from '../../assets/actions/start.svg';
import { ipcRenderer } from 'electron';

export const MonitorItem = ({ task, idx, setMonitor, activeMonitor }) => {
  const StartMonitor = () => {
    console.log('stated the task');
  };
  const DeleteItem = (data) => {
    const DeleteSingleTask = task.filter((t) => t.id !== data.id);
    setMonitor(DeleteSingleTask);
    ipcRenderer.send('delete-group-monitor', idx, DeleteSingleTask);
  };
  return (
    <div className="task__item__content">
      {task &&
        task.length > 0 &&
        task.map((item, i) => (
          <div className="monitor__item__body" key={i}>
            <span className="content_site">{item.site}</span>
            <span className="content__product">{item.product}</span>
            <span className="content__proxy">Proxy</span>
            <span className="content__profile">{item.startGroup}</span>
            <span className={item.status === 'Monitoring Product' ? 'content__monitor__Status' : 'content__product__found'}>{item.status}</span>
            <span className="content__action">
              <img src={startIcon} alt="start" onClick={StartMonitor} className="startIcon" />
              <img src={deleteIcon} alt="delete" onClick={() => DeleteItem(item)} className="deleteIcon" />
            </span>
          </div>
        ))}
    </div>
  );
};

export default MonitorItem;
