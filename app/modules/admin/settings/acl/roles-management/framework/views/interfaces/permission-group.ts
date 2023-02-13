export interface Permission {
  slug: string,
  display: string,
}

export interface PermissionGroup {
  title: string
  id: string,
  permissions: Permission[]
}
