import { corsHeaders } from "../_shared/corsHeaders.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const data = {};

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
      const { commentId } = await req.json();
      console.log({ commentId });
      const { error: commentError, data: dataError } = await supabase
        .from("post_comments")
        .delete()
        .eq("id", commentId);

      console.log({ commentError, dataError });

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
