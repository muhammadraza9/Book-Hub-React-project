import React from 'react'

 function Alert(props) {
  return (

        props.alert && <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{ backgroundColor: "#3c7c41ff", color: "white" }}>
                <strong>{props.alert.type}</strong> : {props.alert.msg}
            </div>
  )
}

export default Alert