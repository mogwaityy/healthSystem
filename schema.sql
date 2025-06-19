-- SQL schema generated from entity classes
-- Table: admin
CREATE TABLE admin (
    admin_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
);

-- Table: appointment
CREATE TABLE appointment (
    appointment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id VARCHAR(64),
    doctor_id VARCHAR(64),
    date DATETIME,
    description TEXT,
    status INT
);

-- Table: doctor
CREATE TABLE doctor (
    doctor_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255),
    specialty VARCHAR(255),
    introduction TEXT,
    email VARCHAR(255),
    password VARCHAR(255)
);

-- Table: doctor_schedule
CREATE TABLE doctor_schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id VARCHAR(64),
    start_time DATETIME,
    end_time DATETIME,
    status INT,
    patient_id VARCHAR(64),
    appoinment_id BIGINT
);

-- Table: medical
CREATE TABLE medical (
    medical_id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

-- Table: medical_history
CREATE TABLE medical_history (
    history_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id VARCHAR(64),
    date DATETIME,
    description TEXT
);

-- Table: medicine_prescription
CREATE TABLE medicine_prescription (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prescription_id BIGINT,
    medicine VARCHAR(255),
    quantity VARCHAR(255),
    unit VARCHAR(255),
    dosage VARCHAR(255)
);

-- Table: patient
CREATE TABLE patient (
    patient_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255),
    birth VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    gender INT,
    mobile VARCHAR(255),
    status INT
);

-- Table: prescription
CREATE TABLE prescription (
    prescription_id BIGINT PRIMARY KEY,
    appointment_id BIGINT,
    diagnose TEXT,
    instruction TEXT,
    patient_id VARCHAR(64),
    doctor_id VARCHAR(64),
    description TEXT
);

-- Table: specialty
CREATE TABLE specialty (
    specialty_id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

-- Table: test_result
CREATE TABLE test_result (
    test_result_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id VARCHAR(64),
    test_date DATETIME,
    doctor_id VARCHAR(64),
    test_result TEXT,
    test_type VARCHAR(255),
    normal_range VARCHAR(255)
);

-- Table: user_role
CREATE TABLE user_role (
    id VARCHAR(64) PRIMARY KEY,
    role VARCHAR(255)
);
