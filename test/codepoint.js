'use strict';

var cp = require('../codepoint.js');
var expect = require('expect.js');

describe('codepoint', function() {
  it('isSurrogate', function() {
    expect(cp.isSurrogate(0x0000)).to.not.be.ok();
    expect(cp.isSurrogate(0xD7FF)).to.not.be.ok();
    expect(cp.isSurrogate(0xD800)).to.be.ok();
    expect(cp.isSurrogate(0xDBFF)).to.be.ok();
    expect(cp.isSurrogate(0xDC00)).to.be.ok();
    expect(cp.isSurrogate(0xDFFF)).to.be.ok();
    expect(cp.isSurrogate(0xE000)).to.not.be.ok();
    expect(cp.isSurrogate(0xFFFF)).to.not.be.ok();
    expect(cp.isSurrogate(0x10000)).to.not.be.ok();
    expect(cp.isSurrogate(0x10FFFF)).to.not.be.ok();
  });

  it('isHighSurrogate', function() {
    expect(cp.isHighSurrogate(0x0000)).to.not.be.ok();
    expect(cp.isHighSurrogate(0xD7FF)).to.not.be.ok();
    expect(cp.isHighSurrogate(0xD800)).to.be.ok();
    expect(cp.isHighSurrogate(0xDBFF)).to.be.ok();
    expect(cp.isHighSurrogate(0xDC00)).to.not.be.ok();
    expect(cp.isHighSurrogate(0xDFFF)).to.not.be.ok();
    expect(cp.isHighSurrogate(0xE000)).to.not.be.ok();
    expect(cp.isHighSurrogate(0xFFFF)).to.not.be.ok();
    expect(cp.isHighSurrogate(0x10000)).to.not.be.ok();
    expect(cp.isHighSurrogate(0x10FFFF)).to.not.be.ok();
  });

  it('isLowSurrogate', function() {
    expect(cp.isLowSurrogate(0x0000)).to.not.be.ok();
    expect(cp.isLowSurrogate(0xD7FF)).to.not.be.ok();
    expect(cp.isLowSurrogate(0xD800)).to.not.be.ok();
    expect(cp.isLowSurrogate(0xDBFF)).to.not.be.ok();
    expect(cp.isLowSurrogate(0xDC00)).to.be.ok();
    expect(cp.isLowSurrogate(0xDFFF)).to.be.ok();
    expect(cp.isLowSurrogate(0xE000)).to.not.be.ok();
    expect(cp.isLowSurrogate(0xFFFF)).to.not.be.ok();
    expect(cp.isLowSurrogate(0x10000)).to.not.be.ok();
    expect(cp.isLowSurrogate(0x10FFFF)).to.not.be.ok();
  });

  it('isSurrogatePair', function() {
    expect(cp.isSurrogatePair(0xD7FF, 0xDBFF)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xD7FF, 0xDC00)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xD7FF, 0xDFFF)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xD7FF, 0xE000)).to.not.be.ok();

    expect(cp.isSurrogatePair(0xD800, 0xDBFF)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xD800, 0xDC00)).to.be.ok();
    expect(cp.isSurrogatePair(0xD800, 0xDFFF)).to.be.ok();
    expect(cp.isSurrogatePair(0xD800, 0xE000)).to.not.be.ok();

    expect(cp.isSurrogatePair(0xDBFF, 0xDBFF)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xDBFF, 0xDC00)).to.be.ok();
    expect(cp.isSurrogatePair(0xDBFF, 0xDFFF)).to.be.ok();
    expect(cp.isSurrogatePair(0xDBFF, 0xE000)).to.not.be.ok();

    expect(cp.isSurrogatePair(0xDC00, 0xDBFF)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xDC00, 0xDC00)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xDC00, 0xDFFF)).to.not.be.ok();
    expect(cp.isSurrogatePair(0xDC00, 0xE000)).to.not.be.ok();
  });

  it('isBmpCodePoint', function() {
    expect(cp.isBmpCodePoint(0x0000)).to.be.ok();
    expect(cp.isBmpCodePoint(0xFFFF)).to.be.ok();
    expect(cp.isBmpCodePoint(0x10000)).to.not.be.ok();
    expect(cp.isBmpCodePoint(0x10FFFF)).to.not.be.ok();
  });

  it('isSupplementaryCodePoint', function() {
    expect(cp.isSupplementaryCodePoint(0x0000)).to.not.be.ok();
    expect(cp.isSupplementaryCodePoint(0xFFFF)).to.not.be.ok();
    expect(cp.isSupplementaryCodePoint(0x10000)).to.be.ok();
    expect(cp.isSupplementaryCodePoint(0x10FFFF)).to.be.ok();
    expect(cp.isSupplementaryCodePoint(0x110000)).to.not.be.ok();
  });

  it('charCount', function() {
    expect(cp.charCount(0x0000)).to.be(1);
    expect(cp.charCount(0xFFFF)).to.be(1);
    expect(cp.charCount(0x10000)).to.be(2);
    expect(cp.charCount(0x10FFFF)).to.be(2);
  });

  it('highSurrogate', function() {
    expect(cp.highSurrogate(0x10000)).to.be(0xD800);
    expect(cp.highSurrogate(0x103FF)).to.be(0xD800);
    expect(cp.highSurrogate(0x10FC00)).to.be(0xDBFF);
    expect(cp.highSurrogate(0x10FFFF)).to.be(0xDBFF);
  });

  it('lowSurrogate', function() {
    expect(cp.lowSurrogate(0x10000)).to.be(0xDC00);
    expect(cp.lowSurrogate(0x103FF)).to.be(0xDFFF);
    expect(cp.lowSurrogate(0x10FC00)).to.be(0xDC00);
    expect(cp.lowSurrogate(0x10FFFF)).to.be(0xDFFF);
  });

  it('toChars', function() {
    expect(cp.toChars(0x10000)).to.eql([ 0xD800, 0xDC00 ]);
    expect(cp.toChars(0x103FF)).to.eql([ 0xD800, 0xDFFF ]);
    expect(cp.toChars(0x10FC00)).to.eql([ 0xDBFF, 0xDC00 ]);
    expect(cp.toChars(0x10FFFF)).to.eql([ 0xDBFF, 0xDFFF ]);
  });

  it('codePointAt', function() {
    var str = '\u0000\uD800\uDC00\uD800\uDFFF\uDBFF\uDC00\uDBFF\uDFFF\uD800';
    expect(cp.codePointAt(str)).to.be(0x0000);
    expect(cp.codePointAt(str, 1)).to.be(0x10000);
    expect(cp.codePointAt(str, 2)).to.be(0xDC00);
    expect(cp.codePointAt(str, 3)).to.be(0x103FF);
    expect(cp.codePointAt(str, 5)).to.be(0x10FC00);
    expect(cp.codePointAt(str, 7)).to.be(0x10FFFF);
    expect(cp.codePointAt(str, 9)).to.be(0xD800);
  });

  it('codePointBefore', function() {
    var str = '\uDC00\uD800\uDC00\uD800\uDFFF\uDBFF\uDC00\uDBFF\uDFFF\u0000';
    expect(cp.codePointBefore(str)).to.be(0x0000);
    expect(cp.codePointBefore(str, 9)).to.be(0x10FFFF);
    expect(cp.codePointBefore(str, 8)).to.be(0xDBFF);
    expect(cp.codePointBefore(str, 7)).to.be(0x10FC00);
    expect(cp.codePointBefore(str, 5)).to.be(0x103FF);
    expect(cp.codePointBefore(str, 3)).to.be(0x10000);
    expect(cp.codePointBefore(str, 1)).to.be(0xDC00);
  });

  it('codePointCount', function() {
    var str = '\u0000\uD800\uDC00\uD800\uDFFF\uDBFF\uDC00\uDBFF\uDFFF\uD800';
    expect(cp.codePointCount(str)).to.be(6);
    expect(cp.codePointCount(str, 1)).to.be(5);
    expect(cp.codePointCount(str, 1, 9)).to.be(4);
  });

  it('offsetByCodePoints', function() {
    var str = '\u0000\uD800\uDC00\uD800\uDFFF\uDBFF\uDC00\uDBFF\uDFFF';
    expect(cp.offsetByCodePoints(str, 0, 0)).to.be(0);
    expect(cp.offsetByCodePoints(str, 0, 1)).to.be(1);
    expect(cp.offsetByCodePoints(str, 0, 2)).to.be(3);
    expect(cp.offsetByCodePoints(str, 0, 3)).to.be(5);
    expect(cp.offsetByCodePoints(str, 0, 4)).to.be(7);
    expect(cp.offsetByCodePoints(str, 0, 5)).to.be(9);
    expect(cp.offsetByCodePoints(str, 0, 6)).to.be(-1);

    expect(cp.offsetByCodePoints(str, 9, 0)).to.be(9);
    expect(cp.offsetByCodePoints(str, 9, -1)).to.be(7);
    expect(cp.offsetByCodePoints(str, 9, -2)).to.be(5);
    expect(cp.offsetByCodePoints(str, 9, -3)).to.be(3);
    expect(cp.offsetByCodePoints(str, 9, -4)).to.be(1);
    expect(cp.offsetByCodePoints(str, 9, -5)).to.be(0);
    expect(cp.offsetByCodePoints(str, 9, -6)).to.be(-1);

    expect(cp.offsetByCodePoints(str, -1, 0)).to.be(-1);
    expect(cp.offsetByCodePoints(str, 10, 0)).to.be(-1);
  });

  it('forEachCodePoint', function() {
    var str = '\u0000\uD800\uDC00\uD800\uDFFF\uDBFF\uDC00\uDBFF\uDFFF';
    var array = [];
    var obj = {};
    cp.forEachCodePoint(str, function(c, index, s) {
      expect(c).to.be(cp.codePointAt(str, index));
      expect(s).to.be(str);
      expect(this).to.be(obj);
      array.push(c);
    }, obj);
    expect(array).to.eql([ 0x0000, 0x10000, 0x103FF, 0x10FC00, 0x10FFFF ]);
  });

  it('fromCodePoint', function() {
    var codePoints = [ 0x0000, 0xFFFF, 0x10000, 0x103FF, 0x10FC00, 0x10FFFF ];
    var str = '\u0000\uFFFF\uD800\uDC00\uD800\uDFFF\uDBFF\uDC00\uDBFF\uDFFF';
    expect(cp.fromCodePoint.apply(null, codePoints)).to.be(str);
  });

  it('toCodePoint', function() {
    expect(cp.toCodePoint(0xD800, 0xDC00)).to.be(0x10000);
    expect(cp.toCodePoint(0xD800, 0xDFFF)).to.be(0x103FF);
    expect(cp.toCodePoint(0xDBFF, 0xDC00)).to.be(0x10FC00);
    expect(cp.toCodePoint(0xDBFF, 0xDFFF)).to.be(0x10FFFF);
  });
});
