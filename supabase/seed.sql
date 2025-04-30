INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    '45d0e653-92a0-48fa-9762-c9958f78e686',
    'authenticated',
    'authenticated',
    'test@test.com',
    crypt ('password', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{"first_name": "Owner", "last_name": "Test", "username": "test_user"}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
  );

INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    '45d0e653-92a0-48fa-9762-c9958f78e687',
    'authenticated',
    'authenticated',
    'charles_bradley@test.com',
    crypt ('password', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{"first_name": "Charles", "last_name": "Brad", "username": "charles_bradely"}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
  );

  insert INTO public.posts (user_id, images, description) values (
    '45d0e653-92a0-48fa-9762-c9958f78e687',
     ARRAY['945e9736-2bef-4010-97c9-55b246787280.jpg'],
     'A beautiful picture of my boat'
  );

  insert INTO public.comments (post_id, user_id, content) values(1, '45d0e653-92a0-48fa-9762-c9958f78e686', 'I love this picture!');

