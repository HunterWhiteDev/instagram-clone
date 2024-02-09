import { corsHeaders } from "../_shared/corsHeaders.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  let data = {};

  if (req.method !== "OPTIONS") {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    try {
      const { username } = await req.json();

      const auth = await supabase.auth.getUser();

      const { error: userError, data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);

      const user = userData[0];

      const { error: unfollowError, data: unfollowData } = await supabase
        .from("following")
        .delete()
        .eq("follower_id", auth?.data.user?.id)
        .eq("following_id", user?.user_id);

      console.log(unfollowError, unfollowData);

      data["success"] = true;
    } catch (error) {
      console.log(error);
    }
  }

  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
});
