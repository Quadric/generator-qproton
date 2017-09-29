import test from 'ava';
import whatever from './whatever';

test('no data', t => {
  const result = whatever();

  t.is(result, undefined);
  throw new Error('we love your tests ❤️  please implement some tests 😍  ');
});
