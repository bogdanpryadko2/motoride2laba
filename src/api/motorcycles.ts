import { http } from './http'
import type {
  CatalogQuery,
  Motorcycle,
  MotorcycleRequest,
  MotorcycleSummary,
  Page,
} from '@/types/api'

export const motorcyclesApi = {
  async list(params: CatalogQuery): Promise<Page<MotorcycleSummary>> {
    const response = await http.get<MotorcycleSummary[]>('/motorcycles', { params })
    return {
      content: response.data,
      page: params.page,
      size: params.size,
      totalElements: Number(response.headers['x-total-count']),
      totalPages: Number(response.headers['x-total-pages']),
    }
  },
  top: async () => (await http.get<MotorcycleSummary[]>('/motorcycles/top')).data,
  get: async (id: number) => (await http.get<Motorcycle>(`/motorcycles/${id}`)).data,
  create: async (body: MotorcycleRequest) =>
    (await http.post<Motorcycle>('/motorcycles', body)).data,
  update: async (id: number, body: MotorcycleRequest) =>
    (await http.put<Motorcycle>(`/motorcycles/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/motorcycles/${id}`)
  },
}
