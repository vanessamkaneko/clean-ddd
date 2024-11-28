import { PaginationParams } from "../../src/core/repositories/pagination-params"
import { IQuestionAttachmentsRepository } from "../../src/domain/forum/application/repositories/IQuestionAttachments.repository"
import { QuestionAttachment } from "../../src/domain/forum/enterprise/entities/question-attachment.entity"

export class InMemoryQuestionAttachmentsRepository implements IQuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items
      .filter(item => item.questionId.toString() === questionId)

    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items
      .filter(item => item.questionId.toString() !== questionId)

      this.items = questionAttachments
  }
}