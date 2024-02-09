//This hook invokes supabase edge functions. via the invokceFunction.ts file (Used for top level react)
import { useEffect, useState } from "react";
import invokeFunction from "../utils/invokeFunction";

type CallbackFunction = (...args: any[]) => void;

export default function useFunction(
  name: string,
  body?: object,
  headers?: object | null,
  callback?: null | undefined | CallbackFunction
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const [success, response] = await invokeFunction(name, body, headers);

      if (success) setData(response);
      if (callback) callback(response);

      setLoading(false);
    };
    getData();
  }, [name, body, headers]);

  return [loading, data];
}
