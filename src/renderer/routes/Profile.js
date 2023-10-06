// @flow
import * as React from 'react';
import '../styles/Profile.scss';
import { useEffect, useRef, useState } from 'react';
import { ipcRenderer } from 'electron';
import { ProfileGroup } from '../components/Profile/ProfileGroup';
import { useGlobal } from '../Context/GlobalContext';
import { ProfileItem } from '../components/Profile/ProfileItem';
import { GroupModal } from '../components/micro/GroupModal';
import { ProfileModal } from '../components/PopUp/ProfileModal';
import { Border } from '../components/border';
import { Search } from '../components/search';
import { DeleteAll } from '../components/PopUp/DeleteAll';

import deleteIcon from '../assets/actions/Delete.svg';
import createIcon from '../assets/actions/create.png';
import startIcon from '../assets/actions/start.svg';
import stopIcon from '../assets/actions/stop.png';

export const Profile = () => {
  // const { profileGroups, setProfileGroups, activeProfileGr, setActiveProfileGr, activeProfileGrg, setActiveProfileGrg } = useGlobal();
  const [modal, showModal] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const className = modal || popup || open ? 'Profile blur' : 'Profile';
  const [id, setID] = React.useState('');
  const [selectedProfile, setSelectedProfile] = React.useState({});
  const [profilesGroups, setProfilesGroup] = useState([]);
  const [activeProfileGr, setActiveProfileGr] = useState(selectedProfile.taskArr || []);

  const mountedRef = useRef(null);

  useEffect(() => {
    ipcRenderer.send('get-profile');
    mountedRef.current = true;
    ipcRenderer.on('sendProfiles', (e, taskData, data) => {
      setProfilesGroup(data);
    });
    return () => {
      setProfilesGroup([]);
      mountedRef.current = false;
    };
  }, []);
  const CreateProfile = () => {
    setPopUp(true);
  };
  const DeleteAllProfiles = () => {
    setOpen(true);
  };
  const closeDelete = () => {
    setOpen(false);
  };
  const Export = () => {
    console.log('All tasks are started');
  };
  const Import = () => {
    console.log('All tasks are started');
  };
  const closeModal = () => {
    showModal(false);
  };
  const createGroup = () => {
    showModal(true);
  };
  const closePopup = (e) => {
    setPopUp(false);
  };
  const handleSelect = (data) => {
    const { uniqueID, taskArr } = data;
    setID(uniqueID);
    setSelectedProfile(data);
    setActiveProfileGr(taskArr);
  };
  const HandleDeleteTaskGroup = (data) => {
    const deleteGroup = profilesGroups.filter((t) => t.uniqueID !== data.uniqueID);
    setProfilesGroup(deleteGroup);
    setActiveProfileGr([]);
    ipcRenderer.send('deleteProfileGroup', data);
    selectedProfile.taskArr = [];
  };
  return (
    <div style={{ height: '100%' }}>
      <div className={className}>
        <div className="profile__content">
          <div className="profileContent__header">
            <div className="taskContent__header__left">
              <div className="Tasks__title">Profiles</div>
              <div className="actions">
                <div className="taskContent__header_actions">
                  <div className="CreateTasks defaultBg" onClick={CreateProfile}>
                    <span>Create Profile</span>
                    <img src={createIcon} alt="createIcon" />
                  </div>
                  <div className="StartAll defaultBg" onClick={Export}>
                    <span>Export</span>
                    <img src={startIcon} alt="startIcon" />
                  </div>
                  <div className="StopAll defaultBg" onClick={Import}>
                    <span>Import</span>
                    <img src={stopIcon} alt="stopIcon" />
                  </div>
                </div>
                <Search plchldr="Search Profile" setValue={setValue} value={value} />
              </div>
            </div>
            <div className="taskContent__header__right">
              <div className="TaskStatus">
                <span />
                <div className="RunningTask">3 Profiles In Use</div>
              </div>
              <div className="DeleteAll" onClick={DeleteAllProfiles}>
                <span>Delete All</span>
                <img src={deleteIcon} alt="deleteIcon" />
              </div>
            </div>
          </div>
          <Border />
          <div className="target">
            <div className="target_content">
              <ProfileItem profile={activeProfileGr} setProfile={setActiveProfileGr} idx={selectedProfile.id} activeProfile={selectedProfile} />
            </div>
          </div>
        </div>
        <div className="profileGroup">
          <div className="CreateProfileGroup">
            <div className="TaskGroupTitle">Profile Groups</div>
            <div className="createGroup" onClick={createGroup}>
              <span>Create Group</span>
              <img src={createIcon} alt="createGroup" />
            </div>
          </div>
          <Border />
          {profilesGroups.map((task, index) => (
            <ProfileGroup key={task.id} profileGroup={task} idx={index} active={task.uniqueID === id} setActive={handleSelect} deleteTaskGroup={HandleDeleteTaskGroup} />
          ))}
        </div>
      </div>
      {modal && <GroupModal closeModal={closeModal} title="Profile" tasksGroups={profilesGroups} setTasksGroup={setProfilesGroup} />}
      {popup && <ProfileModal closeModal={closePopup} profileGroupId={selectedProfile.id} profiles={activeProfileGr} setProfiles={setActiveProfileGr} profileSite={selectedProfile} />}
      {open && <DeleteAll title="Profiles" closeModal={closeDelete} tasks={activeProfileGr} taskGroupId={selectedProfile.id} setTasks={setActiveProfileGr} />}
    </div>
  );
};

export default Profile;
