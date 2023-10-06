// @flow
import * as React from 'react';
import { ipcRenderer } from 'electron';
import closeIcon from '../../assets/actions/close.svg';
import deleteIcon from '../../assets/actions/Delete.svg';

export const DeleteAll = ({ closeModal, title, tasks, taskGroupId, setTasks }) => {
  const handleDelete = () => {
    setTasks([]);
    if (title === 'Tasks') {
      ipcRenderer.send('deleteAllTasks', taskGroupId);
    } else if (title === 'Profiles') {
      ipcRenderer.send('deleteAllProfiles', taskGroupId);
    } else if (title === 'Proxies') {
      ipcRenderer.send('deleteAllProxies', taskGroupId);
    } else {
      ipcRenderer.send('deleteAllMonitor', taskGroupId);
    }
    closeModal();
  };
  const handleClose = () => {
    closeModal();
  };
  return (
    <div className="Modal deleteModal">
      <div className="__Header">
        <span>
          {' '}
          Are you sure to delete &nbsp;
          {title} ?
        </span>
        <img src={closeIcon} alt="closeIcon" onClick={handleClose} />
      </div>
      <div className="__create__content">
        <div className="actionBtns" onClick={() => handleDelete()}>
          <button type="button" className="__group__create">
            Delete {title}
          </button>
          <img src={deleteIcon} alt="create group" />
        </div>
      </div>
    </div>
  );
};
export default DeleteAll;
