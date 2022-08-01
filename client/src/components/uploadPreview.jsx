import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { CopyToClipboard } from "react-copy-to-clipboard"

export const UploadPreview = ({ image }) => {
  const [isCopied, setIsCopied] = React.useState(false)
  return (
    <Container align="center" className="card">
      <div>
        <CheckCircleOutlineIcon color="success" />
      </div>
      <Typography variant="string">Uploaded Successfully</Typography>
      <Box
        className="img"
        sx={{
          width: "90%",
          marginY: "1rem",
          height: "auto",
        }}
      >
        <img src={image} style={{ borderRadius: "1rem" }} alt="cloud" />
      </Box>
      <Box
        sx={{
          backgroundColor: "rgba(76, 147, 76, 0.14)",
          padding: 1,
          marginBottom: 1,
          width: "85%",
          borderRadius: "0.5rem",
          border: "1px solid rgba(76, 147, 76, 0.54)",
        }}
      >
        <Typography>{image.slice(0, 35) + "..."}</Typography>
      </Box>
      <Button variant="contained" color="success">
        <CopyToClipboard
          text={image}
          onCopy={() => {
            setIsCopied(true)
            setTimeout(() => {
              setIsCopied(false)
            }, 5000)
          }}
        >
          <span>{isCopied ? "copied!" : "copy"}</span>
        </CopyToClipboard>
      </Button>
    </Container>
  )
}
