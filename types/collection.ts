import { Database } from "./supabase.ts";
type Tables = Database["public"]["Tables"];

export type Posts = Tables["posts"]["Row"];
export type Users = Tables["users"]["Row"];
