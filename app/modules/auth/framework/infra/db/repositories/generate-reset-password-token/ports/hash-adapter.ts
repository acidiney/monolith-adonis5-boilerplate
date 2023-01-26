export interface HashAdapter {
  generate(secret: string, payload: string): Promise<string>
}
