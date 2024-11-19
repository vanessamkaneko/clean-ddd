import { Question } from "../../enterprise/entities/question.entity"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"


interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}


export class FetchRecentQuestionsUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ) {}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}