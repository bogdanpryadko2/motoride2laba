import { http } from './http'
import type { OwnReaction, ReactionCounts, ReactionKind, ReactionTarget } from '@/types/api'

export const reactionsApi = {
  counts: async (target: ReactionTarget, id: number) =>
    (await http.get<Partial<ReactionCounts>>(`/${target}/${id}/reactions`)).data,
  own: async (target: ReactionTarget, id: number) =>
    (await http.get<OwnReaction>(`/${target}/${id}/reaction`)).data,
  set: async (target: ReactionTarget, id: number, kind: ReactionKind) => {
    await http.put(`/${target}/${id}/reaction`, { kind })
  },
  remove: async (target: ReactionTarget, id: number) => {
    await http.delete(`/${target}/${id}/reaction`)
  },
}
