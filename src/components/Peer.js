import { useVideo } from "@100mslive/react-sdk";
import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as blazeFace from "@tensorflow-models/blazeface";

function Peer({ peer }) {
  const video = document.getElementById("webcam");
  const instruction = document.getElementById("caminstruct");
  const liveView = document.getElementById("liveView");
  const enableWebcamButton = document.getElementById("webcamButton");
  const instructionText = document.getElementById("camiText");
  const webcam_canvas = document.getElementById("webcam_canvas");
  const cam_ctx = webcam_canvas.getContext("2d");
  const width = 640;
  const height = 480;
  var model = undefined;
  var model_emotion = undefined;
  var control = false;

  function predictWebcam() {
    cam_ctx.drawImage(video, 0, 0, width, height);
    const frame = cam_ctx.getImageData(0, 0, width, height);
    // Now let's start classifying a frame in the stream.
    model.estimateFaces(frame).then(function (predictions) {
      if (predictions.length === 1) {
        const landmark = predictions[0]["landmarks"];
        const nosex = landmark[2][0];
        const nosey = landmark[2][1];
        const right = landmark[4][0];
        const left = landmark[5][0];
        const length = (left - right) / 2 + 5;
        //Cropping the image.
        const frame2 = cam_ctx.getImageData(
          nosex - length,
          nosey - length,
          2 * length,
          2 * length
        );
        //Image is converted to tensor, resized, toBlackandWhite, then additional dimesion are added to match with [1, 48, 48, 1].
        var image_tensor = tf.browser
          .fromPixels(frame2)
          .resizeBilinear([48, 48])
          .mean(2)
          .toFloat()
          .expandDims(0)
          .expandDims(-1);
        //Predicting from image.
        const result = model_emotion.predict(image_tensor);
        const predictedValue = result.arraySync();
        // document.getElementById("angry").style.width =
        //   100 * predictedValue["0"][0] + "%";
        // document.getElementById("disgust").style.width =
        //   100 * predictedValue["0"][1] + "%";
        // document.getElementById("fear").style.width =
        //   100 * predictedValue["0"][2] + "%";
        // document.getElementById("happy").style.width =
        //   100 * predictedValue["0"][3] + "%";
        // document.getElementById("sad").style.width =
        //   100 * predictedValue["0"][4] + "%";
        // document.getElementById("surprise").style.width =
        //   100 * predictedValue["0"][5] + "%";
        // document.getElementById("neutral").style.width =
        //   100 * predictedValue["0"][6] + "%";
      }
      // Call this function again to keep predicting when the browser is ready.
      if (control) window.requestAnimationFrame(predictWebcam);
    });
  }

  useEffect(
    () => async (e) => {
      console.log("here");
      video = document.getElementById("webcam");
      console.log("video:", video);
    },
    []
  );

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  // const video = document.getElementById("webcam");
  // const liveView = document.getElementById("liveView");

  console.log(video);
  var model = undefined;
  var control = false;

  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        id="webcam"
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
