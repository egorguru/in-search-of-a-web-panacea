export interface TinyEntity {
  message: string
}

export interface LargeEntity {
  id: number
  message: string
  entity: TinyEntity
  extra: string[]
}

export interface TinyEntityWithId {
  id: number
  message: string
}
