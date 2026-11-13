import { http } from './http'
import type { News, NewsRequest } from '@/types/api'

export const newsApi = {
  list: async (page = 0, size = 12) =>
    (await http.get<News[]>('/news', { params: { page, size } })).data,
  get: async (id: number) => (await http.get<News>(`/news/${id}`)).data,
  create: async (body: NewsRequest) => (await http.post<News>('/news', body)).data,
  update: async (id: number, body: NewsRequest) => (await http.put<News>(`/news/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/news/${id}`)
  },
}
