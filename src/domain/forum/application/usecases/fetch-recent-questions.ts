import { Either, right } from "../../../../core/either"
import { Question } from "../../enterprise/entities/question.entity"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"


interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, {
  questions: Question[]
}>


export class FetchRecentQuestionsUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ) {}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right ({ questions })
  }
}