import { Database } from "./supabase.ts";
type Tables = Database["public"]["Tables"];

export type Posts = Tables["posts"]["Row"];
