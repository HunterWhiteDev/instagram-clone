import supabase from "../supabase";
import { FunctionInvokeOptions } from "@supabase/functions-js";
export default async function (name: string, body = {}, headers = {}) {
  const payload: FunctionInvokeOptions = {
    body: body,
    headers: headers,
  };
  const { error, data } = await supabase.functions.invoke(name, payload);
  if (error) return [false, null];
  else return [true, JSON.parse(data)];
}
