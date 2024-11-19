import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers.repository'
import { AnswerQuestionUseCase } from './answer-question.usecase'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
// sut: system under test

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo'
    })
  
    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})