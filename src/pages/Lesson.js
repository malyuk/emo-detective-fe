import Conference from "../components/Conference";
import { useEffect, useContext } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { fetchLesson } from "../api/lessonApi";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

export default function App() {
  const params = useParams();
  const { user } = useContext(UserContext);

  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(
    () => async (e) => {
      // e.preventDefault();
      const lesson = await fetchLesson(params.id);
      // const userName = "sergeyMaliuk";
      const roomCode = lesson.roomCode;
      console.log("roomCode", roomCode);
      // const roomCode = "bcf-iowk-qfa";
      // use room code to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

      try {
        await hmsActions.join({ userName: user.displayName, authToken });
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

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
          <Conference />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="spinner.gif" alt="spinner" />
        </div>
      )}
    </div>
  );
}
