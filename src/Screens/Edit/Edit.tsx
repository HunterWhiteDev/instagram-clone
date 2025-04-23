import { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
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
        500,
      ),
    [],
  );

  const getPfp = async () => {
    const { data } = await supabase.storage
      .from("pfps")
      .getPublicUrl(authUser?.id);
    setPfp(data.publicUrl + "?random=" + Math.random());
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
      <div className="ml-[calc(15vw + 1rem)]">
        <div className="mx-[auto] my-[0] flex items-center flex-col">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src={pfp} />
              <p>
                <span>Name</span>
                <br />
                <span>Email</span>
              </p>
            </div>
            <div className="mt-2">
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
