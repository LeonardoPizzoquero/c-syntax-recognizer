export type Rule = {
  message?: string;
  rule: RegExp;
  global?: boolean;
  rules?: Omit<Rule, 'rules'>[];
} 

export const rules: Rule[] = [
  { 
    rule: /#[A-z]*/,
    rules: [
      {
        rule: /#[A-z]* <(.)*>/,
        message: 'A declaração deve ser feita da seguinte forma: \'#include <nome.extensão>\'',
      },
      {
        rule: /#include <(.)*>/,
        message: 'A declaração deve ser feita da seguinte forma: \'#include <nome.extensão>\'',
      },
      {
        rule: /#include <[A-z]*.[A-z]>/,
        message: 'A declaração deve ser feita da seguinte forma: \'#include <nome.extensão>\'',
      },
    ]
  },
  {
    rule: /{|}/,
    rules: [],
  },
  {
    rule: /printf\(.*\)/,
    rules: [
      {
        rule: /printf\(.*\);/,
        message: 'Adicione um ; ao final da declaração',
      },
      {
        rule: /printf\(("?)([^"]+(\s)*)*("?)(,)*([A-z]*(,)*)\)/,
        message: 'Adicione o conteúdo para o printf',
      },
    ]  
  },  
  { 
    rule: /[A-z]* [A-z]*\(\)/, 
    rules: [
      {
        rule: /int main\(\)/,
        message: 'A declaração da função deve ser feita da seguinte forma: \'int main()\'',
      }, 
      { 
        rule: /int main\(\)(\n)*{((.|\n)*)}/,
        global: true,
        message: 'O corpo da função precisa estar por volta de chaves',
      }, 
    ]
  },
  {
    rule: /scanf\(.*\)/,
    rules: [
      {
        rule: /scanf\(.*\);/,
        message: 'Adicione um ";" ao final da declaração',
      },
      {
        rule: /scanf*\((\s)*("((%)+[A-z]+(\s)*)+"(\s)*,(\s)*)(&[a-z]+)(\s)*\);/,
        message: 'Argumentos para o "scanf" estão incorretos',
      },
    ]
  },
  {
    rule:  /[a-z]* [0-9]/,
    message: 'A declaração de retorno está incorreta',
    rules: [
      {
        rule: /return [0-9]/,
        message: 'A declaração de retorno está incorreta',
      },
      {
        rule: /return [0-9];/,
        message: 'Declare ";" no final ',
      },   
    ]  
  },  
  {    
    rule:  /[A-z]+(\s)([A-z]+(,)?(\s)?)+/,
    rules: [   
      {
        rule: /[A-z]+(\s)([A-z]+(,)?(\s)?)+;/,
        message: 'Declare ";" no final ',
      },
    ]  
  },
  {
    rule:  /^\s*([A-Za-z_]\w*)\s*=\s*(.*)/,
    rules: [
      {
        rule: /^\s*([A-Za-z_]\w*)\s*=\s*(.*);/,
        message: 'Declare ";" no final ',
      },
      {
        rule: /^\s*([A-Za-z_]\w*)\s*=\s*([A-z]+\s+(\+|-|\*|\/|%|\+\+|--)\s+[A-z]+)/,
        message: 'Atribuição de valor incorreta',
      }
    ]
  },
]