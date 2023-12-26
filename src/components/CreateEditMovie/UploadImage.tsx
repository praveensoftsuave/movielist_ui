import React, { useEffect, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import DownloadIcon from "../../assets/images/download.svg"
import "./uploadImage.scss"

const UploadImage = ({ imgUrl, maxSize, files, setFiles, accept, ...props }: any) => {
  const [rejectedFiles, setRejectedfiles] = useState<any[]>([])


  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragActive,
    isDragReject,
  } = useDropzone({
    multiple: false,
    maxSize,
    accept,
    noKeyboard: true,
    noDrag: files.length > 0 || rejectedFiles.length > 0,
    onDropAccepted: async (acceptedFiles) => {
      setFiles(acceptedFiles)
      setRejectedfiles([])
    },
    onDropRejected: (rejectedFiless) => {
      setRejectedfiles(rejectedFiless)
      setFiles([])
    },

    ...props,
  })

  const openBrowseFile = (e: any) => {
    e.stopPropagation()
    open()
  }

  const currentClass = useMemo(() => {
    if (isDragActive) {
      return "active"
    }
    if (rejectedFiles.length > 0) {
      return "error"
    }

    if (files.length > 0) {
      return "success"
    }

    return ""
  }, [isDragActive, rejectedFiles, files])

  return (
    <div className="dropbox-container">
      <div
        {...getRootProps({
          className: `dropzone ${currentClass}`,
        })}
      >
        <input {...getInputProps()} />
        {currentClass === "error" ? (
          <div className="file-wrapper">
            <p className="error-filename">Invalid file: {rejectedFiles[0]?.file?.name}</p>
            <span className="helper">Maximum file size: 2MB</span>
            <span className="helper">Only PNG, JPG, JPEG and SVG files supported </span>
          </div>
        ) : currentClass === "success" ? (
          <>
            <div className="file-wrapper">
              <img className="uploaded-image" src={URL.createObjectURL(files[0])} />
            </div>
          </>
        ) : imgUrl ? (
          <div className="file-wrapper">
            <img className="uploaded-image" src={imgUrl} />
          </div>
        ) : (
          <div className="content-wrapper">
            <img className="download-icon" src={DownloadIcon} />
            <p className="content">Drag and drop your file here</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default UploadImage
