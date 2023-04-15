import { useVideo } from "@100mslive/react-sdk";
import { useEffect, useState, useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import * as blazeFace from "@tensorflow-models/blazeface";
import "../css/Peer.css";
import { postStat } from "../api/lessonApi";
import { UserContext } from "../App";
function Peer({ peer, lessonId }) {
  const { user } = useContext(UserContext);
  let emotions = [];
  const [avgEmotions, setAvgEmotions] = useState({
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    disgusted: 0,
    fearful: 0,
  });
  const [maxEmotion, setMaxEmotion] = useState("");
  let counter = 0;
  let video = null;
  let webcam_canvas = null;
  let cam_ctx = null;

  const width = 480;
  const height = 360;
  var model = undefined;
  var model_emotion = undefined;
  var control = true;

  function predictWebcam() {
    if (cam_ctx === null) return;
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
        emotions = [
          ...emotions,
          {
            angry: predictedValue["0"][0],
            disgust: predictedValue["0"][1],
            fear: predictedValue["0"][2],
            happy: predictedValue["0"][3],
            sad: predictedValue["0"][4],
            surprise: predictedValue["0"][5],
            neutral: predictedValue["0"][6],
          },
        ];
      }
      // console.log(emotions);
      // Call this function again to keep predicting when the browser is ready.
      if (control) window.requestAnimationFrame(predictWebcam);
    });
  }

  useEffect(
    () => async (e) => {
      video = document.getElementById("webcam" + peer.id);
      webcam_canvas = document.getElementById("webcam_canvas" + peer.id);
      cam_ctx = webcam_canvas ? webcam_canvas.getContext("2d") : null;
      model = await blazeFace.load();
      model_emotion = await tf.loadLayersModel("/model/model.json", false);
      predictWebcam();
    },
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const sumObj = emotions.reduce((acc, curr) => {
        Object.entries(curr).forEach(([key, val]) => {
          acc[key] = (acc[key] || 0) + val;
        });
        return acc;
      }, {});

      const avgObj = Object.fromEntries(
        Object.entries(sumObj).map(([key, val]) => [
          key,
          Math.round((val / emotions.length) * 100),
        ])
      );

      setAvgEmotions(avgObj);
      const avgArr = Object.entries(avgObj);

      const maxObj =
        avgArr.length > 0
          ? avgArr.reduce((max, obj) => {
              return obj[1] > max[1] ? obj : max;
            })
          : {};

      // console.log(avgArr);
      console.log(peer.id + " " + maxObj);
      switch (maxObj[0]) {
        case "happy":
          setMaxEmotion("😀");
          break;
        case "sad":
          setMaxEmotion("😞");
          break;
        case "angry":
          setMaxEmotion("😡");
          break;
        case "surprise":
          setMaxEmotion("😲");
          break;
        case "disgust":
          setMaxEmotion("🤢");
          break;
        case "fear":
          setMaxEmotion("😱");
          break;
        case "neutral":
          setMaxEmotion("😐");
          break;
        default:
          setMaxEmotion("");
      }
      let engagementScore = Math.floor(Math.random() * 101);
      let userId = user.userId;
      console.log(userId, lessonId);
      counter++;
      if (avgObj !== undefined && avgObj !== null && avgObj !== {}) {
        console.log(counter);
        if (counter % 60 === 0) {
          postStat(userId, avgObj, engagementScore, lessonId);
          counter = 0;
        }
      }
      emotions = [];
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div
      className="peer-container"
      style={{
        position: "relative",
        width: "480px",
        height: "360px",
      }}
    >
      <video
        ref={videoRef}
        width="480px"
        height="360px"
        id={"webcam" + peer.id}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div
        id="video-overlay"
        width="480px"
        height="360px"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "480px",
          height: "360px",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          fontSize: "2rem",
        }}
      >
        {peer.isLocal ? "You" : peer.name} {" " + maxEmotion}
      </div>
      <canvas
        id={"webcam_canvas" + peer.id}
        width="480"
        height="360"
        style={{ display: "none" }}
      ></canvas>
    </div>
  );
}

export default Peer;
