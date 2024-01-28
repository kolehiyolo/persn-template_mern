// src/components/MyModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';

// * Importing other Components
import ItemFriend from '../items/item-friend.component.js';

export default function PopupAddMember(props) {
// const TestModal = (props) => {
  const [newMemberData, setNewMemberData] = useState(
    {
      _id: '',
      name: '',
      profile_picture: '',
      main_role: '',
      project_role: '',
      projects: '',
    }
  );

  useEffect(
    () =>{
      // fetchAllOldData();
    },
    [props.currentUserFriendsData]
  );
  
  function onSelectFriendChange(selectedOption) {
    // // console.log(selectedOption);

    setNewMemberData(
      prevData => {
        // Do the ff only if the props.newProjectData._id is not yet in the selectedOption.projects already

        const result = {
          ...prevData,
          '_id': selectedOption._id,
          'name': selectedOption.name,
          'profile_picture': selectedOption.profile_picture,
          'main_role': selectedOption.main_role,
          'projects': selectedOption.projects,
        };

        // // console.log(result);
        return result;
      }
    )
  };

  function onRoleChange(event) {
    setNewMemberData(
      prevValue => {
        let result = {...prevValue, 'project_role': event.target.value };

        // // console.log(result);
        return result;
      }
    );
  };

  function onCancelClick() {
    // console.log('onCancelClick()');
    props.setShowModal(false);
    props.handleClose();
    setNewMemberData({
      _id: '',
      name: '',
      profile_picture: '',
      main_role: '',
      project_role: '',
      projects: '',
    });
  };
  
  function onSaveClick() {
    // console.log('onSaveClick()');

    props.setNewMembersData(
      prevValue => {        
        const updatedMembersData = [...prevValue];
        if (!newMemberData.projects.includes(props.newProjectData._id)) {
          newMemberData.projects.push(props.newProjectData._id);
        }
        updatedMembersData.push(newMemberData);
        
        // console.log(`updatedMembersData`);
        // console.log(updatedMembersData);

        return updatedMembersData;
      }
    );

    props.setShowModal(false);
    props.handleClose();
    setNewMemberData({
      _id: '',
      name: '',
      profile_picture: '',
      main_role: '',
      project_role: '',
      projects: '',
    });
  };

  return (
    (props.showModal)
    ? (
        <Modal show={props.showModal} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="group-1">
              <Select
                options={props.currentUserFriendsData}
                value={newMemberData._id || ''}
                onChange={(selectedOption) => onSelectFriendChange(selectedOption)}
                isSearchable
                placeholder="Select a friend"
                components={{
                  Option: ItemFriend, // Custom component for rendering options
                }}
              />
            </div>
            {
              (newMemberData._id !== '')
              ? <div className='item-member' value={newMemberData._id}>
                  <div className='group-1'>
                    <div className='left'>
                      <div
                        className="item-avatar-circle"
                        key={newMemberData._id}
                      >
                        <img src={newMemberData.profile_picture} alt={'User ' + newMemberData._id + ' Avatar'} />
                      </div>
                    </div>
                    <div className='right'>
                      <p className='name'>{newMemberData.name.first} {newMemberData.name.last}</p>      
                      <p className='role'>{newMemberData.main_role}</p>      
                    </div>
                  </div>
                  <div className='group-2'>
                  </div>
                  {props.label}
                </div>
              : ''
            }
            <div className="group-3">
              <label htmlFor="project_role" className="form-label">Project Role</label>
              <input
                type="text"
                className="form-control"
                id="project_role"
                name="project_role"
                aria-describedby="emailHelp"
                value={newMemberData.project_role || ''}
                onChange={onRoleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSaveClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )
    : ''
  );
};