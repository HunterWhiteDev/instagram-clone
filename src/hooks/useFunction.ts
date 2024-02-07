import { useEffect, useState } from "react";
import invokeFunction from "../utils/invokeFunction";
export default function useFunction(name: string, body? = {}, headers? = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const [success, data] = await invokeFunction(name, body, headers);
      if (success) setData(data);
      setLoading(false);
    };
    getData();
  }, [name, JSON.stringify(body), JSON.stringify(headers)]);

  return [loading, data];
}
