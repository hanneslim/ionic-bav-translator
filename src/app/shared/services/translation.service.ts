import { Injectable } from '@angular/core';
import {
    dictionaryMap,
    smallWordsMap,
    partlyWordsMap,
} from '../dictionary/dictionary';

@Injectable({
    providedIn: 'root',
})
export class TranslationsService {


    public extractAndReplaceWords = (input: string) => {
        let originalText = input;
        const wordList = input.split(new RegExp('[, !?<>*%+#~"\'.:_-]+', 'g'));

        wordList.forEach((word) => {
            const lowWord = word.charAt(0).toLowerCase() + word.substring(1);
            const uppWord = word.charAt(0).toUpperCase() + word.substring(1);

            if (dictionaryMap.has(lowWord)) {
                originalText = this._replaceWords(lowWord, originalText, word);
            } else if (dictionaryMap.has(uppWord)) {
                originalText = this._replaceWords(uppWord, originalText, word);
            } else if (smallWordsMap.has(uppWord)) {
                originalText = this._replaceSmallWords(uppWord, originalText, word);
            } else if (smallWordsMap.has(lowWord)) {
                originalText = this._replaceSmallWords(lowWord, originalText, word);
            } else {
                originalText = this._replaceParts(originalText, word);
            }
        });
        return originalText;
    };

    private _replaceParts = (originalText: string, originalWord: string) => {
        let bavWord: string = originalWord;
        let stop = false;
        for (const [key, value] of partlyWordsMap.entries()) {
            if (originalWord.includes(key) && stop === false) {
                const splittedWord: string[] = originalWord.split(key);
                const index = splittedWord.indexOf('');
                if (index > -1) {
                    splittedWord[index] = value;
                    bavWord = splittedWord.join().replace(',', '');
                    stop = true;
                } else {
                    splittedWord[2] = splittedWord[1];
                    splittedWord[1] = value;
                    bavWord = splittedWord.join().replace(',', '').replace(',', '');
                    stop = true;
                }
            }
        }

        return (originalText = originalText.replace(originalWord, bavWord));
    };

    private _replaceWords = (
        casSensitiveWord: string,
        originalText: string,
        originalWord: string
    ) => {
        let bavWord = dictionaryMap.get(casSensitiveWord) as string;
        if (this.isUpperCase(originalWord.charAt(0))) {
            bavWord = bavWord.charAt(0).toUpperCase() + bavWord.substring(1);
        } else {
            bavWord = bavWord.charAt(0).toLowerCase() + bavWord.substring(1);
        }

        return (originalText = originalText.replace(originalWord, bavWord));
    };

    private _replaceSmallWords = (
        casSensitiveWord: string,
        originalText: string,
        originalWord: string
    ) => {
        let bavWord = smallWordsMap.get(casSensitiveWord) as string;
        if (this.isUpperCase(originalWord.charAt(0))) {
            bavWord = bavWord.charAt(0).toUpperCase() + bavWord.substring(1);
            if (originalText.indexOf(originalWord + ' ') > -1) {
                return (originalText = originalText.replace(
                    originalWord + ' ',
                    bavWord + ' '
                ));
            }
            return this._checkIndex(originalText, originalWord, bavWord);
        }
        bavWord = bavWord.charAt(0).toLowerCase() + bavWord.substring(1);

        return this._checkIndex(originalText, originalWord, bavWord);
    };

    private _checkIndex = (
        originalText: string,
        originalWord: string,
        bavWord: string
    ) => {
        let modifiedOriginal: string;
        let modifiedBavWord: string;
        if (originalText.indexOf(' ' + originalWord + ' ') > -1) {
            modifiedOriginal = ' ' + originalWord + ' ';
            modifiedBavWord = ' ' + bavWord + ' ';
            return (originalText = originalText.replace(
                modifiedOriginal,
                modifiedBavWord
            ));
        }
        if (originalText.indexOf(' ' + originalWord + ',') > -1) {
            modifiedOriginal = ' ' + originalWord + ',';
            modifiedBavWord = ' ' + bavWord + ',';
            return (originalText = originalText.replace(
                modifiedOriginal,
                modifiedBavWord
            ));
        }
        if (originalText.indexOf(' ' + originalWord + '.') > -1) {
            modifiedOriginal = ' ' + originalWord + '.';
            modifiedBavWord = ' ' + bavWord + '.';
            return (originalText = originalText.replace(
                modifiedOriginal,
                modifiedBavWord
            ));
        }
        if (originalText.indexOf(' ' + originalWord + '?') > -1) {
            modifiedOriginal = ' ' + originalWord + '?';
            modifiedBavWord = ' ' + bavWord + '?';
            return (originalText = originalText.replace(
                modifiedOriginal,
                modifiedBavWord
            ));
        }
        if (originalText.indexOf(' ' + originalWord + '!') > -1) {
            modifiedOriginal = ' ' + originalWord + '!';
            modifiedBavWord = ' ' + bavWord + '!';
            return (originalText = originalText.replace(
                modifiedOriginal,
                modifiedBavWord
            ));
        }
        if (originalText.indexOf(' ' + originalWord + ':') > -1) {
            modifiedOriginal = ' ' + originalWord + ':';
            modifiedBavWord = ' ' + bavWord + ':';
            return (originalText = originalText.replace(
                modifiedOriginal,
                modifiedBavWord
            ));
        }
        return originalText;
    };

    private isUpperCase = (string: string) => /^[A-Z]*$/.test(string);
}