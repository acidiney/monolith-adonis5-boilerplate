import amqp from 'amqplib'
import {Message, MessageBus} from 'app/modules/@shared/domain/ports/message-bus'
import Logger from '@ioc:Adonis/Core/Logger'

export class RabbitmqMessageBusServiceImpl implements MessageBus {
  private static instance: RabbitmqMessageBusServiceImpl

  private connection: amqp.Connection
  private channel?: amqp.Channel

  private readonly exchangeName = 'outbox_exchange'

  private constructor (private readonly url: string) {}

  public async start (): Promise<void> {
    this.connection = await amqp.connect(this.url)
    Logger.info('[MessageBus]: RabbitMQ Connected')

    this.channel = await this.connection.createChannel()
    await this.channel.assertExchange(this.exchangeName, 'topic', { durable: true })
  }

  public async publish (routingKey: string, message: Message): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized')
    }

    this.channel.publish(this.exchangeName, routingKey, Buffer.from(JSON.stringify(message)))
  }

  public async consume (bindingKey: string,
    onMessage: (message: Message, ack: () => void) => Promise<void>)
    : Promise<void> {
    if (!this.channel) {
      // console.error(Error('Channel is not initialized'))
      return
    }

    const queueName = bindingKey
    await this.channel.assertQueue(queueName, { durable: true })
    await this.channel.bindQueue(queueName, this.exchangeName, bindingKey)
    await this.channel.consume(
      queueName,
      async (msg) => {
        if (msg) {
          const message = JSON.parse(msg.content.toString())
          await onMessage(message, () => this.channel?.ack(msg))
        }
      },
      { noAck: false }
    )
  }

  public async stop (): Promise<void> {
    if (this.channel) {
      await this.channel.close()
    }
    if (this.connection) {
      await this.connection.close()
    }
  }

  public static getInstance (url?: string): RabbitmqMessageBusServiceImpl {
    if (!this.instance) {
      this.instance = new RabbitmqMessageBusServiceImpl(url as string)
    }

    return this.instance
  }
}
