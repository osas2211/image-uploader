import React from "react"
import {
  Box,
  Typography,
  Container,
  Button,
  Modal,
  LinearProgress,
} from "@mui/material"
import "./box.css"
import img from "../images/undraw_cloud_files.svg"
import { UploadPreview } from "./uploadPreview"

export const UploadCard = () => {
  const [file, setFile] = React.useState(null)
  const [fileList, setFileList] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState(<p></p>)
  const upload = async () => {
    let formData = new FormData()
    //formData.append("name", "imageUrl")
    formData.append("image", imageUrl)
    handleClose()
    setIsUploading(true)

    try {
      const res = await fetch("/api/image", {
        body: formData,
        method: "POST",
      })
      const data = await res.json()
      setImageUrl(data.image.path)
      console.log(data)
      setIsUploading(false)
      setSuccess(true)
    } catch (error) {
      console.log(error.message)
      setIsUploading(false)
      setSuccess(false)
    }
  }
  return (
    <Box className={"box"}>
      {isUploading ? (
        <Box className="uploadBar">
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="string">Uploading...</Typography>
          </Box>
          <LinearProgress color="success" />
        </Box>
      ) : !success ? (
        <Container align={"center"} className={"card"}>
          <div style={{ marginBottom: "1rem", fontSize: "1.3rem" }}>
            <Typography variant="string">Upload your image</Typography>
          </div>
          <div>
            <small style={{ opacity: "0.7" }}>
              File should be Jpeg, Png...
            </small>
          </div>
          <div className="img">
            <img src={img} alt="cloud" />
          </div>
          <form action="">
            <Button
              variant="contained"
              color="success"
              component="label"
              type="submit"
            >
              {" "}
              Select an image
              <input
                type="file"
                name="image"
                hidden
                onChange={(e) => {
                  setFileList("")
                  setImageUrl(e.target.files[0])
                  setFile(() => URL.createObjectURL(e.target.files[0]))
                  handleOpen()
                }}
                value={fileList}
              />
            </Button>
          </form>
        </Container>
      ) : (
        <UploadPreview image={imageUrl} />
      )}
      {/* .......Preview Section........ */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "25rem",
            bgcolor: "background.paper",
            boxShadow: 24,
            display: "flex",
            p: 2,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography variant="string">Preview</Typography>
          <Box
            className="img"
            sx={{ width: "90%", marginY: "1rem", height: "auto" }}
          >
            <img src={file} alt="cloud" />
          </Box>
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                // handleClose()
                // setIsUploading(true)
                // setTimeout(() => {
                //   setIsUploading(false)
                //   setSuccess(true)
                // }, 2000)
                upload()
              }}
            >
              Upload Image
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  )
}
