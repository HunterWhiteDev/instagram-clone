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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: tableError, data: tableData } = await supabase
      .from("users")
      .insert({
        user_id: user.id,
        username: user.user_metadata.username,
        email: user.email,
      });
    if (tableError) data["success"] = false;
    else data["success"] = true;
  }

  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
});
