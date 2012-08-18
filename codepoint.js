'use strict';

module.exports = exports = {
  // constants for code units
  MIN_CODE_UNIT: 0x0000,
  MAX_CODE_UNIT: 0xFFFF,
  MIN_SURROGATE: 0xD800,
  MAX_SURROGATE: 0xDFFF,
  MIN_HIGH_SURROGATE: 0xD800,
  MAX_HIGH_SURROGATE: 0xDBFF,
  MIN_LOW_SURROGATE: 0xDC00,
  MAX_LOW_SURROGATE: 0xDFFF,

  // constants for code points
  MIN_CODE_POINT: 0x0000,
  MAX_CODE_POINT: 0x10FFFF,
  MIN_SUPPLEMENTARY_CODE_POINT: 0x10000,

  // tests for code unit
  isSurrogate: isSurrogate,
  isHighSurrogate: isHighSurrogate,
  isLowSurrogate: isLowSurrogate,
  isSurrogatePair: isSurrogatePair,

  // tests for code point
  isBmpCodePoint: isBmpCodePoint,
  isSupplementaryCodePoint: isSupplementaryCodePoint,

  // manipulations for code point
  charCount: charCount,
  highSurrogate: highSurrogate,
  lowSurrogate: lowSurrogate,
  toChars: toChars,

  // manipulations for string
  codePointAt: codePointAt,
  codePointBefore: codePointBefore,
  codePointCount: codePointCount,
  offsetByCodePoints: offsetByCodePoints,
  forEachCodePoint: forEachCodePoint,

  // converts
  fromCodePoint: fromCodePoint,
  toCodePoint: toCodePoint
};


function isSurrogate(cu) {
  return exports.MIN_SURROGATE <= cu && cu <= exports.MAX_SURROGATE;
}

function isHighSurrogate(cu) {
  return exports.MIN_HIGH_SURROGATE <= cu && cu <= exports.MAX_HIGH_SURROGATE;
}

function isLowSurrogate(cu) {
  return exports.MIN_LOW_SURROGATE <= cu && cu <= exports.MAX_LOW_SURROGATE;
}

function isSurrogatePair(highCu, lowCu) {
  return isHighSurrogate(highCu) && isLowSurrogate(lowCu);
}

function isBmpCodePoint(cp) {
  return cp >>> 16 === 0;
}

function isSupplementaryCodePoint(cp) {
  return exports.MIN_SUPPLEMENTARY_CODE_POINT <= cp &&
      cp <= exports.MAX_CODE_POINT;
}

function charCount(cp) {
  return cp >= exports.MIN_SUPPLEMENTARY_CODE_POINT ? 2 : 1;
}

var highSurrogateOffset = exports.MIN_HIGH_SURROGATE -
                          (exports.MIN_SUPPLEMENTARY_CODE_POINT >>> 10);
function highSurrogate(cp) {
  return (cp >>> 10) + highSurrogateOffset;
}

function lowSurrogate(cp) {
  return (cp & 0x3ff) + exports.MIN_LOW_SURROGATE;
}

function toChars(cp) {
  if (isBmpCodePoint(cp)) {
    return [cp];
  }
  return [ highSurrogate(cp), lowSurrogate(cp) ];
}

function codePointAt(str, index) {
  index = index || 0;
  var cu1 = str.charCodeAt(index);
  if (isHighSurrogate(cu1) && ++index < str.length) {
    var cu2 = str.charCodeAt(index);
    if (isLowSurrogate(cu2)) {
      return toCodePoint(cu1, cu2);
    }
  }
  return cu1;
}

function codePointBefore(str, index) {
  index = index || str.length;
  var cu2 = str.charCodeAt(--index);
  if (isLowSurrogate(cu2) && --index >= 0) {
    var cu1 = str.charCodeAt(index);
    if (isHighSurrogate(cu1)) {
      return toCodePoint(cu1, cu2);
    }
  }
  return cu2;
}

function codePointCount(str, beginIndex, endIndex) {
  if (arguments.length < 2) {
    beginIndex = 0;
  }
  if (arguments.length < 3) {
    endIndex = str.length;
  }
  var n = endIndex - beginIndex;
  for (var i = beginIndex; i < endIndex; ++i) {
    if (isHighSurrogate(str.charCodeAt(i)) && ++i < endIndex &&
        isLowSurrogate(str.charCodeAt(i))) {
      --n;
    }
  }
  return n;
}

function offsetByCodePoints(str, index, codePointOffset) {
  var length = str.length;
  if (index < 0 || index > length) {
    return -1;
  }
  if (codePointOffset >= 0) {
    var i;
    for (i = 0; index < length && i < codePointOffset; ++i) {
      if (isHighSurrogate(str.charCodeAt(index++)) && index < length &&
          isLowSurrogate(str.charCodeAt(index))) {
        ++index;
      }
    }
    if (i < codePointOffset) {
      return -1;
    }
  } else {
    var i;
    for (i = codePointOffset; index > 0 && i < 0; i++) {
      if (isLowSurrogate(str.charCodeAt(--index)) && index > 0 &&
          isHighSurrogate(str.charCodeAt(index-1))) {
        --index;
      }
    }
    if (i < 0) {
      return -1;
    }
  }
  return index;
}

function forEachCodePoint(str, cb, thisArg) {
  for (var i = 0, len = str.length, cp; i < len; i += charCount(cp)) {
    cp = codePointAt(str, i);
    cb.call(thisArg, cp, i, str);
  }
}

function fromCodePoint(cp) {
  var codeUnits = [];
  for (var i = 0, len = arguments.length; i < len; ++i) {
    var cp = arguments[i];
    if (isBmpCodePoint(cp)) {
      codeUnits.push(cp);
    } else {
      codeUnits.push(highSurrogate(cp));
      codeUnits.push(lowSurrogate(cp));
    }
  }
  return String.fromCharCode.apply(null, codeUnits);
}

var toCodePointOffset = exports.MIN_SUPPLEMENTARY_CODE_POINT -
                        (exports.MIN_HIGH_SURROGATE << 10) -
                        exports.MIN_LOW_SURROGATE;
function toCodePoint(highSurrogate, lowSurrogate) {
    return ((highSurrogate << 10) + lowSurrogate) + toCodePointOffset;
}
