// @flow
import * as React from 'react';
import deleteIcon from '../../assets/actions/Delete.svg';
import deleteIconInActive from '../../assets/actions/Delete-inActive.svg';

export const MonitorGroups = ({ taskGroup, setActive, active = false, idx, deleteTaskGroup }) => {
  const handleSelect = () => {
    setActive(taskGroup);
  };
  const className = active ? 'taskGroup__content ' + 'activeTaskGroup' : 'taskGroup__content';

  return (
    <div className={className} onClick={handleSelect}>
      <div className="tasksGroup">
        <div className="groupHeader">
          <div className="__taskGroup__header">
            <span className="name">{taskGroup.name}</span>
            <span className="taskNumber">
              <span>Monitor Group </span>(<span>{taskGroup.taskArr.length}</span>)
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

export default MonitorGroups;
