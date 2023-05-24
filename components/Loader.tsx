"use client"
import { LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <LineWave
      height="100"
      width="100"
      color="#ff5722"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};

export default Loader;
