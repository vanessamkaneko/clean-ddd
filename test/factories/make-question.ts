import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Question, QuestionProps } from "../../src/domain/forum/enterprise/entities/question.entity";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID) {
  const question = Question.create({
    title: faker.lorem.sentence(),
    slug: Slug.create('example-question-test'),
    authorId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return question
}