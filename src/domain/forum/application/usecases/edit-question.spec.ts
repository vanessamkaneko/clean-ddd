import { makeQuestion } from "../../../../../test/factories/make-question"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions.repository"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { EditQuestionUseCase } from "./edit-question.usecase"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
// sut: system under test

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Question test',
      content: 'Content test',
      questionId: newQuestion.id.toString()
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Question test',
      content: 'Content test',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'Question test',
        content: 'Content test',
        questionId: newQuestion.id.toString()
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
