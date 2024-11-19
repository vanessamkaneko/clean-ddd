import { Answer } from "../../enterprise/entities/answer.entity"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { IAnswersRepository } from "../repositories/IAnswers.repository"


interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ) { }

  async execute({ content, instructorId, questionId }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId)
    })

    await this.answersRepository.create(answer)

    return { answer };
  }
}