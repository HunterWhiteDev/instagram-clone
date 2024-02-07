import { corsHeaders } from "../_shared/corsHeaders.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  let data = { posts: [] };

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
    const followerId = user.id;

    const { data: followersData, error: followersError } = await supabase
      .from("following")
      .select("following_id")
      .eq("follower_id", followerId);

    if (followersError) {
      alert(followersError);
    } else {
      // Extract the following IDs from the followersData
      const followingIds = followersData.map(
        (follower) => follower.following_id
      );

      // Now, use the following IDs to fetch the posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .in("user_id", followingIds)
        .order("created_at", { ascending: false });

      if (postsError) {
        data["success"] = false;
      } else {
        data["success"] = true;
        data["posts"] = postsData;
      }
    }
  }

  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
});
