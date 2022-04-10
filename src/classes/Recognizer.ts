import * as fs from 'fs';

import { rules, Rule } from '../rules/c';

class Recognizer {
  private lines: string[] = [];
  private error: string = '';
  private rules: Rule[] = rules;

  constructor (file: string) {
    this.lines = this.readFile(file);
  }

  private readFile(file: string): string[] {
    var lines: string[] = [];

    lines = fs.readFileSync(file, 'utf8').toString().split('\n');

    return lines;
  }

  public getLines() {
    return this.lines;
  }

  public checkSyntax() {
    let correct = true;

    this.lines.forEach((line) => {
      if (line === '' || !correct) return;

      correct = this.checkRules(line);
    });

    if (!correct) return this.error;

    return '✅\u001b[1;32m Sintaxe correta.'; 
  } 

  private checkRules(line: string): boolean {
    const ruleCategoryIndex = this.rules.findIndex(({ rule }) => {
      return rule.test(line)
    });

    if (ruleCategoryIndex === -1) {
      this.buildErrorMessage(this.lines.indexOf(line) + 1, line, 'Erro de sintaxe');

      return false;
    }

    const ruleCategory = this.rules[ruleCategoryIndex];

    const findWrongRule = ruleCategory.rules?.find(({ rule }) => {
      return !rule.test(line.trim())
    }); 

    if (findWrongRule) {
      this.buildErrorMessage(this.lines.indexOf(line) + 1, line, String(findWrongRule.message));

      return false;
    }
 
    return true
  } 
 
  private buildErrorMessage(lineNumber: Number, line: string, message: string) {
    this.error = `❌ \u001b[1;31mERRO 
-> Linha ${lineNumber}
-> Código: ${line.trim()}
-> Mensagem: ${message}
    `;
  } 
}  
 
export { Recognizer };   