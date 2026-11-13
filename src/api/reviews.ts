import { http } from './http'
import type { Review, ReviewRequest } from '@/types/api'

export const reviewsApi = {
  list: async (id: number, page = 0, size = 10) =>
    (await http.get<Review[]>(`/motorcycles/${id}/reviews`, { params: { page, size } })).data,
  get: async (id: number) => (await http.get<Review>(`/reviews/${id}`)).data,
  create: async (id: number, body: ReviewRequest) =>
    (await http.post<Review>(`/motorcycles/${id}/reviews`, body)).data,
  update: async (id: number, body: ReviewRequest) =>
    (await http.put<Review>(`/reviews/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/reviews/${id}`)
  },
}
