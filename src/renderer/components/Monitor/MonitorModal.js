// @flow
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ipcRenderer } from 'electron';
import { Input } from '../Input';
import { SelectBox } from '../SelectBox';
import closeIcon from '../../assets/actions/close.svg';
import createIcon from '../../assets/actions/create.png';

export const MonitorModal = ({ closeModal, taskGroupId, tasks, taskSite, setTasks }) => {
  const [store, setStore] = useState('');
  const [size, setSize] = useState('');
  const [mode, setMode] = useState('');
  const [profiles, setProfile] = useState('');
  const [proxys, setProxy] = useState('');
  const [quantitys, setQuantity] = useState('');
  const [Product, setProduct] = useState('');
  const [taskArrs, setTaskArrs] = useState({
    site: '',
    product: '',
    proxy: '',
    startGroup: '',
    size: '',
    status: 'Monitoring Product',
    uniqueID: uuidv4(),
  });
  const Size = [
    {
      value: 'xl',
    },
    {
      value: 'L',
    },
  ];
  const Modes = [
    {
      value: 'Modes1',
    },
    {
      value: 'Modes2',
    },
    {
      value: 'Modes3',
    },
    {
      value: 'Modes4',
    },
  ];
  const stores = [
    {
      value: 'store1',
    },
    {
      value: 'store2',
    },
    {
      value: 'store3',
    },
    {
      value: 'store4',
    },
  ];
  const Products = [
    {
      value: 'Product1',
    },
    {
      value: 'Product2',
    },
    {
      value: 'Product3',
    },
    {
      value: 'Product4',
    },
  ];
  const profile = [
    {
      value: 'profile 1',
    },
    {
      value: 'profile 2',
    },
    {
      value: 'profile 3',
    },
    {
      value: 'profile 4',
    },
    {
      value: 'profile 5',
    },
  ];
  const proxy = [
    {
      value: 'proxy list 1',
    },
    {
      value: 'proxy list 2',
    },
    {
      value: 'proxy list 3',
    },
    {
      value: 'proxy list 4',
    },
    {
      value: 'proxy list 5',
    },
  ];
  let taskArr;

  const handleAdd = () => {
    taskArr = [];
    const obb = { ...taskArrs };
    obb.id = `Tid-${uuidv4()}`;
    taskArr.push(obb);
    const combineTask = [...tasks, ...taskArr];
    setTasks(combineTask);
    console.log(combineTask);
    ipcRenderer.send('create-group-monitor', combineTask, taskGroupId);
    closeModal();
  };
  const handleClose = () => {
    closeModal();
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setTaskArrs({
      site: store,
      product: Product,
      startGroup: 'Group 1',
      proxy: proxys,
      size,
      status: 'Monitoring Product',
    });
  };
  return (
    <div className="Modal">
      <div className="__Header">
        <span>Add Monitor</span>
        <img src={closeIcon} alt="closeIcon" onClick={handleClose} />
      </div>
      <div className="__create__content">
        <div className="taskInputContent">
          <div className="InputItem">
            <div className="accountItem">
              <div className="taskLabel">Store</div>
              <SelectBox selectValue={store} setValue={setStore} defaultOp="Footlocker US" option={stores} handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Size</div>
              <SelectBox selectValue={size} setValue={setSize} defaultOp="Select Size" option={Size} handleChangeValue={handleChange} />
            </div>
          </div>
          <div className="skuInput">
            <div className="taskLabel">Product</div>
            <SelectBox selectValue={Product} setValue={setProduct} defaultOp="Keywords, URL +-" option={Products} handleChangeValue={handleChange} />
          </div>
          <div className="InputItem">
            <div className="accountItem">
              <div className="taskLabel">Profile</div>
              <SelectBox selectValue={profiles} setValue={setProfile} defaultOp="Select Profile" option={profile} handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Proxy</div>
              <SelectBox selectValue={proxys} setValue={setProxy} defaultOp="Select Proxy" option={proxy} handleChangeValue={handleChange} />
            </div>
          </div>
          <div className="InputItem">
            <div className="accountItem">
              <div className="taskLabel">Mode</div>
              <SelectBox selectValue={mode} setValue={setMode} defaultOp="Select Mode" option={Modes} handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Amount</div>
              <Input value={quantitys} setValue={setQuantity} plchldr="Enter Amount ( set to 1 )" handleChangeValue={handleChange} />
            </div>
          </div>
        </div>
        <div className="actionBtns">
          <button type="button" className="__group__create" onClick={handleAdd}>
            Create Tasks
          </button>
          <img src={createIcon} alt="create group" />
        </div>
      </div>
    </div>
  );
};

export default MonitorModal;
