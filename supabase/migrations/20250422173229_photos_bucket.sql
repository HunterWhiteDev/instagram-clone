-- Use Postgres to create a bucket.
insert into
  storage.buckets (
    id,
    name,
    public,
    allowed_mime_types,
    file_size_limit
  )
values
  ('posts', 'posts', true, ARRAY['image/*'], 31457280);


