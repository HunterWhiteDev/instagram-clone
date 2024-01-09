import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rnypbaefekpaolxsxhqo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJueXBiYWVmZWtwYW9seHN4aHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4Mjg4NjUsImV4cCI6MjAyMDQwNDg2NX0.kaoZZicWSa8TqFP-lalk_iisfaVdCNNOd90UxCJHucE"
);

export default supabase;
