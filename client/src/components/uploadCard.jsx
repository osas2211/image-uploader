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
  const upload = () => {}
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
          <Button variant="contained" color="success" component="label">
            {" "}
            Select an image
            <input
              type="file"
              hidden
              onInputCapture={(e) => {
                setFileList("")
                setFile(() => URL.createObjectURL(e.target.files[0]))
                handleOpen()
              }}
              value={fileList}
            />
          </Button>
        </Container>
      ) : (
        <UploadPreview image={file} />
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
                handleClose()
                setIsUploading(true)
                setTimeout(() => {
                  setIsUploading(false)
                  setSuccess(true)
                }, 2000)
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
