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
import { useNavigate } from "react-router-dom";

export default function App() {
  const params = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(
    () => async (e) => {
      // e.preventDefault();
      const lesson = await fetchLesson(params.id);
      // const userName = "sergeyMaliuk";
      const roomCode = lesson.roomCode;
      // console.log("roomCode", roomCode);
      // console.log();
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
      <div>
        <div className=" w-1/4 ml-auto px-4">
          <button
            onClick={(e) => {
              if (isConnected) {
                hmsActions.leave();
                navigate("/dashboard");
              }
            }}
            className="flex h-12 items-center justify-center font-bold bg-violet-500 hover:bg-violet-600 text-white text-xl rounded-lg p-2 w-full w-full mt-4 mx-auto"
          >
            Leave the class
          </button>
        </div>
      </div>

      {isConnected ? (
        <>
          {" "}
          <Conference lessonId={params.id} />
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
          <img src="/spinner.gif" alt="spinner" />
        </div>
      )}
    </div>
  );
}
