import { downloadImages } from "../downloadImages";

function useDownload(filesOp: unknown) {
  const download = async () => {
    await downloadImages(filesOp);
  };
  return { download };
}

export default useDownload;
