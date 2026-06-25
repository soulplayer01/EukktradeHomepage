# Installation Guide

## 요구 사항

- Node.js 18 이상
- pnpm 또는 npm
- Git

## 설치 및 실행

1. 저장소 클론

```bash
git clone https://github.com/soulplayer01/EukktradeHomepage.git
cd EukktradeHomepage
```

2. 의존성 설치

```bash
pnpm install
```

3. 개발 서버 실행

```bash
pnpm dev
```

## 초기 설정

- `public/app-logo.svg` 등 정적 자산을 그대로 사용합니다.
- `vite.config.ts`와 `postcss.config.mjs`를 변경하지 않아도 기본 개발 환경이 동작합니다.

## 업데이트 및 문제 해결

- 패키지 버전이 충돌하는 경우 `pnpm update`를 실행합니다.
- 개발 서버가 실행되지 않으면 터미널 로그를 확인하고 필요한 패키지가 설치되었는지 점검하세요.
