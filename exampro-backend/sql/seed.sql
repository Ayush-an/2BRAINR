-- ========================================
-- ExamPro Initial Data Seed
-- ========================================
USE exampro;

-- Insert first SuperAdmin (created from backend manually)
INSERT INTO users (full_name, email, password, role, approved)
VALUES 
('Primary SuperAdmin', 'superadmin@exampro.com',
'$2b$10$HASHED_PASSWORD_HERE', 'SUPERADMIN', TRUE);

-- Insert demo Organization
INSERT INTO organizations (name, email, country, state, phone, address, created_by)
VALUES
('Demo Organization', 'demo@org.com', 'India', 'Maharashtra', '9876543210', 'Mumbai', 1);

-- Insert demo Admin under SuperAdmin
INSERT INTO users (full_name, email, password, role, organization_id, approved, approved_by)
VALUES
('Demo Admin', 'admin@demo.com', '$2b$10$HASHED_PASSWORD_HERE', 'ADMIN', 1, TRUE, 1);

-- Insert demo SuperUser under Admin
INSERT INTO users (full_name, email, password, role, organization_id, approved, approved_by)
VALUES
('Demo SuperUser', 'superuser@demo.com', '$2b$10$HASHED_PASSWORD_HERE', 'SUPERUSER', 1, TRUE, 2);

-- Insert sample Participant
INSERT INTO users (full_name, email, password, role, organization_id, approved, approved_by)
VALUES
('John Doe', 'john@demo.com', '$2b$10$HASHED_PASSWORD_HERE', 'PARTICIPANT', 1, TRUE, 3);

-- Insert example Group
INSERT INTO groups (name, description, start_date, end_date, organization_id, created_by)
VALUES
('Batch A', 'First participant batch', '2025-11-01', '2025-12-31', 1, 2);

-- Map Participant to Group
INSERT INTO participant_groups (participant_id, group_id) VALUES (5, 1);

-- Insert example Exam
INSERT INTO exams (title, description, duration, status, exam_code, scheduled, group_id, organization_id, created_by)
VALUES
('Demo Exam 1', 'Basic demo test', 30, 'ACTIVE', 'EXM12345', TRUE, 1, 1, 2);

-- Insert sample Question
INSERT INTO questions (category, topic, question_text, option_1, option_2, option_3, option_4, correct_option, difficulty, status, admin_id)
VALUES
('Math', 'Algebra', 'What is 2+2?', '3', '4', '5', '6', '2', 'EASY', 'VALID', 2);

-- Link Question to Exam
INSERT INTO exam_questions (exam_id, question_id) VALUES (1, 1);

-- Activity Log (sample)
INSERT INTO activity_logs (user_id, name, email, role, action)
VALUES
(1, 'Primary SuperAdmin', 'superadmin@exampro.com', 'SUPERADMIN', 'System initialized');
