import ScaleLoader from "react-spinners/ScaleLoader";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-50 blur-0 z-50">
      <ScaleLoader
        color="#000000"
        cssOverride={{}}
        height={50}
        loading
        speedMultiplier={1}
      />
    </div>
  );
}

export default Loading;
