# p7t

The abbreviation p7t stands for publicist. This library implements the Publish/Subscribe pattern. You can use it for specific projects or moments in the code where you need it.

# Usage example

```ts
// Create a channel that can send data with the string type
const channel = new Publisher<string>();

// Subscribe to this channel someone callback function
channel.subscribe((message) => {
  console.log(message);
});

// You can use async/await callback
channel.subscribe(async (message) => {
  console.log(message);
});

// The function of subscribing to a publicist, returns the subscriber, you can call the subscriber a function that will unsubscribe from the publicist
const mySubscriber = channel.subscribe((message) => {
  console.log(message);
});

// Unsubscribe
mySubscriber.unSubscribe();
```

## How to listen events of Publisher

```ts
const channel = new Publisher<string>();

channel.subscribe((message) => {
  console.log(message);
});

channel.on('publish', (message) => {
  console.log('Publish: ' + message);
});

channel.on('newSubscriber', (subscriber) => {
  // You can unsubscribe all new subscribers
  subscribe.unSubscribe();
});

// In this listener, you have a callback function in the subscriber
channel.on('removeSubscriber', (callback) => {
  // You can send the last message to the subscriber before deleting it
  callback('You are removed ;(');
});
```
