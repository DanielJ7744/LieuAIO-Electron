// @flow
import * as React from 'react';
/* task action icon */
import { useState } from 'react';
import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/named
import { AllStartDeleteAction } from '../AllStartDeleteAction';

export const TaskItem = ({ idx, task, setTask, activeTask }) => {
  // console.log(activeTask);
  const StartItem = () => {
    console.log('stated the task');
  };
  const DeleteItem = (data) => {
    const DeleteSingleTask = task.filter((t) => t.id !== data.id);
    setTask(DeleteSingleTask);
    ipcRenderer.send('delete-group-task', idx, DeleteSingleTask);
  };
  return (
    <div className="task__item__content">
      {task &&
        task.length > 0 &&
        task.map((item, i) => (
          <div className="task__item__body" key={i}>
            <span className="content_site">{item.site}</span>
            <span className="content__product">{item.product}</span>
            <span className="content__proxy">Proxy</span>
            <span className="content__profile">{item.profile}</span>
            <span className="content__size">{item.size}</span>
            <span className={(item.status === 'Successful Purchase' ? 'content__success__Status ' : '') + (item.status === 'In Queue' ? 'content__inqueue__Status' : 'content__payment__Status')}>
              {item.status}
            </span>
            <AllStartDeleteAction deleteTaskHandler={DeleteItem} task={item} title="task" />
          </div>
        ))}
    </div>
  );
};

export default TaskItem;
