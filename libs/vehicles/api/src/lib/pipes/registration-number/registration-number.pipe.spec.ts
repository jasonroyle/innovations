import { RegistrationNumberPipe } from './registration-number.pipe';

describe('RegistrationNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new RegistrationNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
