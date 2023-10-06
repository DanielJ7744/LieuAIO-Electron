// @flow
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SelectBox } from '../SelectBox';
import { Input } from '../Input';
import closeIcon from '../../assets/actions/close.svg';
import createIcon from '../../assets/actions/create.png';
import { ipcRenderer } from 'electron';

export const ProfileModal = ({ closeModal, profileGroupId, profiles, setProfiles, profileSite }) => {
  const [pName, setPName] = useState('');
  const [mName, setMName] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setlName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [Email, setEmail] = useState('');
  const [phoneNm, setPhoneNumber] = useState('');
  const [postCode, setCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [CardNumber, setCardNumber] = useState('');
  const [date, setDate] = useState('');
  const [state, setState] = useState('');
  const [ProfileArrs, setProfileArrs] = useState({
    name: '',
    phone: '',
    key: '',
    dueDate: '',
    cardholder: '',
    email: '',
    fullName: '',
    uniqueID: uuidv4(),
  });
  const States = [
    {
      value: 'Hawaii',
    },
    {
      value: 'Hawaii',
    },
    {
      value: 'Hawaii',
    },
  ];
  let taskArr;
  const handleAdd = () => {
    taskArr = [];
    const obb = { ...ProfileArrs };
    obb.id = `Tid-${uuidv4()}`;
    taskArr.push(obb);
    const combineTask = [...profiles, ...taskArr];
    setProfiles(combineTask);
    ipcRenderer.send('create-profile-task', combineTask, profileGroupId);
    closeModal();
  };
  const handleClose = () => {
    closeModal();
  };
  const handleChange = (e) => {
    setProfileArrs({
      name: pName,
      phone: phoneNm,
      key: CardNumber,
      dueDate: date,
      cardholder: 'Max Mustermann',
      email: Email,
      fullName: `${fName} ${lName}`,
    });
  };
  return (
    <div className="Modal ProfileModal">
      <div className="__Header">
        <span>Create Profile</span>
        <img src={closeIcon} alt="closeIcon" onClick={handleClose} />
      </div>
      <div className="__create__content">
        <div className="taskInputContent">
          <div className="InputItem">
            <div className="accountItem">
              <div className="taskLabel">Profile name</div>
              <Input value={pName} setValue={setPName} plchldr="Profile name here..." handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Email</div>
              <Input value={Email} setValue={setEmail} plchldr="Enter Email Adress" handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Phone Number</div>
              <Input value={phoneNm} setValue={setPhoneNumber} plchldr="Enter Phone Number" handleChangeValue={handleChange} />
            </div>
          </div>
          <div className="InputItem">
            <div className="accountItem">
              <div className="taskLabel">First name</div>
              <Input value={fName} setValue={setFName} plchldr="Enter First Name" handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Enter Last Name</div>
              <Input value={lName} setValue={setlName} plchldr="Enter Last Name" handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Middle Name (optional)</div>
              <Input value={mName} setValue={setMName} plchldr="Enter Middle Name" handleChangeValue={handleChange} />
            </div>
          </div>
          <div className="accountItem">
            <div className="taskLabel">Adress Line 1</div>
            <Input value={address1} setValue={setAddress1} plchldr="Enter Adress Line 1" handleChangeValue={handleChange} />
          </div>
          <div className="accountItem">
            <div className="taskLabel">Adress Line 2</div>
            <Input value={address2} setValue={setAddress2} plchldr="Enter Adress Line 2" handleChangeValue={handleChange} />
          </div>
          <div className="InputItem">
            <div className="accountItem">
              <div className="taskLabel">City</div>
              <Input value={city} setValue={setCity} plchldr="Enter City" handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Postal Code</div>
              <Input value={postCode} setValue={setCode} plchldr="Enter Postal Code" handleChangeValue={handleChange} />
            </div>
            <div className="accountItem">
              <div className="taskLabel">Country</div>
              <Input value={country} setValue={setCountry} plchldr="Enter Country" handleChangeValue={handleChange} />
            </div>
          </div>
          <div className="InputItem">
            <div className="accountItem">
              <div className="taskLabel">State</div>
              <SelectBox selectValue={state} setValue={setState} defaultOp="Hawaii" option={States} handleChangeValue={handleChange} />
            </div>
            <div className="accountItem" />
            <div className="accountItem" />
          </div>
          <div className="InputItem">
            <div className="credit">
              <div className="accountItem">
                <div className="taskLabel">Credit Card Number</div>
                <Input value={CardNumber} setValue={setCardNumber} plchldr="Enter Credit Card Number" handleChangeValue={handleChange} />
              </div>
            </div>
            <div className="accountItem">
              <div className="taskLabel">Exp. Date / CVV</div>
              <Input value={date} setValue={setDate} plchldr="MM/DD | CVV" handleChangeValue={handleChange} />
            </div>
          </div>
          <div className="gap" />
          <div className="actionBtns" onClick={handleAdd}>
            <button type="button" className="__group__create">
              Create Profile
            </button>
            <img src={createIcon} alt="create group" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
