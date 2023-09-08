// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_URL: string
  readonly PUBLIC_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
