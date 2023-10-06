import * as React from 'react';
import deleteIcon from '../../assets/actions/Delete.svg';
import deleteIconInActive from '../../assets/actions/Delete-inActive.svg';

export const TaskGroup = ({ taskGroup, setActive, active = false, idx, callback, deleteTaskGroup }) => {
  const handleSelect = () => {
    setActive(taskGroup);
  };
  // eslint-disable-next-line no-useless-concat
  const className = active ? 'taskGroup__content ' + 'activeTaskGroup' : 'taskGroup__content';

  return (
    <div className={className} onClick={handleSelect}>
      <div className="tasksGroup">
        <div className="groupHeader">
          <div className="__taskGroup__header">
            <span className="name">{taskGroup.name}</span>
            <span className="taskNumber">
              <span>Task Group</span>(<span>{taskGroup.taskArr.length}</span>)
            </span>
          </div>
        </div>
        <div className="__taskGroup__delete" onClick={(e) => deleteTaskGroup(taskGroup)}>
          {active ? <img src={deleteIcon} alt="deleteIcon" /> : <img src={deleteIconInActive} alt="deleteIcon" />}
        </div>
      </div>
    </div>
  );
};

export default TaskGroup;
