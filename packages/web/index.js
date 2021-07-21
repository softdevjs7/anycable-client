import {
  ActionCableProtocol,
  WebSocketTransport,
  JSONEncoder,
  Cable,
  Monitor
} from '@anycable/core'

import { Logger } from './logger/index.js'

export { Channel } from '@anycable/core'

const metaPrefixes = ['cable-', 'action-cable-']

const defaultUrl = '/cable'

/* eslint-disable consistent-return */
const fromMeta = key => {
  metaPrefixes.forEach(prefix => {
    let element = document.head.querySelector(`meta[name='${prefix}-${key}']`)

    if (element) {
      return element.getAttribute('content')
    }
  })
}

const defaultOpts = {
  protocol: 'actioncable-v1-json',
  pingInterval: 3,
  maxReconnectAttempts: Infinity,
  maxMissingPings: 2,
  logLevel: 'warn',
  lazy: true
}

export function createCable(url, opts) {
  if (typeof url === 'object' && typeof opts === 'undefined') {
    opts = url
    url = undefined
  }

  url ||= fromMeta('url') || defaultUrl
  opts ||= {}

  opts = Object.assign({}, defaultOpts, opts)

  let {
    protocol,
    websocketImplementation,
    logLevel,
    logger,
    transport,
    encoder,
    lazy,
    pingInterval,
    reconnectStrategy,
    maxMissingPings,
    maxReconnectAttempts
  } = opts

  let subprotocol = protocol

  if (protocol === 'actioncable-v1-json') {
    protocol = new ActionCableProtocol()
  } else {
    throw Error(`Protocol is not supported yet: ${protocol}`)
  }

  transport ||= new WebSocketTransport(url, {
    websocketImplementation,
    subprotocol
  })

  encoder ||= new JSONEncoder()

  logger ||= new Logger(logLevel)

  let cable = new Cable({
    protocol,
    transport,
    encoder,
    logger,
    lazy
  })

  new Monitor(cable, {
    pingInterval,
    reconnectStrategy,
    maxMissingPings,
    maxReconnectAttempts
  })

  return cable
}
