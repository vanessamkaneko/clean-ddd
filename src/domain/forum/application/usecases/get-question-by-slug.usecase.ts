import { error } from "console"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question.entity"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"


interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}


export class GetQuestionBySlugUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}