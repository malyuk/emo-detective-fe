import { useVideo } from "@100mslive/react-sdk";

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const video = document.getElementById('webcam');
  const liveView = document.getElementById('liveView');


  console.log(video)
  var model = undefined;
  var control = false;


  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        id='webcam'
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

