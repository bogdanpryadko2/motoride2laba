import { http } from './http'
import type { Category, CategoryRequest } from '@/types/api'

export const categoriesApi = {
  list: async () => (await http.get<Category[]>('/categories')).data,
  get: async (slug: string) =>
    (await http.get<Category>(`/categories/${encodeURIComponent(slug)}`)).data,
  create: async (body: CategoryRequest) => (await http.post<Category>('/categories', body)).data,
  update: async (id: number, body: CategoryRequest) =>
    (await http.put<Category>(`/categories/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/categories/${id}`)
  },
}
