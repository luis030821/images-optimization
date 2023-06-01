import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import { formats } from "./data/imagesFormat";
import useOptimization from "./hooks/useOptimization";
import useDownload from "./hooks/useDownload";
import { eliminarExtension } from "./services/deleteExtension";
import { mostrarPesoArchivo } from "./services/sizeImage";
export function DropImages() {
  const [files, setFiles] = useState();
  const [filesOp, setFilesOp] = useState();
  const [quality, setQ] = useState("80");
  const [format, setFormat] = useState("webp");
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFilesOp(undefined);
    },
  });
  const { optimizationFetch } = useOptimization(files, setFilesOp, {
    quality,
    format,
  });
  const ArraySize = (files) => {
    const sum = 0;
    files.forEach((x) => {
      sym = x.size + sum;
    });
  };
  const ArraysSizeOp = (files) => {
    files.forEach((x) => {
      sym = x.img.size + sum;
    });
  };
  const { download } = useDownload(filesOp);
  return (
    <section className="container">
      <div className="App_action ">
        <select
          onChange={(e) => {
            setFormat(e.target.value);
          }}
          value={format}
        >
          {formats.map((x) => (
            <option value={x}>{x.toUpperCase()}</option>
          ))}
        </select>
        {filesOp == undefined ? (
          <button onClick={optimizationFetch}>Optimizar</button>
        ) : (
          <>
            <button onClick={optimizationFetch}>Optimizar</button>
            <button onClick={download}>Descargar</button>
          </>
        )}
      </div>

      <div>
        {files != undefined && (
          <p>
            {files.length == 1 ? (
              mostrarPesoArchivo(files[0].size)
            ) : (
              <>
                {mostrarPesoArchivo(
                  files?.reduce((acc, next) => acc.size + next.size)
                )}
              </>
            )}
          </p>
        )}
        {filesOp != undefined && (
          <p>
            El peso optimizado total es:{" "}
            {filesOp.length == 1
              ? mostrarPesoArchivo(filesOp[0].img.size)
              : mostrarPesoArchivo(
                  filesOp?.reduce((acc, next) => acc.img?.size + next.img?.size)
                )}
          </p>
        )}
        {filesOp != undefined && (
          <p>
            Prueba el peso con diferentes calidad de imagen y otros formatos
          </p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
          width: "300px",
        }}
      >
        <p> Calidad de imagen al {quality}%</p>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
      </div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Arrastra las imagenes o haz click aqui</p>
        <div className="svg">
          <svg width="150" height="150" viewBox="0 0 30 30" fill="white">
            <path d="M15.5535 5.49392C15.4114 5.33852 15.2106 5.25 15 5.25C14.7894 5.25 14.5886 5.33852 14.4465 5.49392L10.4465 9.86892C10.167 10.1746 10.1882 10.649 10.4939 10.9285C10.7996 11.208 11.274 11.1868 11.5535 10.8811L14.25 7.9318V19C14.25 19.4142 14.5858 19.75 15 19.75C15.4142 19.75 15.75 19.4142 15.75 19V7.9318L18.4465 10.8811C18.726 11.1868 19.2004 11.208 19.5061 10.9285C19.8118 10.649 19.833 10.1746 19.5535 9.86892L15.5535 5.49392Z" />
            <path d="M6.75 18C6.75 17.5858 6.41422 17.25 6 17.25C5.58579 17.25 5.25 17.5858 5.25 18V18.0549C5.24998 19.4225 5.24996 20.5248 5.36652 21.3918C5.48754 22.2919 5.74643 23.0497 6.34835 23.6516C6.95027 24.2536 7.70814 24.5125 8.60825 24.6335C9.47522 24.75 10.5775 24.75 11.9451 24.75H18.0549C19.4225 24.75 20.5248 24.75 21.3918 24.6335C22.2919 24.5125 23.0497 24.2536 23.6517 23.6516C24.2536 23.0497 24.5125 22.2919 24.6335 21.3918C24.75 20.5248 24.75 19.4225 24.75 18.0549V18C24.75 17.5858 24.4142 17.25 24 17.25C23.5858 17.25 23.25 17.5858 23.25 18C23.25 19.4354 23.2484 20.4365 23.1469 21.1919C23.0482 21.9257 22.8678 22.3142 22.591 22.591C22.3142 22.8678 21.9257 23.0482 21.1919 23.1469C20.4365 23.2484 19.4354 23.25 18 23.25H12C10.5646 23.25 9.56347 23.2484 8.80812 23.1469C8.07435 23.0482 7.68577 22.8678 7.40901 22.591C7.13225 22.3142 6.9518 21.9257 6.85315 21.1919C6.75159 20.4365 6.75 19.4354 6.75 18Z" />
          </svg>
        </div>
      </div>
      {files?.map((x, index) => (
        <div key={index} className="images-container">
          <p>{eliminarExtension(x.name)}</p>
          <img className="img" key={index} src={x.preview} />
          <p>El peso es: {mostrarPesoArchivo(x.size)}</p>
          {filesOp != undefined && (
            <p>
              El peso optimizado es:{" "}
              {mostrarPesoArchivo(
                filesOp?.find(
                  (e) => eliminarExtension(e.name) == eliminarExtension(x.name)
                ).img.size
              )}
            </p>
          )}
        </div>
      ))}
      <ToastContainer />
    </section>
  );
}

export default DropImages;
