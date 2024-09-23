// 학생 추가 쿼리
export const studentAdd_Query =
  "INSERT INTO students (student_name, student_number, phone_number, student_addr) VALUES (?, ?, ?, ?)";

// 추가한 학생의 id를 반환하는 서브쿼리
const lastStudent_Query = `(SELECT id FROM students ORDER BY id DESC LIMIT 1)`;

// 학생이 추가되었을 때 맵핑 테이블에 추가 쿼리
export const student_ClassesAdd_Query = `
  INSERT INTO student_classes (student_id, class_id)
  VALUES 
    (${lastStudent_Query}, 1), 
    (${lastStudent_Query}, 2), 
    (${lastStudent_Query}, 3);
`;

// 학생이 추가되었을 떄 출석부 맵핑 테이블에 추가 쿼리
export const attendanceAdd_Query = `
  INSERT INTO attendance (student_class_id, date_id, status)
  VALUES 
  (${lastStudent_Query}, 1, '-'), 
  (${lastStudent_Query}, 2, '-'), 
  (${lastStudent_Query}, 3, '-'), 
  (${lastStudent_Query}, 4, '-'), 
  (${lastStudent_Query}, 5, '-'), 
  (${lastStudent_Query}, 6, '-'), 
  (${lastStudent_Query}, 7, '-'), 
  (${lastStudent_Query}, 8, '-'), 
  (${lastStudent_Query}, 9, '-'), 
  (${lastStudent_Query}, 10, '-'),
  (${lastStudent_Query}, 11, '-'), 
  (${lastStudent_Query}, 12, '-'), 
  (${lastStudent_Query}, 13, '-'), 
  (${lastStudent_Query}, 14, '-'), 
  (${lastStudent_Query}, 15, '-'), 
  (${lastStudent_Query}, 16, '-'), 
  (${lastStudent_Query}, 17, '-'), 
  (${lastStudent_Query}, 18, '-'), 
  (${lastStudent_Query}, 19, '-'), 
  (${lastStudent_Query}, 20, '-'),
  (${lastStudent_Query}, 21, '-'), 
  (${lastStudent_Query}, 22, '-'), 
  (${lastStudent_Query}, 23, '-'),
  (${lastStudent_Query}, 24, '-'), 
  (${lastStudent_Query}, 25, '-'),
  (${lastStudent_Query}, 26, '-'), 
  (${lastStudent_Query}, 27, '-'), 
  (${lastStudent_Query}, 28, '-'),
  (${lastStudent_Query}, 29, '-'), 
  (${lastStudent_Query}, 30, '-'), 
  (${lastStudent_Query}, 31, '-');
`;
