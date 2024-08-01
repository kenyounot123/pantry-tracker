"use client"
import { Box, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
import Image from "next/image";

interface CameraComponentProps {
  showCamera: boolean;
  setShowCamera: (show: boolean) => void;
  image: string | null;
  setImage: (image: string | null) => void;
}

const CameraComponent = ({image, setImage, showCamera, setShowCamera}: CameraComponentProps) => {
  const camera = useRef<any>(null);

  const handleTakePhoto = () => {
    if (image) {
      setImage(null)
    }
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo);
    }
  };

  return (
    <>
      {showCamera && 
        <Box sx={{position:"relative", height:300, width:300}}>
          {!image && <Camera errorMessages={{}} ref={camera} />}
          {image && <Image src={image} width={0} height={0} style={{width:"100%", height:"100%"}} alt='Taken photo'/>}
          {showCamera && (
            <Button 
              variant="contained" 
              sx={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%) translateY(110%)" }}
              onClick={handleTakePhoto}
            >
              {image ? "Retake" : "Take Photo"}
            </Button>
          )}
        </Box>}
    </>
  );
}

export default CameraComponent;