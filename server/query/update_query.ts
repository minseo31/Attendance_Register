// 출석 상태를 변경하는 쿼리
export const updateStatus_Query = (
    set_student_number : string,
  set_status: string,
  set_date: string,
  set_class: string
) => {
  return `
        UPDATE attendance
        SET status = '${set_status}'
        WHERE student_class_id IN (
            SELECT id
            FROM student_classes
            WHERE student_id = (
                SELECT id
                FROM students
                WHERE student_number = '${set_student_number}'
            )
            AND class_id = (SELECT id FROM classes WHERE class_name = '${set_class}')
        )
        AND date_id = (SELECT id FROM calendar WHERE date = '${set_date}');
    `;
};
