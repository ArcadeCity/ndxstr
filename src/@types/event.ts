import { EventDelegatorMetadataKey, EventKinds } from '../constants/base'
import { EventId, Pubkey, Tag } from './base'

export interface Event {
  id: EventId
  pubkey: Pubkey
  created_at: number
  kind: EventKinds
  tags: Tag[]
  sig: string
  content: string
  [EventDelegatorMetadataKey]?: Pubkey
}

export interface DBEvent {
  id: string
  event_id: Buffer
  event_pubkey: Buffer
  event_kind: number
  event_created_at: number
  event_content: string
  event_tags: Tag[]
  event_signature: Buffer
  event_delegator?: Buffer | null
  first_seen: Date
  deleted_at: Date
}

export interface CanonicalEvent {
  0: 0
  1: string
  2: number
  3: number
  4: Tag[]
  5: string
}
