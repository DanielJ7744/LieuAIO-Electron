// @flow
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import '../styles/Task.scss';
import { ipcRenderer } from 'electron';
import createIcon from '../assets/actions/create.png';
import startIcon from '../assets/actions/start.svg';
import stopIcon from '../assets/actions/stop.png';
import deleteIcon from '../assets/actions/Delete.svg';
import { TaskGroup } from '../components/task/TaskGroup';
import { TaskItem } from '../components/task/TaskItem';
import { GroupModal } from '../components/micro/GroupModal';
import { TaskModal } from '../components/PopUp/TaskModal';
import { Search } from '../components/search';
import { Border } from '../components/border';
import { DeleteAll } from '../components/PopUp/DeleteAll';

export const Task = () => {
  const [modal, showModal] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [id, setID] = React.useState('');
  const [selectedTask, setSelectedTask] = React.useState({});
  const [tasksGroups, setTasksGroup] = useState([]);
  const [activeTaskGr, setActiveTaskGr] = useState(selectedTask.taskArr || []);
  const mountedRef = useRef(true);

  useEffect(() => {
    ipcRenderer.send('get-tasks');
    if (mountedRef) {
      ipcRenderer.on('sendTasks', (e, taskData, data) => {
        setTasksGroup(data);
      });
    }

    return () => {
      mountedRef.current = false;
    };
  }, [tasksGroups]);

  const handleSelect = (data) => {
    const { uniqueID, taskArr } = data;
    setID(uniqueID);
    setSelectedTask(data);
    setActiveTaskGr(taskArr);
  };
  const className = modal || popup || open ? 'Task blur' : 'Task';
  const createTask = () => {
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
  const closeModal = () => {
    showModal(false);
  };
  const DeleteAllTasks = () => {
    setOpen(true);
  };
  const closeDelete = () => {
    setOpen(false);
  };
  const closePopup = () => {
    setPopUp(false);
  };
  const HandleDeleteTaskGroup = (data) => {
    const deleteGroup = tasksGroups.filter((t) => t.uniqueID !== data.uniqueID);
    setTasksGroup(deleteGroup);
    setActiveTaskGr([]);
    ipcRenderer.send('deleteGroup', data);
    selectedTask.taskArr = [];
  };

  return (
    <div style={{ height: '100%' }}>
      <div className={className}>
        <div className="task__content">
          <div className="taskContent__header">
            <div className="taskContent__header__left">
              <div className="Tasks__title">Tasks</div>
              <div className="actions">
                <div className="taskContent__header_actions">
                  <div className="CreateTasks defaultBg" onClick={createTask}>
                    <span>Create Tasks</span>
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
                <Search plchldr="Search Tasks" setValue={setValue} value={value} />
              </div>
            </div>
            <div className="taskContent__header__right">
              <div className="TaskStatus">
                <span />
                <div className="RunningTask">8 Tasks Running</div>
              </div>
              <div className="DeleteAll" onClick={DeleteAllTasks}>
                <span>Delete All</span>
                <img src={deleteIcon} alt="deleteIcon" />
              </div>
            </div>
          </div>
          <Border />
          <div className="target">
            <div className="target_content">
              <div className="target_content__header">
                <span className="header_site">Site</span>
                <span className="header__product">Product</span>
                <span className="header__proxy">Proxy</span>
                <span className="header__profile">Profile</span>
                <span className="header__size">Size</span>
                <span className="header__status">Status</span>
                <span className="header__action">Actions</span>
              </div>
              <div className="target_content__body">
                <TaskItem task={activeTaskGr} setTask={setActiveTaskGr} idx={selectedTask.id} activeTask={selectedTask} />
              </div>
            </div>
          </div>
        </div>

        <div className="taskGroup">
          <div className="CreateTaskGroup">
            <div className="TaskGroupTitle">Task Group</div>
            <div className="createGroup" onClick={createGroup}>
              <span>Create Group</span>
              <img src={createIcon} alt="createGroup" />
            </div>
          </div>
          <Border />
          {tasksGroups.map((task, index) => (
            <TaskGroup key={task.id} taskGroup={task} active={task.uniqueID === id} idx={task.id} setActive={handleSelect} deleteTaskGroup={HandleDeleteTaskGroup} />
          ))}
        </div>
      </div>
      {modal && <GroupModal closeModal={closeModal} title="Task" tasksGroups={tasksGroups} setTasksGroup={setTasksGroup} />}
      {popup && <TaskModal closeModal={closePopup} taskGroupId={selectedTask.id} tasks={activeTaskGr} taskSite={selectedTask} setTasks={setActiveTaskGr} />}
      {open && <DeleteAll title="Tasks" closeModal={closeDelete} tasks={activeTaskGr} taskGroupId={selectedTask.id} setTasks={setActiveTaskGr} />}
    </div>
  );
};

export default Task;
