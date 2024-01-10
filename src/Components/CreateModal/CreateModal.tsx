import { useRef, useState } from "react";
import "./CreateModal.css";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateModal({ setOpen }: CreateModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>();

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="createModal__bkg" onClick={handleClose}>
      <div className="createModal__content">
        <div className="createModal__contentTop">
          <p>Create new post</p>
        </div>
        <div className="createModal__contentMiddle">
          {!file ? (
            <div className="creatModal__contentMiddlePrompt">
              <InsertPhotoOutlinedIcon />
              <h3>Drag photos and vidoes here</h3>
              <button
                onClick={() => inputRef.current?.click()}
                className="blueButton"
              >
                Select photos from computer
              </button>
              <input onChange={onFileSelect} ref={inputRef} type="file" />
            </div>
          ) : (
            <img src={fileUrl} />
          )}
        </div>

        {file ? (
          <div className="createModal__bottom">
            <form>
              <input placeholder="Add description" />
              <button className="blueButton">Upload </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CreateModal;
