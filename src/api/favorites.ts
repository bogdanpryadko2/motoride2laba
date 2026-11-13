import { http } from './http'
import type { Favorite } from '@/types/api'

export const favoritesApi = {
  list: async (page = 0, size = 20) =>
    (await http.get<Favorite[]>('/favorites', { params: { page, size } })).data,
  add: async (id: number) => (await http.post<Favorite>(`/favorites/${id}`)).data,
  remove: async (id: number) => {
    await http.delete(`/favorites/${id}`)
  },
}
