/*eslint-env mocha */
import { eventAttribute, containerAttribute, keyAttribute, mapActionTo } from '../';
import { expect } from 'chai';
import sinon from 'sinon';

describe('helpers', function() {
    describe('event', function() {
        it('should return click event attribute', function() {
            expect(eventAttribute('click', 'callback')).to.equal('data-brk-onclick="callback"');
        });

        it('should return focus event attribute', function() {
            expect(eventAttribute('focus', 'callback')).to.equal('data-brk-onfocus="callback"');
        });

        it('should return unknown event attribute', function() {
            expect(eventAttribute('somerandomevent', 'callback')).to.equal('data-brk-unknown="somerandomevent"');
        });
    });

    describe('container', function() {
        it('should return container attribute', function() {
            expect(containerAttribute('brkName')).to.equal('data-brk-container="brkName"');
        });
    });

    describe('key', () => {
        it('should return key attribute', () => {
            expect(keyAttribute('123')).to.equals('data-brk-key="123"');
        });
    });

    describe('mapActionTo', () => {
        before(() => {
            sinon.stub(console, 'warn').callsFake(() => {});
        });

        it('should be curried', () => {
            expect(mapActionTo('SOURCE')).to.be.a('function');
            expect(mapActionTo('SOURCE', 'DEST')).to.be.a('function');
        });

        it('should leave unmatched action alone', () => {
            const action = {
                type: 'NOT_SOURCE',
                payload: { test: true }
            };

            expect(mapActionTo('SOURCE', 'DEST', action)).to.equal(action);
        });

        it('should map source to dest with meta', () => {
            const action = {
                type: 'SOURCE',
                payload: { test: true }
            };

            expect(mapActionTo('SOURCE', 'DEST', action)).to.eql({
                type: 'DEST',
                payload: { test: true },
                meta: {
                    sources: ['SOURCE']
                },
                source: 'SOURCE'
            });
        });

        it('should update meta when mapping', () => {
            const action = {
                type: 'SOURCE',
                payload: { test: true },
                meta: {
                    sources: ['PREV_SOURCE']
                }
            };

            expect(mapActionTo('SOURCE', 'DEST', action)).to.eql({
                type: 'DEST',
                payload: { test: true },
                meta: {
                    sources: ['PREV_SOURCE', 'SOURCE']
                },
                source: 'SOURCE'
            });
        });

        after(() => {
            console.warn.restore();
        });
    });
});
