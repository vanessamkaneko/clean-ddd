import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from '../../src/domain/forum/enterprise/entities/question-attachment.entity';

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}, id?: UniqueEntityID) {
  const questionAttachment = QuestionAttachment.create({
    questionId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override
  }, id)

  return questionAttachment
}