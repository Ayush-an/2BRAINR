-- ========================================
-- ExamPro Database Schema (MySQL)
-- Designed for portability (can migrate to PostgreSQL)
-- ========================================

CREATE DATABASE IF NOT EXISTS exampro;
USE exampro;

-- -------------------------------
-- USERS TABLE (base for all roles)
-- -------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(15),
    role ENUM('SUPERADMIN', 'ADMIN', 'SUPERUSER', 'PARTICIPANT') NOT NULL,
    organization_id INT NULL,
    approved BOOLEAN DEFAULT FALSE,
    approved_by INT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_by INT NULL,
    removed_at DATETIME NULL,
    removed_by INT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'REMOVED') DEFAULT 'ACTIVE'
);

-- -------------------------------
-- ORGANIZATION TABLE
-- -------------------------------
CREATE TABLE organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    country VARCHAR(100),
    state VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE organizations
ADD COLUMN status ENUM('Active','Inactive','Pending') DEFAULT 'Active';

-- -------------------------------
-- GROUPS TABLE
-- -------------------------------
CREATE TABLE groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('ACTIVE', 'INACTIVE', 'CLOSED') DEFAULT 'ACTIVE',
    organization_id INT,
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
);

-- -------------------------------
-- PARTICIPANT ↔ GROUP MAPPING
-- -------------------------------
CREATE TABLE participant_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    group_id INT NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- -------------------------------
-- EXAMS TABLE
-- -------------------------------
CREATE TABLE exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT, -- minutes
    status ENUM('ACTIVE', 'INACTIVE', 'SCHEDULED', 'COMPLETED') DEFAULT 'INACTIVE',
    exam_code VARCHAR(50) UNIQUE,
    scheduled BOOLEAN DEFAULT FALSE,
    group_id INT,
    organization_id INT,
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE SET NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL
);

-- -------------------------------
-- QUESTIONS TABLE
-- -------------------------------
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(150),
    topic VARCHAR(150),
    question_text TEXT NOT NULL,
    option_1 TEXT,
    option_2 TEXT,
    option_3 TEXT,
    option_4 TEXT,
    correct_option ENUM('1','2','3','4'),
    difficulty ENUM('EASY','MEDIUM','HARD'),
    batch_id VARCHAR(100),
    status ENUM('VALID','INVALID','DUPLICATED','PENDING','IMPORTED') DEFAULT 'PENDING',
    admin_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL
);

-- -------------------------------
-- EXAM ↔ QUESTION MAPPING
-- -------------------------------
CREATE TABLE exam_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_id INT NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- -------------------------------
-- PARTICIPANT EXAM RESULTS
-- -------------------------------
CREATE TABLE exam_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT NOT NULL,
    exam_id INT NOT NULL,
    score DECIMAL(5,2),
    total_questions INT,
    correct_answers INT,
    wrong_answers INT,
    attended_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);

-- -------------------------------
-- ACTIVITY LOG
-- -------------------------------
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(150),
    email VARCHAR(150),
    role VARCHAR(50),
    action VARCHAR(255),
    spent_time INT DEFAULT 0,
    logout_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- -------------------------------
-- AUDIT TRAIL (change tracking)
-- -------------------------------
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(150),
    record_id INT,
    field_name VARCHAR(150),
    old_value TEXT,
    new_value TEXT,
    changed_by INT,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- -------------------------------
-- TRIGGERS (for tracking changes)
-- -------------------------------
DELIMITER $$

CREATE TRIGGER before_user_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (table_name, record_id, field_name, old_value, new_value, changed_by)
    VALUES ('users', OLD.id, 'status', OLD.status, NEW.status, NEW.updated_by);
END$$

DELIMITER ;
