import { useEffect, useState } from "react";
import supabase from "../supabase";
import { User } from "@supabase/supabase-js";

export default function () {
  const [auth, setAuth] = useState<User | null>(null);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setAuth(user);
    };

    getData();
  }, []);

  return auth;
}
