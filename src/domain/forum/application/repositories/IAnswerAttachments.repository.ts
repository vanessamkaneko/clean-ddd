import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.entity"

export interface IAnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
  