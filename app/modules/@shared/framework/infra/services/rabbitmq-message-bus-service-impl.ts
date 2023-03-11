import amqp from 'amqplib'
import { MessageBus } from 'app/modules/@shared/domain/ports/message-bus'
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
    await this.channel.assertExchange(this.exchangeName, 'topic', { durable: false })
  }

  public async publish (routingKey: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized')
    }

    console.log(routingKey)
    this.channel.publish(this.exchangeName, routingKey, Buffer.from(message))
  }

  public async consume (bindingKey: string,
    onMessage: (message: string, ack?: (msg: any) => void) => void)
    : Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized')
    }

    const queueName = `queue_${bindingKey}`
    await this.channel.assertQueue(queueName, { durable: false })
    await this.channel.bindQueue(queueName, this.exchangeName, bindingKey)
    await this.channel.consume(
      queueName,
      (msg) => {
        if (msg) {
          const message = msg.content.toString()
          onMessage(message, this.channel?.ack)
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
