import { toast } from "react-toastify";
import { eliminarExtension } from "../services/deleteExtension";

function useOptimization(
  files: Array<File & { preview: string }> | undefined,
  setFilesOp: (data: { name: string; img: Blob }[]) => void,
  data: object
) {
  const optimizationFetch = async () => {
    const params = {
      ...data,
    };
    const p = new URLSearchParams(params);
    const url = `https://imagescompress-luisgarrido0987.b4a.run/?${p}`;
    if (files !== undefined) {
      toast.promise(
        async () => {
          const res = await Promise.all(
            files.map(async (file) => {
              const form = new FormData();
              form.append("image", file);
              const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
                body: form,
              });
              const img = await response.blob();
              const rt = {
                img,
                name: eliminarExtension(file.name),
              };
              return rt;
            })
          );
          setFilesOp(res);
        },
        {
          pending: "Optimizando imagenes",
          success: "Imagenes generadas correctamente",
          error: "Error",
        }
      );
    }
  };
  return { optimizationFetch };
}

export default useOptimization;
