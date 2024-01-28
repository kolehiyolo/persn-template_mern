// src/components/MyModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// * Importing other Components
import ItemAssignee from '../items/item-assignee.component.js';

// export default function TestModal({ props.showModal, props.handleClose }) {
export default function PopupAddTask(props) {
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
      _id: `newTask-${props.newTasksData.length + 1}`,
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

  useEffect(
    () =>{

    },
    []
  );

  function onSelectedMemberChange(selectedOption) {
    // console.log(selectedOption);

    setUpdatedTaskData(
      prevData => {
        const result = {
          ...prevData,
          'owner': selectedOption._id,
        };

        // console.log(result);
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

        // console.log(result);
        return result;
      }
    );
  };

  function onInputChange(event) {
    setUpdatedTaskData(
      prevValue => {
        let result = {...prevValue, 'name': event.target.value };

        // console.log(result);
        return result;
      }
    );
  };

  function onCancelClick() {
    // console.log('onCancelClick()');
    props.setShowAddTaskModal(false);
    props.handleAddTaskClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: new Date(),
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: `newTask-${props.newTasksData.length + 2}`,
    });
    setAssigneeData(
      {
        _id: '',
        name: '',
        profile_picture: '',
        main_role: '',
        project_role: '',
      }
    );
  };
  
  function onSaveClick() {
    // console.log('onSaveClick()');

    props.setNewTasksData(
      prevValue => {        
        const updatedTasksData = [...prevValue];
        // Set updatedTasksData.start to new Date() if it's empty
        if (updatedTasksData.start === '') {
          updatedTasksData.start = new Date();
        };
        updatedTasksData.push(updatedTaskData);
        
        // console.log(`updatedTasksData`);
        // console.log(updatedTasksData);

        return updatedTasksData;
      }
    );

    props.setShowAddTaskModal(false);
    props.handleAddTaskClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: new Date(),
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: `newTask-${props.newTasksData.length + 2}`,
    });
    setAssigneeData(
      {
        _id: '',
        name: '',
        profile_picture: '',
        main_role: '',
        project_role: '',
      }
    );
  };

  function onDeleteClick() {
    props.setNewTasksData(
      prevValue => {        
        const updatedTasksData = prevValue.filter(task => task._id !== props.taskData._id);
        
        // console.log(`updatedTasksData`);
        // console.log(updatedTasksData);

        return updatedTasksData;
      }
    );

    props.setShowAddTaskModal(false);
    props.handleAddTaskClose();
    setUpdatedTaskData({
      description: '',
      done: '',
      due: '',
      name: '',
      owner: '',
      priority: '',
      project: '',
      start: '',
      _id: '',
    });
    setAssigneeData(
      {
        _id: '',
        name: '',
        profile_picture: '',
        main_role: '',
        project_role: '',
      }
    );
  };

  function onDateChange(date) {
    setUpdatedTaskData(
      prevValue => {
        let result = {...prevValue, 'due': date };

        // console.log(result);
        return result;
      }
    );
  };

  return (
    (props.showAddTaskModal)
    ? (
        <Modal show={props.showAddTaskModal} onHide={props.handleAddTaskClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adding New Task</Modal.Title>
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
                selected={
                  updatedTaskData.due
                } 
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
      )
    : ''
  );
};