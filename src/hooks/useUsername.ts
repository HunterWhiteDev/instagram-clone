import { useEffect, useState } from "react";
import getUsername from "../utils/getUsername";
export default function (user_id: string) {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const getName = async () => {
      const response = await getUsername(user_id);
      setUsername(response);
    };

    getName();
  }, [user_id]);

  return username;
}
