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

    const {
      data: { user: auth },
    } = await supabase.auth.getUser();
    //This will be the id we use to fetch posts. (Changes based on if we are looking at our own profile or not)
    let postsId = "";

    if (auth.user_metadata.username === username) {
      let user;
      const { error: userError, data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
      if (userData.length) user = userData[0];
      else console.log(userError);

      data["user"] = userData[0];
      data["isUser"] = true;
      postsId = auth.id;
      console.log(auth);
    } else {
      data["isUser"] = false;
      let user;
      const { error: userError, data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
      if (userData.length) user = userData[0];
      else console.log(userError);

      data["user"] = user;
      postsId = user.user_id;

      const { error: followingError, data: followingData } = await supabase
        .from("following")
        .select("*")
        .eq("follower_id", auth.id)
        .eq("following_id", user?.user_id)
        .limit(1);

      if (followingData?.length > 0) data["isFollowing"] = true;
      else data["isFollowing"] = false;
    }

    const { error: postsError, data: postsData } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", postsId)
      .order("created_at", { ascending: false });

    if (postsData) data["posts"] = postsData;
    else console.log("error");
  }

  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
});
