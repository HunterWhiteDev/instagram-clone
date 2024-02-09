import supabase from "../supabase";

export default async function (user_id: string): Promise<string> {
  const { data: usernameRes } = await supabase
    .from("users")
    .select("username")
    .eq("user_id", user_id);

  return usernameRes[0]?.username || "";
}
