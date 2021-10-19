import { FiUpload } from 'react-icons/fi';
import { DragEvent, useState, ChangeEvent } from 'react';

export default function FileUpload() {
  const [fileName, setFileName] = useState(null);

  const fileUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files[0]) {
      setFileName(event.target.files[0].name)
    }
  };

  const dragOverHandler = (event: DragEvent<HTMLLabelElement>) => { 
    // Prevent default behavior (Prevent file from being opened)
    event.stopPropagation();
    event.preventDefault();
   }

  const dropHandler = (event: DragEvent<HTMLLabelElement>) => { 
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    if (event?.dataTransfer?.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i]?.kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          setFileName(file.name);
        }
      }
    } else if (event?.dataTransfer?.files[0]?.name) {
      setFileName(event.dataTransfer.files[0].name);
    }
  }

  return (
    <section className="flex flex-col pt-8 px-8 pb-16 rounded-md">
      <span className="text-4xl font-bold text-gray-700">Upload</span>
      <span className="text-gray-400 mt-2">Give us a .xls file to process. Don’t have one? Download a template 
      <a className="text-indigo-400 font-bold cursor-pointer hover:text-indigo-500"> here</a>.</span>
      <div id="file-input" className="flex flex-row h-14 space-x-4 mt-8 justify-center">
        <label id="drop-zone" htmlFor="file-upload" onDrop={ dropHandler } onDragOver={ dragOverHandler } className="flex w-96 bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition-all duration-200 rounded-md border-dashed border border-indigo-400 items-center justify-center">
          <span className="text-indigo-400">
            {
              (fileName) ? fileName : 'Drag & drop your file or click here'
            }
          </span>
        </label>
        <button className={ "flex h-full w-14 rounded-md text-white justify-center items-center  transition-all duration-200 " + (fileName ? 'bg-indigo-400 hover:bg-indigo-500' : 'bg-gray-300 cursor-not-allowed')}>
          <FiUpload className="h-6 w-6"/>
        </button>
      </div>
      <input type="file" id="file-upload" className="w-0 absolute invisible" onChange={ fileUploadHandler }/>
    </section>
  );


}