import { makeAnswer } from "../../../../../test/factories/make-answer"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers.repository"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { EditAnswerUseCase } from "./edit-answer.usecase"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase
// sut: system under test

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'Content test',
      answerId: newAnswer.id.toString()
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content test',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        content: 'Content test',
        answerId: newAnswer.id.toString()
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
