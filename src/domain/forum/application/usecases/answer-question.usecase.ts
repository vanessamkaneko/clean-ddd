import { Answer } from "../../enterprise/entities/answer.entity"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { IAnswersRepository } from "../repositories/IAnswers.repository"
import { Either, right } from "../../../../core/either"
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.entity"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list"


interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ) { }

  async execute({ content, instructorId, questionId, attachmentsIds }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId)
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({
      answer
    })
  }
}
