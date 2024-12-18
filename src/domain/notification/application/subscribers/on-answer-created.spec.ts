import { makeAnswer } from "../../../../../test/factories/make-answer"
import { makeQuestion } from "../../../../../test/factories/make-question"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers.repository"
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-attachments.repository"
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications.repository"
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachments.repository"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions.repository"
import { waitFor } from "../../../../../test/utils/wait-for"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../usecases/send-notification"
import { OnAnswerCreated } from "./on-answer-created"
import { MockInstance } from 'vitest'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest,
  ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

    // "espiando" método execute do sendNotificationUseCase -> irá anotar se o método foi disparado ou não
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase) // Criação do subscriber -> começa a ouvir o evento de uma nova answer criada
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()

    // Criação da answer 
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)

    inMemoryAnswersRepository.create(answer)
    /* Answer salva no banco de dados -> há a chamada das funções: dispatchEventsForAggregate -> dispatchAggregateEvents -> 
    dispatch (que há o handler, que irá chamar o sendNewAnswerNotification do OnAnswerCreated, disparando a notificação) 
    */

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})