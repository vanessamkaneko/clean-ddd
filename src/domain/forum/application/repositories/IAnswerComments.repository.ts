import { PaginationParams } from "../../../../core/repositories/pagination-params"
import { AnswerComment } from "../../enterprise/entities/answer-comment"

export interface IAnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
  delete(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
}