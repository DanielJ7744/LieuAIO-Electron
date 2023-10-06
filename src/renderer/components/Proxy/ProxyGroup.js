import * as React from 'react';
import { useContext, useState } from 'react';
import { useGlobal } from '../../Context/GlobalContext';
import deleteIcon from '../../assets/actions/Delete.svg';
import deleteIconInActive from '../../assets/actions/Delete-inActive.svg';
// import deleteGroup from '../deleteGroup';

export const ProxyGroup = ({ taskGroup, setActive, active = false, idx, callback, deleteTaskGroup }) => {
  const handleSelect = () => {
    setActive(taskGroup);
  };
  const className = active ? 'proxyGroup__content ' + 'activeProxyGroup' : 'proxyGroup__content';

  return (
    <div className={className} onClick={handleSelect}>
      <div className="tasksGroup">
        <div className="groupHeader">
          <div className="__taskGroup__header">
            <span className="name">{taskGroup.taskArr.length} Proxies</span>
            <span className="taskNumber">
              <span>{taskGroup.name}</span>
            </span>
          </div>
        </div>
        <div className="__taskGroup__delete" onClick={() => deleteTaskGroup(taskGroup)}>
          {active ? <img src={deleteIcon} alt="deleteIcon" /> : <img src={deleteIconInActive} alt="deleteIcon" />}
        </div>
      </div>
    </div>
  );
};

export default ProxyGroup;
