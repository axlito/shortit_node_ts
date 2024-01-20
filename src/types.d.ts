export class UserInterface {
  id?: string
  email: string
  password: string
  refreshToken?: string | null
}

export class UrlInterface {
  id?: string
  base_url: string
  short_url: string
  user_id?: string | null
}
