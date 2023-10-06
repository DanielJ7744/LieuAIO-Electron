// @flow
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ipcRenderer } from 'electron';
import closeIcon from '../../assets/actions/close.svg';
import createIcon from '../../assets/actions/create.png';
import { TextArea } from '../TextArea';

export const ProxyModal = ({ closeModal, taskGroupId, tasks, setTasks }) => {
  const [proxys, setProxy] = useState('');
  const [taskArrs, setTaskArrs] = useState({
    proxy: '',
    Speed: '33ms',
    uniqueID: uuidv4(),
  });
  let taskArr;

  const handleAdd = () => {
    taskArr = [];
    const obb = { ...taskArrs };
    obb.id = `Tid-${uuidv4()}`;
    taskArr.push(obb);
    const combineTask = [...tasks, ...taskArr];
    setTasks(combineTask);
    ipcRenderer.send('create-group-proxy', combineTask, taskGroupId);
    closeModal();
  };
  const handleClose = () => {
    closeModal();
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setTaskArrs({
      Proxy: value,
      Speed: '33ms',
    });
  };
  return (
    <div className="Modal">
      <div className="__Header">
        <span>Add Proxies</span>
        <img src={closeIcon} alt="closeIcon" onClick={handleClose} />
      </div>
      <div className="__create__content">
        <div className="taskInputContent">
          <div className="taskLabel">Proxies</div>
          <div className="InputItem">
            <TextArea
              value={proxys}
              setValue={setProxy}
              plchldr="Enter Proxies
IP:PORT:USER:PASS"
              handleChangeValue={handleChange}
            />
          </div>
        </div>
        <div className="actionBtns">
          <button type="button" className="__group__create" onClick={handleAdd}>
            Add Proxies
          </button>
          <img src={createIcon} alt="create proxies" />
        </div>
      </div>
    </div>
  );
};

export default ProxyModal;
