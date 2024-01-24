import supabase from "../supabase";

export default async function (file: File, bucket: string, path: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  console.log({ data, error });

  if (error) throw new Error("An unknown error occured");
  else if (data) return { success: true };
}
