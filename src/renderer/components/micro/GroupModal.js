import * as React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ipcRenderer } from 'electron';
import { Input } from '../Input';
import { Border } from '../border';
import createIcon from '../../assets/actions/create.png';
import closeIcon from '../../assets/actions/close.svg';

export const GroupModal = ({ closeModal, title, setTasksGroup, tasksGroups }) => {
  const [name, setName] = useState('');
  const [taskGroup, setTaskGroup] = useState({
    name: '',
    id: `TG-${uuidv4()} `,
    taskArr: [],
    uniqueID: uuidv4(),
  });
  const handleClose = () => {
    closeModal();
  };
  const handleChange = (e) => {
    const current = taskGroup;
    current.name = e.target.value;
    setTaskGroup(current);
  };
  const handleAdd = () => {
    setTaskGroup(taskGroup);
    const currentTaskGroups = [...tasksGroups, taskGroup];
    setTasksGroup(currentTaskGroups);
    if (title === 'Task') {
      ipcRenderer.send('create-task-group', currentTaskGroups);
    } else if (title === 'Monitor') {
      ipcRenderer.send('create-monitor-group', currentTaskGroups);
    } else if (title === 'Proxy') {
      ipcRenderer.send('create-proxy-group', currentTaskGroups);
    } else if (title === 'Profile') {
      ipcRenderer.send('create-profile-group', currentTaskGroups);
    }
    closeModal();
  };
  return (
    <div className="__GroupModal">
      <div className="__GroupHeader">
        <span> Create Group</span>
        <img src={closeIcon} alt="closeIcon" onClick={handleClose} />
      </div>
      <Border />
      <div className="__createGroup__content">
        <div className="GroupNameContent">
          <div className="groupName">Group name</div>
          <Input setValue={setName} value={name} plchldr={`${title} Group Name`} handleChangeValue={handleChange} />
        </div>
        <div className="actionBtns" onClick={handleAdd}>
          <button type="button" className="__group__create">
            Create Group
          </button>
          <img src={createIcon} alt="create group" />
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
