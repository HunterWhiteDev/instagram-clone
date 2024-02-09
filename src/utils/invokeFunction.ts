import supabase from "../supabase";
import { FunctionInvokeOptions } from "@supabase/functions-js";
export default async function (
  name: string,
  body: object | null = {},
  headers: { [key: string]: string } | null = {}
) {
  const payload: FunctionInvokeOptions = {
    body: body as object,
    headers: headers as { [key: string]: string },
  };
  const { error, data } = await supabase.functions.invoke(name, payload);
  if (error) return [false, null];
  else return [true, JSON.parse(data)];
}
