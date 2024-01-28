// * Dependencies
import React, { useState, useEffect } from "react";
import axios from 'axios';
import PopupWarnWOptions from '../popup/popup-warn-w-options.component.js';
import PopupWarn from "../popup/popup-warn.component.js";

// * Importing other Components
// import CardProjectInfo from './section-project-info.component.js';
// import ItemTask from '../items/item-task.component.js';
// import CardTask from './card-task.component.js';
import ItemAvatarCircle from './item-avatar-circle.component.js';

// * Stylesheets
import './item-edit-member.component.scss';

export default function ItemEditMember(props) {
  const [updatedMemberData, setUpdatedMemberData] = useState(props.projectMemberData);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showDeleteSelfPopup, setShowDeleteSelfPopup] = useState(false);

  // * Fetch Task Data from DB on mount
  useEffect(() => {
    updateNewMembersData(updatedMemberData);
  }, [updatedMemberData]);

  function updateNewMembersData(updatedMemberData) {
    props.setNewMembersData(prevValue => {
      const indexToUpdate = prevValue.findIndex(member => member._id === updatedMemberData._id);

      const updatedMembersData = [...prevValue];
      updatedMembersData[indexToUpdate] = updatedMemberData;

      // console.log(updatedMembersData);
      return updatedMembersData;
    });
  };

  function onRoleChange(event) {
    setUpdatedMemberData(prevValue => {
      let result = { ...prevValue, 'project_role': event.target.value };

      return result;
    });
  };

  function deleteMember() {
    console.log('DELETE MEMBER');

    props.setNewMembersData(prevValue => {
      const updatedMembersData = prevValue.filter(member => member._id !== updatedMemberData._id);

      console.log(`updatedMembersData`);
      console.log(updatedMembersData);
      return updatedMembersData;
    });

    props.setNewTasksData(prevValue => {
      // Map over tasksData and update "owner" property for matching members
      const updatedTasksData = prevValue.map(task => {
        if (task.owner === updatedMemberData._id) {
          props.setAllTasksAreAssigned(false);
          return { ...task, owner: 'Unassigned' };
        }
        return task;
      });

      console.log(`updatedTasksData`);
      console.log(updatedTasksData);
      return updatedTasksData;
    });
  };

  function onDeleteClick() {
    console.log('onDeleteClick()');
    
    if (updatedMemberData._id === props.currentUser) {
      console.log('You can\'t delete yourself');
      setShowDeleteSelfPopup(true);
    } else {
      setShowDeletePopup(true);
    };
  };

  function onConfirmDelete() {
    deleteMember();
    setShowDeletePopup(false);
  }

  function onCancelDelete() {
    setShowDeletePopup(false);
  }

  // * Render
  return (
    <div className='item-edit-member'>
      <div className='group-1'>
        <div className='left'>
          <ItemAvatarCircle
            userID={updatedMemberData._id}
          />
        </div>
        <div className='right'>
          <p>Member Name</p>
          <input
            type="text"
            className="form-control"
            id="project_title"
            name="project_title"
            aria-describedby="emailHelp"
            value={updatedMemberData.project_role || ''}
            onChange={onRoleChange}
          />
        </div>
      </div>
      <div className='group-2'>
        <button onClick={onDeleteClick}>Delete</button>
      </div>
      {showDeletePopup && (
        <PopupWarnWOptions
          title="Delete Member"
          subtitle="You have to reassign their tasks to others"
          confirmVariant="danger"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
        />
      )}
      {showDeleteSelfPopup && (
        <PopupWarn
          title="Can't do that"
          subtitle="You can't remove yourself"
          cancelButtonText="Ok"
          onCancel={() => setShowDeleteSelfPopup(false)}
        />
      )}
    </div>
  );
};