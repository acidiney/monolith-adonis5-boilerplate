export interface VerifyPasswordMatchAdapter {
  compare (hash: string, plain: string): Promise<boolean>
}
