import React from 'react'
import Moment from 'react-moment';


const Education = ({ education, eduDeleteClick }) => {
    const edu = education.map(edu => (
        <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> - 
        {edu.to === null ? (' Current') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
        </td>
        <td><button className="btn btn-danger" onClick={() => eduDeleteClick(edu._id)}>Delete</button></td>
        </tr>
    ))
    return (
        <div>
          <h4 className="mb-4">Education</h4>
          <table className="table">
          <thead>
          <tr>
          <td>School</td>
          <td>Degree</td>
          <td>Years</td>
          <td></td>
          </tr>
          </thead>
          <tbody>
          {edu}
          </tbody>
          </table>
        </div> 
      )
  }

export default Education;
