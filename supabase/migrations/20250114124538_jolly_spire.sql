/*
  # Initial Schema for German Learning Platform

  1. New Tables
    - `users`
      - Student and teacher profiles
      - Stores basic user information and role
    - `classes`
      - Scheduled German classes
      - Includes time, level, and capacity
    - `enrollments`
      - Links students to classes
      - Tracks attendance and progress
    
  2. Security
    - Enable RLS on all tables
    - Policies for teachers to manage classes
    - Policies for students to view and enroll in classes
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher')),
  age int CHECK (age > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create classes table
CREATE TABLE classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES users(id),
  title text NOT NULL,
  description text,
  level text NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2')),
  start_time timestamptz NOT NULL,
  duration_minutes int NOT NULL DEFAULT 60,
  max_students int NOT NULL DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id),
  class_id uuid REFERENCES classes(id),
  status text NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'cancelled')),
  attended boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, class_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE user_id = auth.uid() AND role = 'teacher'
  ));

-- Policies for classes table
CREATE POLICY "Anyone can view classes"
  ON classes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can manage their classes"
  ON classes
  FOR ALL
  TO authenticated
  USING (teacher_id IN (
    SELECT id FROM users WHERE user_id = auth.uid() AND role = 'teacher'
  ));

-- Policies for enrollments table
CREATE POLICY "Students can view their enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (student_id IN (
    SELECT id FROM users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Students can enroll in classes"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (
    SELECT id FROM users WHERE user_id = auth.uid() AND role = 'student'
  ));

CREATE POLICY "Teachers can view all enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE user_id = auth.uid() AND role = 'teacher'
  ));