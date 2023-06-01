import { toast } from "react-toastify";
import { eliminarExtension } from "../services/deleteExtension";

function useOptimization(files, setFilesOp, data) {
  const optimizationFetch = async () => {
    const params = {
      ...data,
    };
    const p = new URLSearchParams(params);
    // https://imagescompress-luisgarrido0987.b4a.run
    const url = `http://localhost:3001/?${p}`;
    toast.promise(
      async () => {
        const res = await Promise.all(
          files.map(async (file) => {
            const form = new FormData();
            form.append("image", file);
            const response = await fetch(url, {
              method: "POST",
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
  };
  return { optimizationFetch };
}

export default useOptimization;
