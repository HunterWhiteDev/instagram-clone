import React, { useEffect, useRef, useState } from "react";
import "./CreateModal.css";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import uploadFile from "../../utils/uploadFile";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";
import invokeFunction from "../../utils/invokeFunction.ts";

interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InsertResponse {
  data: {
    id: string;
  };
}

function CreateModal({ setOpen }: CreateModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

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

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await invokeFunction("addPost");

    console.log({ result });
    // const uuid = crypto.randomUUID();
    // if (file) await uploadFile(file, "posts", `${uuid}`);
    //
    // const user = await supabase.auth.getUser();
    //
    // const uploadRes = await supabase
    //   .from("posts")
    //   .insert({
    //     user_id: user.data.user?.id,
    //     images: [uuid],
    //     description,
    //   })
    //   .select("*");
    //
    // uploadRes.data && navigate(`/post/${uploadRes.data[0].id}`);
  };

  return (
    <div className="absolute h-screen w-screen top-[0] right-[0] bg-[rgba(0,_0,_0,_0.5)]" onClick={handleClose}>
      <div className="bg-[black] w-[33vw] h-3/4 m-auto mt-[1vh] rounded-2xl [box-shadow:0px_0px_100px_black]">
        <div className="text-center [border-bottom:1px_solid_gray]">
          <p>Create new post</p>
        </div>
        <div className="createModal__contentMiddle">
          {!file ? (
            <div className="mt-[25%] flex flex-col items-center">
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
            <form onSubmit={upload}>
              <input
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit" className="blueButton">
                Upload
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CreateModal;
