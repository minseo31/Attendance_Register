// 학생 추가 모달 데이터 타입
export type AddModalDataType = {
  id: number;
  label: string;
  ple: string;
};

// 학생 추가 모달 데이터
export const AddModalData: AddModalDataType[] = [
  { id: 0, label: "학생 이름", ple: "학생 이름을 입력하세요." },
  { id: 1, label: "학번", ple: "학생의 학번 입력하세요." },
  { id: 2, label: "연락처", ple: "학생의 연락처 입력하세요." },
  { id: 3, label: "주소", ple: "학생의 주소 입력하세요." },
];
