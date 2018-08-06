import React from 'react'
import Moment from 'react-moment';


const Experience = ({ experience, expDeleteClick }) => {
    const exp = experience.map(exp => (
        <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> - 
        {exp.to === null ? (' Current') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
        </td>
        <td><button className="btn btn-danger" onClick={() => expDeleteClick(exp._id)}>Delete</button></td>
        </tr>
    ))
    return (
        <div>
          <h4 className="mb-4">Experience Credentials</h4>
          <table className="table">
          <thead>
          <tr>
          <td>Company</td>
          <td>Title</td>
          <td>Years</td>
          <td></td>
          </tr>
          </thead>
          <tbody>
          {exp}
          </tbody>
          </table>
        </div> 
      )
  }

export default Experience;
