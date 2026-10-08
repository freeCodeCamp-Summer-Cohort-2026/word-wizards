-- Migration: 20261001_profiles_onboarding.sql
-- Description: Creates or updates public.profiles with onboarding tracking, experience levels, starter keys, and triggers.

-- 1. Create public.profiles if it does not already exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    keys_balance INTEGER NOT NULL DEFAULT 5,
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    onboarding_step INTEGER NOT NULL DEFAULT 1,
    goal TEXT CHECK (goal IN ('vocabulary', 'communication', 'comprehension', 'guided_journey')),
    experience_level TEXT CHECK (experience_level IN ('beginner', 'some_experience', 'comfortable')),
    placement_check_status TEXT CHECK (placement_check_status IN ('skipped', 'completed', 'pending')),
    placement_score INTEGER DEFAULT NULL,
    first_theme TEXT DEFAULT 'everyday-animals',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. If table already exists, alter missing columns safely
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'keys_balance') THEN
        ALTER TABLE public.profiles ADD COLUMN keys_balance INTEGER NOT NULL DEFAULT 5;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'onboarding_completed') THEN
        ALTER TABLE public.profiles ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'onboarding_step') THEN
        ALTER TABLE public.profiles ADD COLUMN onboarding_step INTEGER NOT NULL DEFAULT 1;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'goal') THEN
        ALTER TABLE public.profiles ADD COLUMN goal TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'experience_level') THEN
        ALTER TABLE public.profiles ADD COLUMN experience_level TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'placement_check_status') THEN
        ALTER TABLE public.profiles ADD COLUMN placement_check_status TEXT DEFAULT 'pending';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'placement_score') THEN
        ALTER TABLE public.profiles ADD COLUMN placement_score INTEGER DEFAULT NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'first_theme') THEN
        ALTER TABLE public.profiles ADD COLUMN first_theme TEXT DEFAULT 'everyday-animals';
    END IF;
END $$;

-- 3. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can read own profile'
    ) THEN
        CREATE POLICY "Users can read own profile"
            ON public.profiles
            FOR SELECT
            USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile"
            ON public.profiles
            FOR INSERT
            WITH CHECK (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile"
            ON public.profiles
            FOR UPDATE
            USING (auth.uid() = id)
            WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- 4. Automatically create profile on new auth signup with 5 starter keys
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (
        id, 
        email, 
        display_name, 
        keys_balance, 
        onboarding_completed, 
        onboarding_step
    )
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        5,      -- 5 Starter keys granted immediately upon registration
        FALSE,
        1
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
