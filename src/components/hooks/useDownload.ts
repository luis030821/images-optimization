import { downloadImages } from "../downloadImages";

function useDownload(filesOp: { name: string; img: Blob }[] | undefined) {
  const download = async () => {
    if (filesOp != undefined) await downloadImages(filesOp);
  };
  return { download };
}

export default useDownload;
