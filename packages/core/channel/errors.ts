import { Channel, Message, MessageMeta } from '../index'

class Cable {
  unsubscribe(id: string): Promise<void> {
    return Promise.resolve()
  }

  perform(
    id: string,
    action: string,
    payload: object
  ): Promise<[Message, MessageMeta] | void> {
    return Promise.resolve()
  }
}

const cable = new Cable()

new Channel(
  // THROWS Argument of type
  42
)

export class IdChannel extends Channel<{ id: string }> {}

// THROWS Type 'number' is not assignable
new IdChannel({ id: 42 })

const ch = new Channel()

// THROWS Argument of type
ch.on('connect', (event: object) => {
  event
})

// THROWS Argument of type
ch.on('disconnect', (event: string) => {
  event
})

// THROWS Argument of type
ch.on('message', (msg: object, meta: object) => {
  meta
})

// THROWS Argument of type
ch.on('data', (msg: object) => true)
