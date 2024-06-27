// 전체 데이터 읽어오기 쿼리
export const allGetQuery = `
    SELECT s.student_name, s.student_number, s.phone_number, s.student_addr, c.class_name, a.date, COALESCE(att.status, '-') AS attendance_status
    FROM students s
    JOIN student_classes sc ON s.id = sc.student_id
    JOIN classes c ON sc.class_id = c.id
    CROSS JOIN calendar a 
    LEFT JOIN attendance att ON sc.id = att.student_class_id AND att.date_id = a.id
    ORDER BY s.student_name, s.student_number, c.class_name, a.date;
`;

// 학생 데이터를 조회하는 쿼리
export const studentGet_Query = `
    SELECT s.student_name, s.student_number, s.phone_number, s.student_addr,
        c.date, cl.class_name, a.status
    FROM students s
    JOIN student_classes sc ON s.id = sc.student_id
    JOIN classes cl ON sc.class_id = cl.id
    JOIN attendance a ON sc.id = a.student_class_id
    JOIN calendar c ON a.date_id = c.id
    WHERE s.student_number = ?;
`;

// 학생 데이터 전체를 조회하는 쿼리
export const studentAllGet_Query = "SELECT * FROM students";
