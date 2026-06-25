# Developer

## 개발자 참고 사항

- 프로젝트 구조는 `src/app/` 내부 컴포넌트와 `src/content/developers/` 문서 콘텐츠로 구성됩니다.
- Markdown 콘텐츠는 `src/content/developers/index.ts`에서 자동으로 로드됩니다.

## 문서 추가 가이드

1. `src/content/developers/`에 새로운 `.md` 파일을 추가합니다.
2. `src/content/developers/index.ts`에서 문서 목록에 항목을 추가합니다.
3. `id`, `title`, `description`을 명시하고 페이지에 신규 섹션이 노출되도록 합니다.

## 브랜치 정책

- `main` 브랜치는 배포용 콘텐츠를 포함합니다.
- 기능 개발은 별도 브랜치에서 진행하고 PR로 검토 및 병합합니다.
