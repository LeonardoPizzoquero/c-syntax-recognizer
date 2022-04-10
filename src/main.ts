import { Recognizer } from './classes/Recognizer';

const recognize = new Recognizer('src/main.c');

console.log(recognize.checkSyntax());
