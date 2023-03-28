export interface EmailAdapter {
  render (emailPath: string, vars: any): Promise<string>
}
