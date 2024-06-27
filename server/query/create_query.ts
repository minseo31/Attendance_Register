// 학생 테이블 생성 쿼리
export const createStudentsTableQuery = `
    CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100),
    student_number VARCHAR(100),
    phone_number VARCHAR(100),
    student_addr VARCHAR(100)
    );
`;

// 달력 테이블 생성 쿼리
export const createCalendarTableQuery = `
    CREATE TABLE calendar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL
    );
`;

// 수업 테이블 생성 쿼리
export const createClassesTableQuery = `
    CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(100) check(class_name in ("오전", "오후", "저녁"))
    );
`;

// 학생 + 수업 테이블 생성 쿼리
export const createStudent_ClassesTableQuery = `
    CREATE TABLE student_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
    );
`;

// 출석부 테이블 생성 쿼리
export const createAttendanceTableQuery = `
    CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_class_id INT NOT NULL,
    date_id INT NOT NULL,
    status VARCHAR(10) CHECK (status in ('출석', '조퇴', '결석', '-')),
    FOREIGN KEY (student_class_id) REFERENCES student_classes(id),
    FOREIGN KEY (date_id) REFERENCES calendar(id)
    );
`; 
