declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      DB_PORT: string;
      LLM_HOST: string;
    }
  }
}

export {};
