// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
import CardProjectVertical from '../cards/card-project-vertical.component.js';
// import CardTask from './card-task.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
import './page-projects.component.scss';

export default function PageProjects(props) {
  console.log('MOUNT PageProjects()');
  const [projects, setProjects] = useState([]);
  const [filterMode, setFilterMode] = useState('All Projects');

  // * Fetch Projects from DB on mount
  useEffect(
    () =>{
      fetchProjects();
    },
    []
  );

  // * This fetches all Projects from DB
  function fetchProjects() {
    console.log(`RUN PageProjects -> fetchProjects()`); 
    axios.get('http://localhost:5000/users/' + props.currentUser)
      .then(res => {
        const user = res.data;
        axios.get('http://localhost:5000/projects')
          .then(res => {
            const projects = res.data.filter(project => user.projects.includes(project._id));
            console.log(` - Success! ${projects.length} projects found`);
            console.log(`\n`);
            setProjects(projects);
          });
      });
  };

  // * When "Add New" is clicked
  function onAddNewClick() {
    console.log(`RUN PageProjects -> onAddNewClick()`); 
    window.location.href='/projects/new';
  };

  // * 
  function generateProjectVertical(projectData) {
    return (
      <CardProjectVertical 
        currentUser={props.currentUser}
        projectData={projectData}
        key={projectData._id}  
        filterMode={filterMode}
      />
    )
  }

  function handleToggleChange(event) {
    setFilterMode(event.target.value);
  };

  // * Render
  return (
    <div className='page-projects'>
      <div className='head'>
        <h3>Projects</h3>
        <div className='buttons'>
          <button 
            className="btn btn-primary"
            onClick={
              () => {
                onAddNewClick();
              }
            }
            >
            Add New
          </button>
          <div className="task-filter-toggle btn-group" role="group" aria-label="Basic radio toggle button group">
            <input 
              type="radio"
              className="btn-check"
              name="btnradio-projects-filter"
              id="btnradio-projects-filter-1"
              autoComplete="off"
              checked={filterMode === 'All Projects'}
              onChange={handleToggleChange}
              value="All Projects"
            />
            <label 
              className="btn btn-outline-primary" htmlFor="btnradio-projects-filter-1"
            >
              All Projects
            </label>
            <input 
              type="radio"
              className="btn-check"
              name="btnradio-projects-filter"
              id="btnradio-projects-filter-2"
              autoComplete="off"
              checked={filterMode === 'Not Done'}
              onChange={handleToggleChange}
              value="Not Done"              
            />
            <label 
              className="btn btn-outline-primary" htmlFor="btnradio-projects-filter-2"
            >
              Not Done
            </label>
          </div>
        </div>
      </div>
      <div className='body'>
        {
          projects.map(generateProjectVertical)
        }
      </div>
    </div>
  );
}