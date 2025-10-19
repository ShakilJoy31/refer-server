export interface ICommentAndRating {
  name: string
  comment: string
  equipmentPerformance: number
  customerService: number
  supportServices: number
  afterSales: number
  miscellaneous: number
  averageRating?: number
}

export interface IReview {
  repliedCommentId: number
  reviewerName: string
  reviewerComment: string
  reviewTime: string
}

export interface IComment {
  commentId: number
  name: string
  comment: string
  commentTime: string
}

export interface INewBook {
  title: string
  author: string
  genre: string
  publicationDate: string
  bookPicture?: string[]
  comments: Comment[]
}
