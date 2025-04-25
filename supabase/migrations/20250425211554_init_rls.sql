alter table "public"."posts" enable row level security;

alter table "public"."following" enable row level security;

alter table "public"."users" enable row level security;

create policy "Posts is public" on "public"."posts" for
select
  using (true);

create policy "Profiles is public" on "public"."users" for
select
  using (true);

create policy "Following is public" on "public"."following" for
select
  using (true);

create policy "Users can create a post" on "public"."posts" for insert to authenticated
with
  check (
    (
      select
        auth.uid ()
    ) = user_id
  );

create policy "Users can follow another user" on "public"."following" for insert to authenticated
with
  check (
    (
      select
        auth.uid ()
    ) = follower_id
  );

CREATE POLICY "Users can unfollower another follower" ON "public"."following" FOR DELETE USING ((follower_id = (auth.uid ())));

CREATE POLICY "Users can update their profile" ON "public"."users" FOR
UPDATE USING (((auth.uid ()) = user_id))
WITH
  CHECK (((auth.uid ()) = user_id));
