export interface WeddingEvent {
  title: string
  icon: string
  date: string
  time: string
  venue: string
  address: string
  description?: string
}

export interface GuestComment {
  id: number
  name: string
  message: string
  avatar: string
  date: string
  relation: string
}

export interface GalleryImage {
  id: number
  src: string
  alt: string
}

export interface GiftOption {
  bankName: string
  accountName: string
  accountNumber: string
  qrValue: string
}
