import React from 'react'
import axios from "axios"

export const FileUploader = (props: any) => {
  const [selectedFile, setSelectedFile]: any = React.useState()
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0])
  }
  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      <button onClick={props.handleSubmission}>Submit</button>
    </div>
  )
}
