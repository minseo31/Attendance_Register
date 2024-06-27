// 로그인 폼 라벨 데이터 타입
export type InputLaber_DataType = {
    id : number;
    content : string;
}
// 로그인 폼 라벨 데이터
export const InputLaber_Data : InputLaber_DataType[] = [
  { id: 0, content: "아이디" },
  { id: 1, content: "비밀번호" },
];

// 샘플 매니저 계정 데이터 
export const Seed_Manager = {
    username : 'manager',
    password : '1234',
};