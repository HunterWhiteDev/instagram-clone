import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase.ts";
// const supabase = createClient(
//   "https://rnypbaefekpaolxsxhqo.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJueXBiYWVmZWtwYW9seHN4aHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4Mjg4NjUsImV4cCI6MjAyMDQwNDg2NX0.kaoZZicWSa8TqFP-lalk_iisfaVdCNNOd90UxCJHucE"
// );

const supabase = createClient<Database>(
  "http://127.0.0.1:54321/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
);

export default supabase;
