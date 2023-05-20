export type SubscriberCallback<T> = (data: T) => Awaitable<void>;

export class Subscriber<T> {
  constructor(
    public readonly callback: SubscriberCallback<T>,
    private readonly unsubscribeMethod: () => Awaitable<void>
  ) {}

  public unSubscribe(): void {
    this.unsubscribeMethod();
  }
}
