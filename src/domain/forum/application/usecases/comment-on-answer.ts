import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { IAnswerCommentsRepository } from "../repositories/IAnswerComments.repository"
import { IAnswersRepository } from "../repositories/IAnswers.repository"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}


export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository
  ) {}

  async execute({ authorId, answerId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found!')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content
    })

    await this.answerCommentsRepository.create(answerComment)

    return {
      answerComment
    }
  }
}