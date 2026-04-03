/*
  # Create Initial Schema for Learnthru Platform

  1. New Tables
    - `colleges`
      - College information including name, location, courses, facilities, cut-offs
    - `scholarships`
      - Scholarship opportunities with eligibility and amounts
    - `career_paths`
      - Career options mapped to degree programs
    - `courses`
      - Course/degree programs offered
    - `user_profiles`
      - Student profiles for personalized recommendations

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  distance_km decimal,
  founded_year integer,
  college_type text DEFAULT 'Government',
  campus_size_acres decimal,
  description text,
  image_url text,
  facilities jsonb DEFAULT '[]'::jsonb,
  contact_phone text,
  contact_email text,
  website_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view colleges"
  ON colleges FOR SELECT
  TO authenticated
  USING (true);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid REFERENCES colleges(id),
  degree_name text NOT NULL,
  degree_type text NOT NULL,
  stream text NOT NULL,
  subjects jsonb DEFAULT '[]'::jsonb,
  cutoff_percentage decimal,
  duration_years integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Scholarships table
CREATE TABLE IF NOT EXISTS scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  amount decimal NOT NULL,
  amount_type text DEFAULT 'per year',
  description text,
  eligibility_criteria text,
  scholarship_type text,
  stream text,
  degree text,
  location text,
  tags jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view scholarships"
  ON scholarships FOR SELECT
  TO authenticated
  USING (true);

-- Career paths table
CREATE TABLE IF NOT EXISTS career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  stream text NOT NULL,
  degree_required text NOT NULL,
  description text,
  icon_name text,
  preparation_for jsonb DEFAULT '[]'::jsonb,
  job_opportunities jsonb DEFAULT '[]'::jsonb,
  salary_range text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view career paths"
  ON career_paths FOR SELECT
  TO authenticated
  USING (true);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  class_level text,
  stream_preference text,
  location text,
  avatar_url text,
  shortlisted_colleges jsonb DEFAULT '[]'::jsonb,
  shortlisted_careers jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
