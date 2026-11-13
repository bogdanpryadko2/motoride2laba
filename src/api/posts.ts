import { http } from './http'
import type { Post, PostRequest, Page, Comment } from '@/types/api'

export const postsApi = {
  list: async (page = 0, size = 12) =>
    (await http.get<Page<Post>>('/posts', { params: { page, size } })).data,
  get: async (id: number) => (await http.get<Post>(`/posts/${id}`)).data,
  create: async (body: PostRequest) => (await http.post<Post>('/posts', body)).data,
  update: async (id: number, body: PostRequest) =>
    (await http.put<Post>(`/posts/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/posts/${id}`)
  },
  comments: async (id: number, page = 0, size = 10) =>
    (await http.get<Page<Comment>>(`/posts/${id}/comments`, { params: { page, size } })).data,
  comment: async (id: number) => (await http.get<Comment>(`/comments/${id}`)).data,
  addComment: async (id: number, text: string) =>
    (await http.post<Comment>(`/posts/${id}/comments`, { text })).data,
  updateComment: async (id: number, text: string) =>
    (await http.put<Comment>(`/comments/${id}`, { text })).data,
  removeComment: async (id: number) => {
    await http.delete(`/comments/${id}`)
  },
}
