import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div style={{ textAlign: 'center' }}>
    <Loader 
    type="TailSpin"
    color="#00BFFF"
    height="90"	
    width="90"
 />   
    </div>
  )
}

export default Spinner;
