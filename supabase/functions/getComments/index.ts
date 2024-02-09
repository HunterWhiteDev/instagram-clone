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
      const { id } = await req.json();
      const { error: commentsError, data: commentsData } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: false })
        .limit(10);

      data["comments"] = commentsData;
      data["success"] = true;
    } catch (error) {
      console.log(error);
      data["success"] = false;
    }
  }

  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
});
