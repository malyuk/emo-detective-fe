import Conference from "../components/Conference";
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { postStat, fetchLesson } from "../api/lessonApi";

export default function App() {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(
    () => async (e) => {
      // e.preventDefault();
      // const lesson = await fetchLesson("etNqwBwosOWg8nFKnr0g");
      const userName = "sergeyMaliuk";
      // const roomCode = lesson.roomCode;
      const roomCode = "bcf-iowk-qfa";
      // use room code to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

      try {
        await hmsActions.join({ userName, authToken });
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      let emotions = [
        { name: "happy", value: Math.floor(Math.random() * 101) },
        { name: "sad", value: Math.floor(Math.random() * 101) },
        { name: "angry", value: Math.floor(Math.random() * 101) },
        { name: "surprised", value: Math.floor(Math.random() * 101) },
        { name: "disgusted", value: Math.floor(Math.random() * 101) },
        { name: "fearful", value: Math.floor(Math.random() * 101) },
      ];
      let engagementScore = Math.floor(Math.random() * 101);
      let userId = "ce8dcca6-4ca7-42a5-8a90-652b4d4ddcdf";
      postStat(userId, emotions, engagementScore);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="App">
      {isConnected ? (
        <>
          {" "}
          <canvas
            id="webcam_canvas"
            width="640"
            height="475"
            style="margin:0; display: none"
          >
            Canvas not supported
          </canvas>
          <Conference />
        </>
      ) : (
        <>{"Can't connect to lesson"}</>
      )}
    </div>
  );
}
