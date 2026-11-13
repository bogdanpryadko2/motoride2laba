import { ru as ui } from '@/locales/ru'
import type { ReactionKind } from '@/types/api'

interface ReactionOption {
  kind: ReactionKind
  emoji: string
  label: string
}

export const reactionOptions: readonly ReactionOption[] = [
  { kind: 'LOVE', emoji: '❤️', label: ui.reactions.heart },
  { kind: 'LIKE', emoji: '👍', label: ui.reactions.like },
  { kind: 'DISLIKE', emoji: '👎', label: ui.reactions.dislike },
]
