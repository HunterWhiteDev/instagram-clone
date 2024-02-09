import supabase from "../supabase";

export default function (key: string, bucket: string): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(key);
  return publicUrl;
}
