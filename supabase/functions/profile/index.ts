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

    const { username } = await req.json();

    console.log({ username });

    const {
      data: {
        user: { id: authId },
      },
    } = await supabase.auth.getUser();

    const res = await supabase
      .from("following")
      .select("*")
      .eq("follower_id", authId)
      .eq("following_id", user?.user_id)
      .limit(1);

    if (res?.data?.length > 0) data["isFollowing"] = true;
    else data["isFollowing"] = false;
  }

  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
});
