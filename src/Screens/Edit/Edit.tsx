import { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import "./Edit.css";
import supabase from "../../supabase";
import uploadFile from "../../utils/uploadFile";
import { AuthUser } from "@supabase/supabase-js";
import { debounce } from "lodash";
function Edit() {
  const uploadInputRef = useRef();

  const [authUser, setAuthUser] = useState<AuthUser>();
  const [pfp, setPfp] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [pronouns, setPronouns] = useState<string>("");

  const updateFieldHandler = async (field: string, input: string) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        [field]: input,
      })
      .eq("user_id", authUser?.id)
      .select("*");
  };
  //Use for updating both pronouns and bio fields
  const updateField = useMemo(
    () =>
      debounce(
        (field: string, input: string) => updateFieldHandler(field, input),
        500
      ),
    []
  );

  const getPfp = () => {
    const { data } = supabase.storage.from("pfps").getPublicUrl(authUser?.id);
    setPfp(data.publicUrl + "?random=" + new Date().getTime());
  };

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setAuthUser(user as AuthUser);
    };

    getData();
  }, []);

  const getUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("pronouns, bio")
      .eq("user_id", authUser?.id);
    const { pronouns, bio } = data[0];

    setPronouns(pronouns);
    setBio(bio);
  };

  useEffect(() => {
    getPfp();
    getUserData();
  }, [authUser]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const res = await uploadFile(file, "pfps", authUser?.id);
      getPfp();
    }
  };

  return (
    <>
      <Sidebar />
      <div className="edit">
        <div className="edit__form">
          <div className="edit__formPfp">
            <div className="edit__formPfpLeft">
              <img src="https://rnypbaefekpaolxsxhqo.supabase.co/storage/v1/object/public/pfps/d1c6169b-b544-4183-9d12-a263bac6efe8?random=1706721439602" />
              <p>
                <span>Name</span>
                <br />
                <span>Email</span>
              </p>
            </div>
            <div className="edit__formPfpRight">
              <button
                onClick={() => uploadInputRef.current.click()}
                className="blueButton"
              >
                Change Photo
              </button>
              <input
                onChange={handleUpload}
                style={{ display: "none" }}
                type="file"
                ref={uploadInputRef}
              ></input>
            </div>
          </div>

          <div>
            <h4>Bio</h4>
            <textarea
              value={bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                updateField("bio", e.target.value);
                setBio(e.target.value);
              }}
            ></textarea>
          </div>

          <div>
            <h4>Pronouns</h4>
            <input
              value={pronouns}
              placeholder="They/Them"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateField("pronouns", e.target.value);
                setPronouns(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
