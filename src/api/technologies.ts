import { http } from './http'
import type { Technology, TechnologyRequest } from '@/types/api'

export const technologiesApi = {
  list: async () => (await http.get<Technology[]>('/technologies')).data,
  get: async (id: number) => (await http.get<Technology>(`/technologies/${id}`)).data,
  create: async (body: TechnologyRequest) =>
    (await http.post<Technology>('/technologies', body)).data,
  update: async (id: number, body: TechnologyRequest) =>
    (await http.put<Technology>(`/technologies/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/technologies/${id}`)
  },
}
