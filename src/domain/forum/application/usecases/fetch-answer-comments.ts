import { Either, right } from "../../../../core/either"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { IAnswerCommentsRepository } from "../repositories/IAnswerComments.repository"

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, {
  answerComments: AnswerComment[]
}>


export class FetchAnswerCommentsUseCase {
  constructor(
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute({ page, answerId }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return right({ answerComments }) 
  }
}