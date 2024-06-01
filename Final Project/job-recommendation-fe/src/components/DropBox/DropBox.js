import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function DropBox({ jobData, setJobData }) {
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [falseFile, setFalseFile] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef();
  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        if (file.type.match(/\/(.*)/)[1] !== "pdf") {
          setDragging(false);
          setFalseFile(true);
          console.log("File type not supported");
          return;
        }
        const formData = new FormData();
        formData.append("file_data", file);

        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/upload",
            formData
          );
          const data = response.data.text;
          if (data === "Failed to extract text") {
            setFalseFile(true);
          }
          console.log("File uploaded successfully:", data);
          setJobData(data);
          setDragging(false);
        } catch (error) {
          setFalseFile(true);
          console.error("Error uploading file:", error);
          setDragging(false);
        }
      };
      setDropped(true);
      uploadFile();
    }
  }, [file]);
  return (
    <div
      className={`relative max-w-[400px] aspect-square flex flex-col items-center justify-center gap-6 border-[5px] border-${
        falseFile ? "red-500" : "[#D4E7C5]"
      } rounded-lg border-${
        dropped ? "solid" : "dashed"
      } container mt-[40px] p-5 mb-[40px] ${dropped && "pointer-events-none"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
      }}
    >
      {dropped && (
        <button
          className="flex p-3 items-center justify-center rounded-es-lg absolute top-0 right-0 pointer-events-auto"
          onClick={() => (
            setDropped(false), setDragging(false), setFalseFile(false)
          )}
        >
          <i className="fa-solid fa-rotate-left text-black opacity-45"></i>
        </button>
      )}
      {dragging ? (
        <h1 className="text-[25px] font-bold ">Loading...</h1>
      ) : dropped ? (
        <div
          className={`w-[150px] h-[150px] rounded-full border-[6px] ${
            falseFile ? "border-red-700" : "border-green-500"
          } ${
            falseFile ? "text-red-500" : "text-green-500"
          } text-center flex items-center justify-center text-[32px] font-bold opacity-45`}
        >
          {falseFile ? "ERROR" : "DONE"}
        </div>
      ) : (
        <>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-center mb-2">
              Drag your CV here...
            </h2>
            <span className="text-sm opacity-45">
              (supported pdf format: PDF)
            </span>
          </div>

          <button
            className="py-2 px-8 text-center bg-[#D4E7C5] border-[#99BC85] rounded-full border-2 tracking-widest hover:brightness-50 "
            onClick={() => inputRef.current.click()}
          >
            Browse
          </button>

          <input
            type="file"
            name="file"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              setDragging(true);
              setFile(e.target.files[0]);
            }}
          />
        </>
      )}
    </div>
  );
}
