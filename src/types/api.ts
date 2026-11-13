export interface User {
  id: number
  email: string
  displayName: string
  role: 'USER' | 'ADMIN'
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface Tokens {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  displayName: string
}

export interface PasswordChange {
  currentPassword: string
  newPassword: string
}

export interface ApiError {
  status: number
  message: string
  fieldErrors: Record<string, string>
}

export interface Page<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface Technology {
  id: number
  name: string
  description: string | null
}

export interface Category extends Technology {
  slug: string
}

export type TechnologyRequest = Omit<Technology, 'id'>

export type CategoryRequest = Omit<Category, 'id'>

export interface MotorcycleSummary {
  id: number
  brand: string
  model: string
  engineCc: number
  horsepower: number
  badge: string | null
  imageUrl: string
  price: number
  categorySlug: string
  categoryName: string
}

export interface Motorcycle extends MotorcycleSummary {
  shortDescription: string | null
  description: string
  technologies: string[]
  categoryId: number
  technologyIds: number[]
}

export interface MotorcycleRequest {
  brand: string
  model: string
  engineCc: number
  horsepower: number
  badge: string | null
  shortDescription: string | null
  description: string
  imageUrl: string
  price: number
  categoryId: number
  technologyIds: number[]
}

export interface CatalogQuery {
  category?: string
  search?: string
  sort?: string
  page: number
  size: number
}

export interface News {
  id: number
  title: string
  content: string
  imageUrl: string | null
  publishedAt: string
}

export type NewsRequest = Omit<News, 'id'>

export interface Favorite {
  id: number
  motorcycle: MotorcycleSummary
  createdAt: string
}

export interface ReviewRequest {
  rating: number
  text: string
}

export interface Review extends ReviewRequest {
  id: number
  createdAt: string
  authorId: number | null
  authorName: string
}

export interface Author {
  id: number
  displayName: string
}

export interface PostRequest {
  title: string
  content: string
  imageUrl: string | null
  motorcycleId: number | null
}

export interface Post extends PostRequest {
  id: number
  author: Author
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: number
  postId: number
  text: string
  author: Author
  createdAt: string
  updatedAt: string
}

export type ReactionKind = 'LIKE' | 'LOVE' | 'DISLIKE'

export type ReactionTarget = 'posts' | 'comments' | 'reviews'

export type ReactionCounts = Record<ReactionKind, number>

export interface OwnReaction {
  kind: ReactionKind | null
}
