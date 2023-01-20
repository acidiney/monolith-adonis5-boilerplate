import { Output } from '../ports'

const output = (statusCode: number, body: any): Output<any> => ({
  statusCode,
  body
})

export const ok = <T extends any>(body: T): Output<any> => output(200, body)

export const created = <T extends any>(body: T): Output<any> => output(201, body)

export const badRequest = <T extends any>(body: T): Output<any> => output(400, body)

export const notFound = <T extends any>(body: T): Output<any> => output(404, body)

export const unauthorized = <T extends any>(body: T): Output<any> => output(401, body)

export const forbidden = <T extends any>(body: T): Output<any> => output(403, body)

export const internalServerError = (): Output<any> =>
  output(500, {
    error: 'Oops, it is not good. An error occur, I already notified our engineers!'
  })
