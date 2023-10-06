// @flow
import * as React from 'react';
import { ipcRenderer } from 'electron';
import { useEffect, useRef, useState } from 'react';
import deleteIcon from '../assets/actions/Delete.svg';
import '../styles/Proxy.scss';
import { ProxyGroup } from '../components/Proxy/ProxyGroup';
import { ProxyItem } from '../components/Proxy/ProxyItem';
import { Border } from '../components/border';
import { Search } from '../components/search';
import { GroupModal } from '../components/micro/GroupModal';
import { ProxyModal } from '../components/PopUp/ProxyModal';
import { DeleteAll } from '../components/PopUp/DeleteAll';

import createIcon from '../assets/actions/create.png';
import startIcon from '../assets/actions/start.svg';

export const Proxy = () => {
  const [modal, showModal] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setID] = React.useState('');

  const [value, setValue] = useState('');
  const className = modal || popup || open ? 'Proxy blur' : 'Proxy';
  const [selectedProxy, setSelectedProxy] = React.useState({});
  const [proxiesGroups, setProxiesGroup] = useState([]);
  const [activeProxyGr, setActiveProxyGr] = useState(selectedProxy.taskArr || []);
  const mountedRef = useRef(null);
  useEffect(() => {
    ipcRenderer.send('get-proxies');
    mountedRef.current = true;
    ipcRenderer.on('sendProxies', (e, taskData, data) => {
      setProxiesGroup(data);
    });
    return () => {
      setProxiesGroup([]);
      mountedRef.current = false;
    };
  }, []);
  const handleSelect = (data) => {
    const { uniqueID, taskArr } = data;
    setID(uniqueID);
    setSelectedProxy(data);
    setActiveProxyGr(taskArr);
  };
  const AddProxies = () => {
    setPopUp(true);
  };

  const TestAll = () => {
    console.log('test all');
  };
  const createGroup = () => {
    showModal(true);
  };
  const DeleteAllProxies = () => {
    setOpen(true);
  };
  const closeModal = (e) => {
    showModal(false);
  };
  const closeDelete = () => {
    setOpen(false);
  };
  const closePopup = (e) => {
    setPopUp(false);
  };
  const HandleDeleteTaskGroup = (data) => {
    const deleteGroup = proxiesGroups.filter((t) => t.uniqueID !== data.uniqueID);
    setProxiesGroup(deleteGroup);
    setActiveProxyGr([]);
    ipcRenderer.send('deleteProxyGroup', data);
    selectedProxy.taskArr = [];
  };
  return (
    <div style={{ height: '100%' }}>
      <div className={className}>
        <div className="proxy__content">
          <div className="ProxyContent__header">
            <div className="taskContent__header__left">
              <div className="Tasks__title">Proxies</div>
              <div className="actions">
                <div className="taskContent__header_actions">
                  <div className="CreateTasks defaultBg" onClick={AddProxies}>
                    <span>Add Proxies</span>
                    <img src={createIcon} alt="createIcon" />
                  </div>
                  <div className="StartAll defaultBg" onClick={TestAll}>
                    <span>Test All</span>
                    <img src={startIcon} alt="startIcon" />
                  </div>
                </div>
                <Search plchldr="Search Proxies" setValue={setValue} value={value} />
              </div>
            </div>
            <div className="taskContent__header__right">
              <div className="TaskStatus">
                <span />
                <div className="RunningTask">8 successful Proxies</div>
              </div>
              <div className="DeleteAll" onClick={DeleteAllProxies}>
                <span>Delete All</span>
                <img src={deleteIcon} alt="deleteIcon" />
              </div>
            </div>
          </div>
          <Border />
          <div className="target">
            <div className="target_content">
              <div className="target_content__header">
                <span className="header_id">ID</span>
                <span className="header__mode">Proxy Adress</span>
                <span className="header__product">Speed</span>
                <span className="header__action">Actions</span>
              </div>
              <div className="target_content__body">
                <ProxyItem task={activeProxyGr} idx={selectedProxy.id} setTask={setActiveProxyGr} activeTask={selectedProxy} />
              </div>
            </div>
          </div>
        </div>
        <div className="proxyGroup">
          <div className="CreateProxiesGroup">
            <div className="TaskGroupTitle">Proxy Groups</div>
            <div className="createGroup" onClick={createGroup}>
              <span>Create Group</span>
              <img src={createIcon} alt="createGroup" />
            </div>
          </div>
          <Border />
          {proxiesGroups &&
            proxiesGroups.length > 0 &&
            proxiesGroups.map((task, index) => (
              <ProxyGroup key={task.id} taskGroup={task} active={task.uniqueID === id} idx={index} setActive={handleSelect} deleteTaskGroup={HandleDeleteTaskGroup} />
            ))}
        </div>
      </div>
      {modal && <GroupModal closeModal={closeModal} title="Proxy" tasksGroups={proxiesGroups} setTasksGroup={setProxiesGroup} />}
      {popup && <ProxyModal closeModal={closePopup} taskGroupId={selectedProxy.id} tasks={activeProxyGr} setTasks={setActiveProxyGr} />}
      {open && <DeleteAll title="Proxies" closeModal={closeDelete} tasks={activeProxyGr} taskGroupId={selectedProxy.id} setTasks={setActiveProxyGr} />}
    </div>
  );
};

export default Proxy;
