import {
  useCallback,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import Webcam from "react-webcam";

const CameraContext = createContext(null);

const videoConstraints = {
  width: 480,
  height: 480,
  facingMode: "user",
};

export function Capture({ children }) {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  }, [webcamRef]);

  return (
    <CameraContext.Provider
      value={{
        capture,
      }}
    >
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 100 }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          minScreenshotWidth={480}
          minScreenshotHeight={480}
        />
      </div>
      {children}
    </CameraContext.Provider>
  );
}

export function useCapture() {
  const context = useContext(CameraContext);

  if (context === undefined) {
    throw new Error("useCapture must be used within a CaptureProvider");
  }
  return context;
}
