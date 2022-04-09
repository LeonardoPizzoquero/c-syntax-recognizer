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
    this.lines.forEach((line) => {
      let correct = false;

      if (line === '') return;

      correct = this.checkRules(line);
    });

    return this.error;
  }

  private checkRules(line: string): boolean {
    this.rules.forEach(({ rule, message, rules }) => {
      if (!line.match(rule)) {
        this.error = message || 'Erro de sintaxe';
      }

      if (this.error !== '') return;
    });

    return this.error === '';
  }
}

export { Recognizer };