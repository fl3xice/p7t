import test from 'ava';

import { Publisher } from './publisher';

test('Create Publisher and Subscribe', (t) => {
  const publisher = new Publisher<number[]>();
  let c = 0;

  publisher.subscribe((data) => {
    t.assert(data.reduce((p, c) => p + c) == 10);
  });

  const twentySub = publisher.subscribe((data) => {
    t.assert(data.reduce((p, c) => p + c) * 2 == 20);
    c++;

    if (c > 3) {
      t.fail();
    }
  });

  publisher.publish([5, 5]);
  publisher.publish([6, 4]);
  publisher.publish([1, 6, 3]);

  twentySub.unSubscribe();

  publisher.publish([7, 3]);
});

test('Counting Publishes', (t) => {
  const publisher = new Publisher<number>();
  let c = 0;

  publisher.on('publish', () => {
    c++;
  });

  // Six publishes
  publisher.publish(0);
  publisher.publish(0);
  publisher.publish(0);
  publisher.publish(0);
  publisher.publish(0);
  publisher.publish(0);

  t.assert(c == 6);
});
