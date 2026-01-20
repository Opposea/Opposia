# Matching / Compatibility SQL Patch

Use this when **Discover shows profiles that fail `are_users_compatible`**, which prevents users from connecting.

## What this fixes
- Ensures **Discover only returns mutually compatible profiles** (so anyone you see can connect).
- Uses the stored fields:
  - `profiles.gender`: `male` | `female`
  - `profiles.sexual_orientation`: `straight` | `gay` | `lesbian` | `bi`

## Run instructions
1. Open **Cloud → SQL Editor**
2. Paste the SQL below
3. Run it as one script
4. Refresh the app and re-run **Admin → Matching Health Check** (the `are_users_compatible` row should turn green)

---

```sql
-- ==============================
-- 1) Drop old functions first
-- ==============================
DROP FUNCTION IF EXISTS public.get_discoverable_profiles();
DROP FUNCTION IF EXISTS public.are_users_compatible(uuid, uuid);

-- Old/alternate signatures (safe to drop if they exist)
DROP FUNCTION IF EXISTS public.check_one_way_compatibility(text, text, text, text);
DROP FUNCTION IF EXISTS public.check_one_way_compatibility(text, text, text);


-- =========================================
-- 2) One-way compatibility (A -> B)
-- =========================================
CREATE FUNCTION public.check_one_way_compatibility(
  viewer_gender text,
  viewer_orientation text,
  target_gender text,
  target_orientation text
)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path TO public
AS $fn$
  SELECT CASE
    WHEN viewer_gender IS NULL OR viewer_orientation IS NULL OR target_gender IS NULL OR target_orientation IS NULL THEN false

    -- Bisexual users can be attracted to any gender
    WHEN viewer_orientation = 'bi' THEN true

    -- Straight: only opposite gender
    WHEN viewer_orientation = 'straight' THEN
      viewer_gender IN ('male','female')
      AND target_gender IN ('male','female')
      AND viewer_gender <> target_gender

    -- Gay: male attracted to male
    WHEN viewer_orientation = 'gay' THEN
      viewer_gender = 'male' AND target_gender = 'male'

    -- Lesbian: female attracted to female
    WHEN viewer_orientation = 'lesbian' THEN
      viewer_gender = 'female' AND target_gender = 'female'

    ELSE false
  END;
$fn$;

REVOKE ALL ON FUNCTION public.check_one_way_compatibility(text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_one_way_compatibility(text, text, text, text) TO authenticated;


-- =========================================
-- 3) Mutual compatibility (A <-> B)
-- =========================================
CREATE FUNCTION public.are_users_compatible(
  user_a_id uuid,
  user_b_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $fn$
DECLARE
  user_a_gender text;
  user_a_orientation text;
  user_b_gender text;
  user_b_orientation text;
BEGIN
  IF user_a_id IS NULL OR user_b_id IS NULL THEN
    RETURN false;
  END IF;

  SELECT p.gender, p.sexual_orientation
    INTO user_a_gender, user_a_orientation
  FROM public.profiles p
  WHERE p.user_id = user_a_id;

  SELECT p.gender, p.sexual_orientation
    INTO user_b_gender, user_b_orientation
  FROM public.profiles p
  WHERE p.user_id = user_b_id;

  IF user_a_gender IS NULL OR user_a_orientation IS NULL OR user_b_gender IS NULL OR user_b_orientation IS NULL THEN
    RETURN false;
  END IF;

  RETURN
    public.check_one_way_compatibility(user_a_gender, user_a_orientation, user_b_gender, user_b_orientation)
    AND
    public.check_one_way_compatibility(user_b_gender, user_b_orientation, user_a_gender, user_a_orientation);
END;
$fn$;

REVOKE ALL ON FUNCTION public.are_users_compatible(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.are_users_compatible(uuid, uuid) TO authenticated;


-- =========================================
-- 4) Discover feed (only compatible users)
-- =========================================
CREATE FUNCTION public.get_discoverable_profiles()
RETURNS TABLE(
  id uuid,
  user_id uuid,
  name text,
  age integer,
  bio text,
  location text,
  avatar_url text,
  interests text[],
  is_verified boolean,
  country text,
  date_of_birth date,
  age_verified boolean,
  verification_selfie_url text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $fn$
BEGIN
  -- If not signed in, return nothing.
  IF auth.uid() IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    p.user_id,
    p.name,
    p.age,
    p.bio,
    p.location,
    p.avatar_url,
    p.interests,
    p.is_verified,
    p.country,
    p.date_of_birth,
    p.age_verified,
    p.verification_selfie_url,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id <> auth.uid()

    -- Must have preference fields set
    AND p.gender IS NOT NULL
    AND p.sexual_orientation IS NOT NULL

    -- Must be mutually compatible
    AND public.are_users_compatible(auth.uid(), p.user_id)

    -- Blocked either direction
    AND NOT EXISTS (
      SELECT 1
      FROM public.blocked_users bu
      WHERE (bu.user_id = auth.uid() AND bu.blocked_user_id = p.user_id)
         OR (bu.user_id = p.user_id AND bu.blocked_user_id = auth.uid())
    )

    -- Existing match/request either direction
    AND NOT EXISTS (
      SELECT 1
      FROM public.matches m
      WHERE (m.user1_id = auth.uid() AND m.user2_id = p.user_id)
         OR (m.user1_id = p.user_id AND m.user2_id = auth.uid())
    )

  ORDER BY p.created_at DESC
  LIMIT 50;
END;
$fn$;

REVOKE ALL ON FUNCTION public.get_discoverable_profiles() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_discoverable_profiles() TO authenticated;
```
