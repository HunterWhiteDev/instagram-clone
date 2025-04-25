import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "http://127.0.0.1:54321/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
);

export default supabase;

const run = async () => {
  const res1 = await fetch(
    "https://res.cloudinary.com/enchanting/q_70,f_auto,w_1024,h_512,c_fit/moorings-web/2023/06/tm_glb_2022_st_lucia_dan_atkins_sailing_002_mod_2400x1200.jpg",
  );

  const img = await res1.blob();

  await supabase.storage
    .from("posts/")
    .upload(
      "45d0e653-92a0-48fa-9762-c9958f78e687/945e9736-2bef-4010-97c9-55b246787280.jpg",
      img,
    );
};

run();
