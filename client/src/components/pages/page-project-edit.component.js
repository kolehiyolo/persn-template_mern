// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";

// * Importing other Components
import CardProjectEditInfo from '../cards/card-project-edit-info.component.js';
import CardProjectEditTasks from '../cards/card-project-edit-tasks.component.js';
import PopupWarnWOptions from '../popup/popup-warn-w-options.component.js';
import PopupWarn from "../popup/popup-warn.component.js";
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-project-edit.component.scss';

export default function PageProjectEdit(props) {
  // console.log('MOUNT PageProjectEdit()');
  const [oldProjectData, setOldProjectData] = useState([]);
  const [newProjectData, setNewProjectData] = useState([]);
  const [oldTasksData, setOldTasksData] = useState();
  const [newTasksData, setNewTasksData] = useState();
  const [oldMembersData, setOldMembersData] = useState();
  const [newMembersData, setNewMembersData] = useState();
  const [oldCurrentUserFriendsData, setOldCurrentUserFriendsData] = useState();
  const [currentUserFriendsData, setCurrentUserFriendsData] = useState();
  const [allTasksAreAssigned, setAllTasksAreAssigned] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSaveWithUnassignedTasks, setShowSaveWithUnassignedTasks] = useState(false);
  
  const { id: projectID } = useParams();

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchAllOldData();
    },
    [projectID]
  );

  useEffect(
    () => {
      // console.log(newProjectData);
    },
    [newProjectData]
  );
  
  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      setCurrentUserFriendsData(removeFriendsWhoAreMembers(newMembersData, oldCurrentUserFriendsData));
    },
    [newMembersData, oldCurrentUserFriendsData]
  );

  function removeFriendsWhoAreMembers(fetchedMembersData, fetchedCurrentUserFriendsData) {
    if (fetchedMembersData !== undefined && fetchedCurrentUserFriendsData !== undefined) {
      // Extract _id values from newMembersData array
      const newMembersIds = fetchedMembersData.map(user => user._id);
      
      // Filter currentUserFriendsData to include only users whose _id is not in newMembersIds
      const updatedFriendsData = fetchedCurrentUserFriendsData.filter(
        user => !newMembersIds.includes(user._id)
        );
      
      return updatedFriendsData;
    }
  };

  // * This fetches all Data related to the Project, including the tasks data and members data
  function fetchAllOldData() {
    // console.log(`RUN PageProjectEdit -> fetchAllData()`); 
    axios.get('http://localhost:5000/projects/' + projectID)
      .then(
        res => {
          const project = res.data;
          setOldProjectData(project);
          setNewProjectData(project);

          console.log('oldProjectData');
          console.log(project);

          const fetchedTasksData = [];
          Promise.all(
            project.tasks.map((taskID) =>
              axios.get(`http://localhost:5000/tasks/${taskID}`)
                .then(
                  (res) => {
                    const refinedTaskData = res.data;
                    fetchedTasksData.push(refinedTaskData);
                  }
                )
            )
          )
            .then(() => {
              setOldTasksData(fetchedTasksData);
              setNewTasksData(fetchedTasksData);

              console.log('oldTasksData');
              console.log(fetchedTasksData);
            })

          const fetchedMembersData = [];
          const fetchedFriendsData = [];

          const currentUserFriendsPromise = Promise.all(
            project.members.map((member) =>
              axios.get(`http://localhost:5000/users/${member._id}`)
                .then((res) => {
                  const fetchedMemberData = res.data;
                  const refinedMemberData = {
                    _id: member._id,
                    name: fetchedMemberData.name,
                    profile_picture: fetchedMemberData.profile_picture,
                    project_role: member.role,
                    main_role: fetchedMemberData.main_role,
                    projects: fetchedMemberData.projects,
                  };
                  fetchedMembersData.push(refinedMemberData);
                })
            )
          ).then(() => {
            setNewMembersData(fetchedMembersData);
            setOldMembersData(fetchedMembersData);
            console.log('oldMembersData');
            console.log(fetchedMembersData);
          })
            .then(() => axios.get(`http://localhost:5000/users/${props.currentUser}`))
            .then((res) => {
              let result = res.data.friends;
              result.unshift(props.currentUser);
              return result;
            })
            .then((currentUserFriends) => {
              // console.log('currentUserFriends:');
              // console.log(currentUserFriends);

              // Fetching data for each Friend
              const friendPromises = currentUserFriends.map((friendID) =>
                axios.get(`http://localhost:5000/users/${friendID}`)
                  .then((res) => {
                    const fetchedFriendData = res.data;
                    const refinedFriendData = {
                      _id: friendID,
                      name: fetchedFriendData.name,
                      profile_picture: fetchedFriendData.profile_picture,
                      main_role: fetchedFriendData.main_role,
                      projects: fetchedFriendData.projects,
                    };
                    return refinedFriendData;
                  })
              );

              return Promise.all(friendPromises);
            })
            .then((fetchedCurrentUserFriendsData) => {
              // console.log('fetchedCurrentUserFriendsData:');
              // console.log(fetchedCurrentUserFriendsData);

              setOldCurrentUserFriendsData(fetchedCurrentUserFriendsData);
              setCurrentUserFriendsData(removeFriendsWhoAreMembers(fetchedMembersData, fetchedCurrentUserFriendsData));
            });
            }
          )
  };

  function onBackClick() {
    // TODO this should throw an "Are you sure" popup before allowing
    window.location.href='/project/' + projectID;
  };

  function saveProject() {
    console.log('Saving Project');
    setShowSaveModal(false);
    console.log('oldProjectData');
    console.log(oldProjectData);
    console.log('newProjectData');
    console.log(newProjectData);
    console.log('oldTasksData');
    console.log(oldTasksData);
    console.log('newTasksData');
    console.log(newTasksData);
    console.log('oldMembersData');
    console.log(oldMembersData);
    console.log('newMembersData');
    console.log(newMembersData);

    let finalProjectData = {...newProjectData};
    
    function saveNewMembersData() {
      return new Promise((resolve, reject) => {
        newMembersData.forEach(newMember => {
          if (oldMembersData.some(oldMember => oldMember._id === newMember._id)) {
            finalProjectData.members.find(member => member._id === newMember._id).role = newMember.project_role;
          } else {
            finalProjectData.members.push({
              _id: newMember._id,
              role: newMember.project_role
            });
    
            const newMemberProjectsList = {
              projects: newMember.projects
            };
            axios.post(`http://localhost:5000/users/update/projects/${newMember._id}`, newMemberProjectsList)
              .then(res => console.log(res.data));
          }
        });
    
        oldMembersData.forEach(oldMember => {
          if (newMembersData.some(newMember => newMember._id === oldMember._id)) {
            // console.log('Old Member! (Processed this already)');
          } else {
            finalProjectData.members = finalProjectData.members.filter(member => member._id !== oldMember._id);
            const deletedMemberProjectsList = {
              projects: oldMember.projects.filter(project => project !== projectID)
            };
            axios.post(`http://localhost:5000/users/update/projects/${oldMember._id}`, deletedMemberProjectsList)
              .then(res => console.log(res.data));
          }
        });
        resolve();
      });
    }
  
    function saveNewTasksData() {
      return new Promise((resolve, reject) => {
        let promises = [];
    
        newTasksData.forEach(newTask => {
          if (oldTasksData.some(oldTask => oldTask._id === newTask._id)) {
            console.log('Old Task!');
            promises.push(axios.post(`http://localhost:5000/tasks/update/${newTask._id}`, newTask)
              .then(res => console.log(res.data)));
          } else {
            console.log('New Task!');
            const newTaskData = {
              name: newTask.name,
              start: newTask.start,
              due: newTask.due,
              done: false,
              owner: newTask.owner,
              project: newProjectData._id,
              priority: newTask.priority,
              description: newTask.description
            }
            promises.push(axios.post(`http://localhost:5000/tasks/add`, newTaskData)
              .then(res => {
                console.log('New Task Added! ID: ' + res.data._id);
                finalProjectData.tasks.push(res.data._id);
                // console.log(finalProjectData.tasks);
              }));
          }
        });
    
        oldTasksData.forEach(oldTask => {
          if (newTasksData.some(newTask => newTask._id === oldTask._id)) {
            console.log('Old Task! (Processed this already)');
          } else {
            console.log('Deleted Task!');
            promises.push(axios.delete(`http://localhost:5000/tasks/${oldTask._id}`)
              .then(res => console.log(res.data)));
            finalProjectData.tasks = finalProjectData.tasks.filter(task => task !== oldTask._id);  
          }
        }); 
    
        Promise.all(promises).then(() => resolve());
      });
    }
  
    function finalProjectSave() {
      console.log('finalProjectSave()');
      console.log('finalProjectData');
      console.log(finalProjectData);
      axios.post(`http://localhost:5000/projects/update/${newProjectData._id}/newTask`, finalProjectData)
        .then(res => {
          console.log(res.data);
          window.location.href=`/project/${newProjectData._id}`;
        });
    };
  
    Promise.all([saveNewMembersData(), saveNewTasksData()])
      .then(() => finalProjectSave())
      .catch(error => console.error(error));
  };
  
  function deleteProject() {
    console.log('Deleting Project');
    setShowDeleteModal(false);
    // TODO
    // Delete the project from the DB
  };

  function onProjectDeleteClick() {
    console.log(`RUN PageProjectEdit -> onDeleteClick()`);
    setShowDeleteModal(true);
  };

  function onProjectSaveClick() {
    console.log(`RUN PageProjectEdit -> onProjectSaveClick()`);

        
    if (allTasksAreAssigned) {
      console.log('allTasksAreAssigned is true');      
      setShowSaveModal(true);
    }
    else {
      console.log('allTasksAreAssigned is false');
      console.log('Checking for unassigned tasks');

      if (newTasksData.some(task => task.owner === "Unassigned")) {
        console.log('Cannot save project because not all tasks are assigned');
        setShowSaveWithUnassignedTasks(true);
      } else {
        setShowSaveModal(true);
        setAllTasksAreAssigned(true);
      }
    }
  };

  // * Render
  return (
    <>
      {showDeleteModal && (
        <PopupWarnWOptions
          showModal={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          title="Delete Project"
          subtitle="You can’t retrieve deleted projects"
          confirmButtonText="Confirm"
          confirmVariant="danger"
          cancelButtonText="Cancel"
          onConfirm={deleteProject}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {showSaveModal && (
        <PopupWarnWOptions
          showModal={showSaveModal}
          handleClose={() => setShowSaveModal(false)}
          title="Save Project"
          subtitle="You can’t undo saved changes"
          confirmButtonText="Confirm"
          confirmVariant="success"
          cancelButtonText="Cancel"
          onConfirm={saveProject}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
      {showSaveWithUnassignedTasks && (
        <PopupWarn
          title="Can't do that"
          subtitle="You have unassigned tasks"
          cancelButtonText="Ok"
          onCancel={() => setShowSaveWithUnassignedTasks(false)}
        />
      )}
      <div 
        className='page-project'
        id={'page-project-'+oldProjectData._id}
      >
        <div className='head'>
          <div className='buttons'>
            <button 
              className="btn btn-primary"
              onClick={
                () => {
                  onBackClick();
                }
              }
              >
              Back
            </button>
          </div>
          <h3>Editing {oldProjectData.name}</h3>
        </div>
        <div className='body'>
          <CardProjectEditInfo 
            oldProjectData={oldProjectData}
            oldTasksData={oldTasksData}
            oldMembersData={oldMembersData}
            newProjectData={newProjectData}
            newTasksData={newTasksData}
            newMembersData={newMembersData}
            setNewProjectData={setNewProjectData}
            setNewTasksData={setNewTasksData}
            setNewMembersData={setNewMembersData}
            currentUserFriendsData={currentUserFriendsData}
            setCurrentUserFriendsData={setCurrentUserFriendsData}
            allTasksAreAssigned={allTasksAreAssigned}
            setAllTasksAreAssigned={setAllTasksAreAssigned}
            onProjectSaveClick={onProjectSaveClick}
            onProjectDeleteClick={onProjectDeleteClick}
            currentUser={props.currentUser}
          />
          {
            (newTasksData !== undefined)
            ? <CardProjectEditTasks 
                projectData={oldProjectData}
                currentUser={props.currentUser}
                oldProjectData={oldProjectData}
                oldTasksData={oldTasksData}
                oldMembersData={oldMembersData}
                newProjectData={newProjectData}
                newTasksData={newTasksData}
                newMembersData={newMembersData}
                setNewProjectData={setNewProjectData}
                setNewTasksData={setNewTasksData}
                setNewMembersData={setNewMembersData}
                currentUserFriendsData={currentUserFriendsData}
                setCurrentUserFriendsData={setCurrentUserFriendsData}
                allTasksAreAssigned={allTasksAreAssigned}
                setAllTasksAreAssigned={setAllTasksAreAssigned}
              />
            : ''
          }
        </div>
      </div>
    </>
  );
}