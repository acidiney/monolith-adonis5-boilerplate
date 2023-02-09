export interface GenerateRandomPasswordService {
  generate (username: string): Promise<string>
}
