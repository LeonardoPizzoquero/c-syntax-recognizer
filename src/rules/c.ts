export type Rule = {
  message?: string;
  rule: RegExp;
  rules?: Omit<Rule, 'rules'>[];
}

export const rules: Rule[] = [
  {
    rule: /'#[A-z]* <[A-z]*>'/g,
    rules: [
      {
        rule: /'#include <[A-z]*>'/g,
        message: 'A declaração deve ser feita da seguinte forma: \'#include <tipo.nome>\'',
      },
      {
        rule: /'#include <[A-z]*.[A-z]>'/g,
        message: 'A declaração deve ser feita da seguinte forma: \'#include <tipo.nome>\'',
      },
    ]
  },
  {
    rule: /[A-z]* [A-z]*\(\)/g,
    rules: [
      {
        rule: /{(.|\s)*}/g,
        message: 'A declaração da função deve ser feita da seguinte forma: \'{ <comandos> }\'',
      },
    ]
  },
  {
    rule: /printf*\(.*\)/g,
    rules: [
      {
        rule: /printf*\(.*\);/g,
        message: 'A declaração do "printf" está incorreta.',
      },
    ]
  },
  {
    rule: /scanf*\(.*\)/g,
    rules: [
      {
        rule: /scanf*\(.*\);/g,
        message: 'A declaração do "scanf" está incorreta.',
      },
    ]
  },
  {
    rule:  /[a-z]* [0-9]/g,
    message: 'A declaração de retorno está incorreta.',
    rules: [
      {
        rule: /return [0-9]/g,
        message: 'A declaração de retorno está incorreta.',
      },
      {
        rule: /return [0-9];/g,
        message: 'A declaração de retorno está incorreta.',
      },
    ]
  },
]