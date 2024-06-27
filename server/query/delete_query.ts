//  테이블 리셋 쿼리
export const resetQueries = [
  "DROP TABLE IF EXISTS students;",
  "DROP TABLE IF EXISTS calendar;",
  "DROP TABLE IF EXISTS classes;",
  "DROP TABLE IF EXISTS student_classes;",
  "DROP TABLE IF EXISTS attendance;",
];

// 학생 삭제 쿼리
export const studentDel_Query = "DELETE FROM students WHERE student_number = ?";
export const student_classesDel_Query = "DELETE FROM student_classes WHERE student_id = (SELECT id FROM students WHERE student_number = ?)";
