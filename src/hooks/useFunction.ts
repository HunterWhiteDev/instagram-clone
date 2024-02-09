//This hook invokes firebase functions. via the invokceFunction.ts file (Used for top level react)
import { useEffect, useState } from "react";
import invokeFunction from "../utils/invokeFunction";

export default function useFunction(
  name: string,
  body?: object,
  headers?: object
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const [success, response] = await invokeFunction(name, body, headers);

      if (success) setData(response);
      setLoading(false);
    };
    getData();
  }, [name, body, headers]);

  return [loading, data];
}
