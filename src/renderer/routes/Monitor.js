// @flow
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ipcRenderer } from 'electron';
import createIcon from '../assets/actions/create.png';
import startIcon from '../assets/actions/start.svg';
import stopIcon from '../assets/actions/stop.png';
import deleteIcon from '../assets/actions/Delete.svg';
import { Search } from '../components/search';
import { Border } from '../components/border';
import { GroupModal } from '../components/micro/GroupModal';
import { MonitorItem } from '../components/Monitor/MonitorItem';
import { MonitorGroups } from '../components/Monitor/MonitorGroups';
import { MonitorModal } from '../components/Monitor/MonitorModal';
import { DeleteAll } from '../components/PopUp/DeleteAll';

export const Monitor = () => {
  const [modal, showModal] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [id, setID] = React.useState('');
  const [selectedMonitor, setSelectedMonitor] = React.useState({});
  const [MonitorsGroups, setMonitorsGroup] = useState([]);
  const [activeMonitorGr, setActiveMonitorGr] = useState(selectedMonitor.taskArr || []);
  const className = modal || popup || open ? 'Task blur' : 'Task';

  useEffect(() => {
    let unmounted = false;
    ipcRenderer.send('get-monitor');
    if (!unmounted) {
      ipcRenderer.on('sendMonitors', (e, taskData, data) => {
        setMonitorsGroup(data);
      });
    }

    return () => {
      unmounted = true;
    };
  }, []);
  const handleSelect = (data) => {
    const { uniqueID, taskArr } = data;
    setID(uniqueID);
    setSelectedMonitor(data);
    setActiveMonitorGr(taskArr);
  };
  const CreateMonitor = () => {
    setPopUp(true);
  };
  const StartAll = () => {
    console.log('All tasks are started');
  };
  const StopAll = () => {
    console.log('All tasks are started');
  };
  const createGroup = () => {
    showModal(true);
  };
  const DeleteAllMonitor = () => {
    setOpen(true);
  };
  const closeModal = () => {
    showModal(false);
  };
  const closeDelete = () => {
    setOpen(false);
  };
  const closePopup = () => {
    setPopUp(false);
  };
  const HandleDeleteTaskGroup = (data) => {
    const deleteGroup = MonitorsGroups.filter((t) => t.uniqueID !== data.uniqueID);
    console.log(deleteGroup);
    setMonitorsGroup(deleteGroup);
    setActiveMonitorGr([]);
    ipcRenderer.send('deleteMonitorGroup', data);
    selectedMonitor.taskArr = [];
  };
  return (
    <div style={{ height: '100%' }}>
      <div className={className}>
        <div className="task__content">
          <div className="taskContent__header">
            <div className="taskContent__header__left">
              <div className="Tasks__title">Monitors</div>
              <div className="actions">
                <div className="taskContent__header_actions">
                  <div className="CreateTasks defaultBg" onClick={CreateMonitor}>
                    <span>Add Monitor</span>
                    <img src={createIcon} alt="createIcon" />
                  </div>
                  <div className="StartAll defaultBg" onClick={StartAll}>
                    <span>Start All</span>
                    <img src={startIcon} alt="startIcon" />
                  </div>
                  <div className="StopAll defaultBg" onClick={StopAll}>
                    <span>Stop All</span>
                    <img src={stopIcon} alt="stopIcon" />
                  </div>
                </div>
                <Search plchldr="Search Monitor" setValue={setValue} value={value} />
              </div>
            </div>
            <div className="taskContent__header__right">
              <div className="TaskStatus">
                <span />
                <div className="RunningTask">8 Monitors Running</div>
              </div>
              <div className="DeleteAll" onClick={DeleteAllMonitor}>
                <span>Delete All</span>
                <img src={deleteIcon} alt="deleteIcon" />
              </div>
            </div>
          </div>
          <Border />
          <div className="target">
            <div className="target_content">
              <div className="monitor_content__header">
                <span className="header_site">Site</span>
                <span className="header__product">Product</span>
                <span className="header__proxy">Proxy</span>
                <span className="header__profile">Start Group</span>
                <span className="header__status">Status</span>
                <span className="header__action">Actions</span>
              </div>
              <div className="target_content__body">
                <MonitorItem task={activeMonitorGr} setMonitor={setActiveMonitorGr} idx={selectedMonitor.id} activeMonitor={selectedMonitor} />
              </div>
            </div>
          </div>
        </div>

        <div className="taskGroup">
          <div className="CreateTaskGroup">
            <div className="TaskGroupTitle">Monitor Groups</div>
            <div className="createGroup" onClick={createGroup}>
              <span>Create Group</span>
              <img src={createIcon} alt="createGroup" />
            </div>
          </div>
          <Border />
          {MonitorsGroups.map((task, index) => (
            <MonitorGroups key={task.id} taskGroup={task} active={task.uniqueID === id} idx={index} setActive={handleSelect} deleteTaskGroup={HandleDeleteTaskGroup} />
          ))}
        </div>
      </div>
      {modal && <GroupModal closeModal={closeModal} title="Monitor" tasksGroups={MonitorsGroups} setTasksGroup={setMonitorsGroup} />}
      {popup && <MonitorModal closeModal={closePopup} taskGroupId={selectedMonitor.id} tasks={activeMonitorGr} taskSite={selectedMonitor} setTasks={setActiveMonitorGr} />}
      {open && <DeleteAll title="Monitor" closeModal={closeDelete} tasks={activeMonitorGr} taskGroupId={selectedMonitor.id} setTasks={setActiveMonitorGr} />}
    </div>
  );
};

export default Monitor;
