import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <>
      <div>
        <h1>Algebra 2</h1>
      </div>
      <br />
      <div
        className="flex gap-2"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {peers.map((peer) => (
          <Peer
            style={{
              marginBottom: "10px",
              width: "100%",
              height: "auto",
            }}
            key={peer.id}
            peer={peer}
          />
        ))}
      </div>
    </>
  );
}

export default Conference;
