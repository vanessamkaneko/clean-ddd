import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { Question } from "../../enterprise/entities/question.entity"
import { IQuestionCommentsRepository } from "../repositories/IQuestionComments.repository"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}


export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository
  ) {}

  async execute({ authorId, questionId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found!')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment
    }
  }
}