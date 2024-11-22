import { makeQuestion } from "../../../../../test/factories/make-question"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions.repository"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.usecase"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
// sut: system under test

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question')
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question'
    })
  
    //expect(result.value?.question.id).toBeTruthy()
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
