import { IAnswersRepository } from "../repositories/IAnswers.repository"


interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}


export class DeleteAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ) {}

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found!')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}