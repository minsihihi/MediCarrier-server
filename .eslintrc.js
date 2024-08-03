// .eslintrc.js
module.exports = {
  env: {
    browser: true, // 브라우저 환경을 설정합니다.
    es2021: true, // ECMAScript 2021을 사용한다고 설정합니다.
  },
  extends: [
    "eslint:recommended", // ESLint의 추천 규칙을 적용합니다.
    "plugin:react/recommended", // React의 추천 규칙을 적용합니다.
  ],
  parserOptions: {
    ecmaVersion: 12, // ECMAScript 2021 (ES12)을 사용합니다.
    sourceType: "module", // 모듈을 사용한다고 설정합니다.
  },
  globals: {
    google: "readonly", // 'google'을 전역 변수로 정의합니다.
  },
  rules: {
    // 필요에 따라 사용자 정의 규칙을 추가할 수 있습니다.
  },
};
