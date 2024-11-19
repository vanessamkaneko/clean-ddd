import { Answer } from "../../enterprise/entities/answer.entity"
import { IAnswersRepository } from "../repositories/IAnswers.repository"

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}


export class FetchQuestionAnswersUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ) {}

  async execute({ page, questionId }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return { answers }
  }
}