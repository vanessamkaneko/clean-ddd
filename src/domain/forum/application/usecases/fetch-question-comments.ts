import { Either, right } from "../../../../core/either"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { IQuestionCommentsRepository } from "../repositories/IQuestionComments.repository"

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<null, {
  questionComments: QuestionComment[]
}>


export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({ page, questionId }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page })

    return right({ questionComments })
  }
}