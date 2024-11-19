import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions.repository"
import { CreateQuestionUseCase } from "./create-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
// sut: system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo'
    })
  
    expect(question.id).toBeTruthy()
  })
})

