import expect from 'expect';
import * as greed from './greed';

describe('Greed', () => {

    describe('Name', () => {
        it('should be equal to Greed', () => {
            expect(greed.NAME).toEqual('Greed');
        });
    });

    describe('analyzeDice', () => {
        it('array of valid input should return object describing data', () => {
            expect(greed.analyzeDice([1, 1, 1, 2, 3])).toEqual({ 1: 3, 2: 1, 3: 1 });
        });
    });

    describe('score', () => {
        it('string input returns invalid input', () => {
            expect(greed.score("")).toEqual('invalid input');
            expect(greed.score("1,2,3,4,5")).toEqual('invalid input');
            expect(greed.score("12345")).toEqual('invalid input');
        });

        it('array of five valid elements returns positive numeric', () => {
            expect(typeof greed.score([1, 2, 3, 4, 5])).toEqual('number');
        });

        it('array of zero elements returns invalid input', () => {
            expect(greed.score([])).toEqual('invalid input');
        });

        it('array of four valid elements returns invalid input', () => {
            expect(greed.score([1,2,3,4])).toEqual('invalid input');
        });

        it('array of six valid elements returns invalid input', () => {
            expect(greed.score([1,2,3,4,5,6])).toEqual('invalid input');
        });

        it('returns invalid input if any element doesnt match 1..6', () => {
            expect(greed.score([1,-2,3,4,6])).toEqual('invalid input');
            expect(greed.score([null,2,4,5,6])).toEqual('invalid input');
            expect(greed.score([2,3,14,5,6])).toEqual('invalid input');
            expect(greed.score([1,2,undefined,5,6])).toEqual('invalid input');
            expect(greed.score([6,2,NaN,5,4])).toEqual('invalid input');
            expect(greed.score([6,"D",3,5,4])).toEqual('invalid input');
        });

        it('applies rule "single 1" correctly', () => {
            expect(greed.score([1, 2, 3, 4, 6])).toEqual(100);
        });

        it('applies rule "triple 1" correctly', () => {
            expect(greed.score([1, 1, 1, 4, 6])).toEqual(1000);
        });

        it('applies rule "triple 1" with "single 1" correctly', () => {
            expect(greed.score([1, 1, 1, 1, 6])).toEqual(1100);
        });

});



    /* Write your tests here */

});
