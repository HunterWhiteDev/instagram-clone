set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.extension(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$function$
;

CREATE OR REPLACE FUNCTION storage.filename(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$function$
;

CREATE OR REPLACE FUNCTION storage.foldername(name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$function$
;

create policy "public 1rma4z_0"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'posts'::text));


create policy "public 1rma4z_1"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'posts'::text));


create policy "public 1rma4z_2"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'posts'::text));


create policy "public 1rma4z_3"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'posts'::text));


create policy "public 21oxl_0"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'pfps'::text));


create policy "public 21oxl_1"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'pfps'::text));


create policy "public 21oxl_2"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'pfps'::text));


create policy "public 21oxl_3"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'pfps'::text));



