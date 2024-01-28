// src/components/MyModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// * Importing other Components
import ItemAssignee from '../items/item-assignee.component.js';
import PopupWarnWOptions from './popup-warn-w-options.component.js';
export default function PopupEditTask(props) {
  const [updatedTaskData, setUpdatedTaskData] = useState(
    {
      description: '',
      done: '',
      due: new Date(),
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    }
  );
  const [assigneeData, setAssigneeData] = useState(
    {
      _id: '',
      name: '',
      profile_picture: '',
      main_role: '',
      project_role: '',
    }
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(
    () =>{
      initializeUpdatedTaskData();
    },
    [props.taskData, props.newMembersData]
  );

  function initializeUpdatedTaskData() {
    setUpdatedTaskData(props.taskData);
      if (props.newMembersData !== undefined) {
        setAssigneeData(
          () => {
            if (props.taskData.owner != 'Unassigned') {
              return props.newMembersData.find(user => user._id === props.taskData.owner);
            } else {
              return {
                _id: '',
                name: '',
                profile_picture: '',
                main_role: '',
                project_role: '',
              };
            }
          }
        );
      };
  };

  function onSelectedMemberChange(selectedOption) {
    setUpdatedTaskData(
      prevData => {
        const result = {
          ...prevData,
          'owner': selectedOption._id,
        };
        return result;
      }
    );
    
    setAssigneeData(
      prevData => {
        const result = {
          ...prevData,
          '_id': selectedOption._id,
          'name': selectedOption.name,
          'profile_picture': selectedOption.profile_picture,
          'main_role': selectedOption.main_role,
          'project_role': selectedOption.project_role,    
        };
        return result;
      }
    );
  };

  function onInputChange(event) {
    setUpdatedTaskData(
      prevValue => {
        let result = {...prevValue, 'name': event.target.value };
        return result;
      }
    );
  };

  function onDateChange(date) {
    setUpdatedTaskData(
      prevValue => {
        let result = {...prevValue, 'due': date };
        return result;
      }
    );
  };

  function onCancelClick() {
    props.setShowEditModal(false);
    props.handleEditClose();
    setShowDeleteModal(false);
    initializeUpdatedTaskData();
    // setUpdatedTaskData({
    //   description: '',
    //   done: '',
    //   due: new Date(),
    //   name: '',
    //   owner: '',
    //   priority: '',
    //   project: '',
    //   start: '',
    //   _id: '',
    // });
  };
  
  function onSaveClick() {
    props.setNewTasksData(
      prevValue => {        
        const updatedTasksData = prevValue.map(task =>
          task._id === updatedTaskData._id ? updatedTaskData : task
        );
        return updatedTasksData;
      }
    );

    props.handleEditClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: new Date(),
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    });
  };

  function onDeleteClick() {
    props.handleEditClose();
    setShowDeleteModal(true);
  };

  function deleteTask() {
    props.setNewTasksData(
      prevValue => {        
        const updatedTasksData = prevValue.filter(task => task._id !== props.taskData._id);
        return updatedTasksData;
      }
    );

    props.setShowEditModal(false);
    props.handleEditClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: new Date(),
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    });
  };

  return (
    <>
      {showDeleteModal && (
        <PopupWarnWOptions
          showModal={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          title="Delete Task"
          subtitle="Are you sure you want to delete this task?"
          confirmButtonText="Confirm"
          confirmVariant="danger"
          cancelButtonText="Cancel"
          onConfirm={deleteTask}
          onCancel={onCancelClick}
        />
      )}
      {props.showEditModal && (
        <Modal show={props.showEditModal} onHide={props.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="group-1">
              <Select
                options={props.newMembersData}
                value={assigneeData._id || ''}
                onChange={(selectedOption) => onSelectedMemberChange(selectedOption)}
                isSearchable
                placeholder="Select an assignee"
                components={{
                  Option: ItemAssignee, // Custom component for rendering options
                }}
              />
            </div>
            {
              (assigneeData._id !== '')
              ? <div className='item-member' value={assigneeData._id}>
                  <div className='group-1'>
                    <div className='left'>
                      <div
                        className="item-avatar-circle"
                        key={assigneeData._id}
                      >
                        <img src={assigneeData.profile_picture} alt={'User ' + assigneeData._id + ' Avatar'} />
                      </div>
                    </div>
                    <div className='right'>
                      <p className='name'>{assigneeData.name.first} {assigneeData.name.last}</p>      
                      <p className='role'>{assigneeData.project_role}</p>      
                    </div>
                  </div>
                  <div className='group-2'>
                  </div>
                  {props.label}
                </div>
              : ''
            }
            <div className="group-3">
              <label htmlFor="task_name" className="form-label">Task</label>
              <input
                type="text"
                className="form-control"
                id="task_name"
                name="task_name"
                aria-describedby="emailHelp"
                value={updatedTaskData.name || ''}
                onChange={onInputChange}
              />
            </div>
            <div className="group-4">
              <label htmlFor="task_name" className="form-label">Task</label>
              <DatePicker
                selected={new Date(updatedTaskData.due)} 
                onChange={onDateChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onDeleteClick}>
              Delete
            </Button>
            <Button variant="primary" onClick={onSaveClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};