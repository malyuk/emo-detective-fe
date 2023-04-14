import Conference from "../components/Conference";
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Login from "./Login";

export default function App() {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(
    () => async (e) => {
      // e.preventDefault();
      const userName = "sergeyMaliuk";
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
        <>{"Can't connect to lesson"}</>
      )}
    </div>
  );
}
