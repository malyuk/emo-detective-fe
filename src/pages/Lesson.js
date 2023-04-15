import Conference from "../components/Conference";
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { fetchLesson } from "../api/lessonApi";

export default function App() {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(
    () => async (e) => {
      // e.preventDefault();
      //const lesson = await fetchLesson("etNqwBwosOWg8nFKnr0g");
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
        <div>
          <img src="spinner.gif" alt="spinner" />
          <p>{"Connecting"}</p>
        </div>
      )}
    </div>
  );
}
