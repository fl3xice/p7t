import { randomInt } from 'crypto';
import EventEmitter from 'events';

import { Subscriber, SubscriberCallback } from './subscriber';

interface PublisherEvents<T> {
  newSubscriber: [subscriber: Subscriber<T>];
  removeSubscriber: [callback: SubscriberCallback<T>];
  publish: [data: T];
}

export class Publisher<T> {
  private subscribers: Map<string, Subscriber<T>> = new Map();
  private eventEmitter = new EventEmitter();

  /**
   * ```js
   * const publisher = new Publisher();
   * ```
   * @param initialPublish You can post your first publication, but no one will see it
   */
  constructor(initialPublish?: T) {
    this.publish(initialPublish);
  }

  /**
   * ```js
   * const publisher = new Publisher();
   *
   * publisher.subscribe((data) => {
   *    console.log(data);
   * });
   *
   * publisher.publish(5);
   *
   * // Output: 5
   * ```
   * @param data
   */
  public publish(data: T): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.callback(data);
    });

    this.emit('publish', data);
  }

  /**
   * ```js
   * publisher.subscribe((data) => {
   *    console.log(data);
   * });
   * ```
   * @param callback
   * @returns Subscriber
   */
  public subscribe(callback: SubscriberCallback<T>): Subscriber<T> {
    const id = randomInt(1_000_000_000).toString();

    const subscriber = new Subscriber(callback, () => {
      // First emit about removing subscriber
      this.emit('removeSubscriber', this.subscribers.get(id).callback);
      this.subscribers.delete(id);
    });

    this.subscribers.set(id, subscriber);

    this.emit('newSubscriber', this.subscribers.get(id));

    return this.subscribers.get(id);
  }

  public on<K extends keyof PublisherEvents<T>>(
    eventName: K,
    listener: (...args: PublisherEvents<T>[K]) => Awaitable<void>
  ): void {
    this.eventEmitter.on(eventName, listener);
  }

  private emit<K extends keyof PublisherEvents<T>>(
    eventName: K,
    ...args: PublisherEvents<T>[K]
  ): void {
    this.eventEmitter.emit(eventName, ...args);
  }
}
