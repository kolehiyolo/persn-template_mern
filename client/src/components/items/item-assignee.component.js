// * Dependencies
import React, {useState, useEffect} from "react";
import axios from 'axios';

// * Importing other Components
// import ItemAvatarCircle from './item-avatar-circle.component.js';

// * Importing images/SVG
// import { ReactComponent as SVGCheck } from '../svg/check-circle.svg';
// import { ReactComponent as SVGCheck2 } from '../svg/check-circle-2.svg';

// * Stylesheets
// import './item-member.component.scss';

export default function ItemAssignee(props) {
  // console.log('MOUNT CardProjectVertical()');
  // const [doneStatus, setDoneStatus] = useState(props.projectData.done);
  const [memberData, setMemberData] = useState(
    {
      name: {
        first: '',
        last: ''
      },
      role: ''
    }
  );

  // * Fetch Member Data from DB on mount
  useEffect(
    () =>{
      // console.log('ASSIGNEE ADDED');
    },
    []
  );
  
  // * Render
  return (
    <div className='item-assignee' value={props.data._id}  {...props.innerProps}>
      <div className='group-1'>
        <div className='left'>
          <div
            className="item-avatar-circle"
            key={props.data._id}
          >
            <img src={props.data.profile_picture} alt={'User ' + props.data._id + ' Avatar'} />
          </div>
        </div>
        <div className='right'>
          <p className='name'>{props.data.name.first} {props.data.name.last}</p>      
          <p className='role'>{props.data.project_role}</p>      
        </div>
      </div>
      <div className='group-2'>
      </div>
      {props.label}
    </div>
  );
};

// // // CustomOption component to render each option
// // const CustomOption = ({ innerProps, label }) => (
// //   <div {...innerProps}>
// //     {/* You can customize the content here, e.g., display an image */}
// //     <img src={`http://example.com/profiles/${label}.jpg`} alt={`Profile of ${label}`} />
// //     {label}
// //   </div>
// // );


// // CustomOption component to render each option
// const CustomOption = ({ innerProps, label, data }) => (
//   <div {...innerProps}>
//     {/* You can customize the content here, e.g., display an image */}
//     <img src={`http://example.com/profiles/${label}.jpg`} alt={`Profile of ${label}`} />
//     {label}
//   </div>
// );
