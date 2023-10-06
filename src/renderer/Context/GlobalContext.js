import React, { createContext, useContext, useState } from 'react';
import productlogo from '../assets/product.png';

const MonitorGroups = [
  {
    id: 101,
    name: 'Eastbay US',
    monitorArr: [
      {
        id: 1001,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1002,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1003,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Product found, starting tasks',
        logo: productlogo,
      },
    ],
  },
  {
    id: 102,
    name: 'Eastbay US',
    monitorArr: [
      {
        id: 1001,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1002,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1003,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Product found, starting tasks',
        logo: productlogo,
      },
      {
        id: 1004,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
    ],
  },
  {
    id: 103,
    name: 'Eastbay US',
    monitorArr: [
      {
        id: 1001,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1002,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1003,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Product found, starting tasks',
        logo: productlogo,
      },
      {
        id: 1004,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
    ],
  },
  {
    id: 104,
    name: 'Eastbay US',
    monitorArr: [
      {
        id: 1001,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1002,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1003,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Product found, starting tasks',
        logo: productlogo,
      },
      {
        id: 1004,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
    ],
  },
  {
    id: 105,
    name: 'Eastbay US',
    monitorArr: [
      {
        id: 1001,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1002,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
      {
        id: 1003,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Product found, starting tasks',
        logo: productlogo,
      },
      {
        id: 1004,
        site: 'Eastbay US',
        product: 'Nike Sb Dunk Low Brazil',
        proxy: '',
        startGroup: 'Group 1',
        status: 'Monitoring Product',
        logo: productlogo,
      },
    ],
  },
];
const profGr = [
  {
    id: 1011,
    name: 'Profile Group 1',
    profilesArr: [
      {
        id: 1001,
        name: 'Profile Name 1',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
      {
        id: 1002,
        name: 'Profile Name 1',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
      {
        id: 1003,
        name: 'Profile Name 1',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
      {
        id: 1004,
        name: 'Profile Name 1',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
      {
        id: 1005,
        name: 'visa hard 4',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
    ],
  },
  {
    id: 1012,
    name: 'Profile Group 2',
    profilesArr: [
      {
        id: 1101,
        name: 'Profile Name 1',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
      {
        id: 1102,
        name: 'Profile Name 1',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
      {
        name: 'Profile Name 1',
        phone: 'Phone Number',
        key: '1234',
        dueDate: '12/23',
        cardholder: 'Max Mustermann',
        email: 'email@gmail.com',
        fullName: 'First Last Name',
      },
    ],
  },
];
const proxGroups = [
  {
    id: 20001,
    name: 'Proxy Group 1',
    proxiesArr: [
      {
        id: '1AF',
        Proxy: 'IP:PORT:USERNAME:PASSWORD',
        Speed: '33ms',
      },
      {
        id: '1AF',
        Proxy: 'IP:PORT:USERNAME:PASSWORD',
        Speed: '33ms',
      },
      {
        id: '3AF',
        Proxy: 'IP:PORT:USERNAME:PASSWORD',
        Speed: '33ms',
      },
    ],
  },
  {
    id: 20002,
    name: 'Proxy Group 1',
    proxiesArr: [
      {
        id: '21AF',
        Proxy: 'IP:PORT:USERNAME:PASSWORD',
        Speed: '33ms',
      },
      {
        id: '22AF',
        Proxy: 'IP:PORT:USERNAME:PASSWORD',
        Speed: '33ms',
      },
      {
        id: '1AF',
        Proxy: 'IP:PORT:USERNAME:PASSWORD',
        Speed: '33ms',
      },
    ],
  },
];
const SiteData = [
  {
    id: 1,
    siteName: 'Site1',
    checkout: 'Checkouts',
    checkoutNum: '153',
  },
  {
    id: 2,
    siteName: 'Site2',
    checkout: 'Checkouts',
    checkoutNum: '2453',
  },
  {
    id: 3,
    siteName: 'Site3',
    checkout: 'Checkouts',
    checkoutNum: '2453',
  },
];
export const globalContext = createContext();

export const useGlobal = () => useContext(globalContext);

export const GlobalProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const [tasks, setTasks] = useState([
    {
      name: 'Eastbay US',
      id: 1,
      taskArr: [
        {
          id: 100,
          site: 'Eastbay US',
          product: 'Nike Sb Dunk Low Brazil',
          proxy: '7665',
          profile: 'Profile 1',
          size: 'US8',
          status: 'Successful Purchase',
        },
      ],
    },
  ]);
  // ===========================
  let storageTaskGroups = localStorage.getItem('storageTaskGroups');
  if (storageTaskGroups !== null) {
    storageTaskGroups = JSON.parse(storageTaskGroups);
  } else {
    storageTaskGroups = tasks;
  }
  // ===============================
  const [site, setSite] = useState(SiteData);
  const [activeSite, setActiveSite] = useState(site[0]);
  const [tasksGroups, setTaskGroups] = useState(tasks);
  const [activeTaskGr, setActiveTaskGr] = useState(tasks[0]);
  const [activeTaskGrg, setActiveTaskGrg] = useState(tasks[0].taskArr);
  const [MonitorGroup, setMonitorGroups] = useState(MonitorGroups);
  const [activeMonitorGr, setActiveMonitorGr] = useState(MonitorGroups[0]);
  const [profileGroups, setProfileGroups] = useState(profGr);
  const [activeProfileGr, setActiveProfileGr] = useState(profileGroups[0]);
  const [activeProfileGrg, setActiveProfileGrg] = useState(profileGroups[0].profilesArr);
  const [proxiesGroups, setProxiesGroups] = useState(proxGroups);
  const [activeProxiesGr, setActiveProxiesGr] = useState(proxiesGroups[0]);
  const [mode, setMode] = useState('Profile');

  return (
    <globalContext.Provider
      value={{
        activeTaskGr,
        setActiveTaskGr,
        activeTaskGrg,
        setActiveTaskGrg,
        loggedIn,
        setLoggedIn,
        tasks,
        setTasks,
        MonitorGroup,
        setMonitorGroups,
        activeMonitorGr,
        setActiveMonitorGr,
        profileGroups,
        setProfileGroups,
        activeProfileGr,
        setActiveProfileGr,
        proxiesGroups,
        setProxiesGroups,
        activeProxiesGr,
        setActiveProxiesGr,
        tasksGroups,
        setTaskGroups,
        activeProfileGrg,
        setActiveProfileGrg,
        mode,
        setMode,
        activeSite,
        setActiveSite,
        site,
        setSite,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
