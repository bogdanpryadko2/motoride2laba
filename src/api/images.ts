import { http } from './http'

export async function uploadImage(file: File): Promise<string> {
  const body = new FormData()

  body.append('file', file)

  const { data } = await http.post<{ imageUrl: string }>('/images', body)
  return data.imageUrl
}
