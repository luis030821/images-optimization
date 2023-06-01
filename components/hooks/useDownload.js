import React from "react";
import { downloadImages } from "../downloadImages";

function useDownload(filesOp) {
  const download = async () => {
    await downloadImages(filesOp);
  };
  return { download };
}

export default useDownload;
