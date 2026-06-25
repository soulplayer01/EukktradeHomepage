export type DeveloperDoc = {
  id: string;
  title: string;
  description: string;
  content: string;
};

const modules = import.meta.glob('./*.md', { eager: true, query: '?raw' }) as Record<string, string>;

const docs: Array<Omit<DeveloperDoc, 'content'>> = [
  {
    id: 'installation-guide',
    title: 'Installation Guide',
    description: 'EUKK TRADE 설치와 초기 실행을 위한 단계별 가이드입니다.',
  },
  {
    id: 'broker-setup',
    title: 'Broker Setup',
    description: '브로커 연결 구성과 거래 계좌 설정에 대한 안내입니다.',
  },
  {
    id: 'user-guide',
    title: 'User Guide',
    description: '일반 사용자와 거래자가 알아야 할 주요 기능과 이용 방법입니다.',
  },
  {
    id: 'security',
    title: 'Security',
    description: '보안 권장 사항과 개인 정보 보호 관련 지침을 정리합니다.',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: '자주 묻는 질문과 답변을 빠르게 확인할 수 있는 문서입니다.',
  },
  {
    id: 'developer',
    title: 'Developer',
    description: '개발자 전용 참고 자료와 코드베이스 관련 안내입니다.',
  },
];

export const developerDocs: DeveloperDoc[] = docs.map((doc) => ({
  ...doc,
  content: modules[`./${doc.id}.md`] ?? `# ${doc.title}\n\n문서가 준비 중입니다.`,
}));
