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
      const { commentText, postId } = await req.json();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user.id);

      const { data: commentData, error: commentError } = await supabase
        .from("post_comments")
        .insert({
          comment_text: commentText,
          post_id: postId,
          commenter_id: user.id,
        })
        .select("*");

      console.log({ commentData, commentError });

      data["success"] = true;
      data["comment"] = commentData[0];
    } catch (error) {
      console.log(error);
    }
  }

  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
});
