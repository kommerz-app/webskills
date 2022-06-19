import { camelCase, kebabCase, pascalCase, snakeCase } from './case.utils';

describe('CaseUtils', () => {
  it('should convert camel case', () => {
    expect(camelCase('Hello MyTest')).toBe('helloMyTest');
    expect(camelCase('hello My test')).toBe('helloMyTest');
    expect(camelCase('hello My_test')).toBe('helloMyTest');
    expect(camelCase('hello My Test')).toBe('helloMyTest');
    expect(camelCase('hello MyTest')).toBe('helloMyTest');
    expect(camelCase('helloMy test')).toBe('helloMyTest');
    expect(camelCase('Hello My test')).toBe('helloMyTest');
    expect(camelCase('hello_My_test')).toBe('helloMyTest');
    expect(camelCase('helloMyTest')).toBe('helloMyTest');
    expect(camelCase('HelloMyTest')).toBe('helloMyTest');
    expect(camelCase('_hello_My test')).toBe('helloMyTest');
  });

  it('should convert kebab case', () => {
    expect(kebabCase('hello My test')).toBe('hello-my-test');
    expect(kebabCase('helloMyTest')).toBe('hello-my-test');
    expect(kebabCase('hello_My_Test')).toBe('hello-my-test');
    expect(kebabCase('hello_My Test')).toBe('hello-my-test');
  });

  it('should convert snake case', () => {
    expect(snakeCase('hello My test')).toBe('hello_my_test');
    expect(snakeCase('helloMyTest')).toBe('hello_my_test');
    expect(snakeCase('hello_My_Test')).toBe('hello_my_test');
    expect(snakeCase('hello_My Test')).toBe('hello_my_test');
  });

  it('should convert pascal case', () => {
    expect(pascalCase('hello My test')).toBe('HelloMyTest');
  });
});
