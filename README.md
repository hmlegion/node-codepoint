# Utitilities for Unicode code point based on Java API.

In this module, _Unicode code point_ is used for character values in the
range between `0x0000` and `0x10FFFF`.
On the other hand, _Unicode code unit_ is used for 16-bit integer values
that are code units of the UTF-16 encoding. 

## installation

    $ npm install codepoint

## API

```javascript
var codepoint = require('codepoint');
```

### codepoint.MAX_CODE_POINT

The maximum value of a Unicode code point, constant `0x10FFFF`.

### codepoint.MAX_HIGH_SURROGATE

The maximum value of a Unicode high-surrogate code unit in the UTF-16 encoding,
constant `0xDBFF`.

### codepoint.MAX_LOW_SURROGATE

The maximum value of a Unicode low-surrogate code unit in the UTF-16 encoding,
constant `0xDFFF`.

### codepoint.MAX_SURROGATE

The maximum value of a Unicode surrogate code unit in the UTF-16 encoding,
constant `0xDFFF`.

### codepoint.MAX_CODE_UNIT

The maximum value of a Unicode code unit in the UTF-16 encoding,
constant `0xFFFF`.

### codepoint.MIN_CODE_POINT

The minimum value of a Unicode code point, constant `0x0000`.

### codepoint.MIN_CODE_UNIT

The minimum value of a Unicode code unit in the UTF-16 encoding,
constant `0x0000`.

### codepoint.MIN_HIGH_SURROGATE

The minimum value of a Unicode high-surrogate code unit in the UTF-16 encoding,
constant `0xD800`.

### codepoint.MIN_LOW_SURROGATE

The minimum value of a Unicode low-surrogate code unit in the UTF-16 encoding,
constant `0xDC00`.

### codepoint.MIN_SUPPLEMENTARY_CODE_POINT

The minimum value of a Unicode supplementary code point, constant `0x10000`.

### codepoint.MIN_SURROGATE

The minimum value of a Unicode surrogate code unit in the UTF-16 encoding,
constant `0xD800`.

### codepoint.charCount(cp)

Determines the number of Unicode code units needed to represent the specified
Unicode code point. If the specified code point is equal to or greater
than `codepoint.MIN_SUPPLEMENTARY_CODE_POINT`, then the function returns `2`.
Otherwise, the function returns `1`.

 * Arguments
   * `cp`: the Unicode code point to be tested.
 * Returns
   * `2` if the Unicode code point is a valid supplementary code point;
     `1` otherwise.

### codepoint.codePointAt(str [, index])

Returns the code point at the given `index` of the `str`.
If the code unit value at the given `index` in the `str` is in the
high-surrogate range, the following `index` is less than the length
of the `str`, and the code unit value at the following `index` is in
the low-surrogate range, then the supplementary code point corresponding
to this surrogate pair is returned.
Otherwise, the code unit value at the given `index` is returned.

 * Arguments
   * `str`: the string.
   * `index`: the index to the Unicode code units in `str` to be converted.
     Defaults to `0`.
 * Returns
   * the Unicode code point value at the given index.

### codepoint.codePointBefore(str [, index])

Returns the code point preceding the given `index` of the `str`.
If the code unit value at (`index - 1`) in the `str` is in the
low-surrogate range, (`index - 2`) is not negative, and the code unit
value at (`index - 2`) in the `str` is in the high-surrogate range,
then the supplementary code point corresponding to this surrogate pair
is returned.
Otherwise, the code unit value at (`index - 1`) is returned.

 * Arguments
   * `str`: the string.
   * `index`: the index following the code point that should be returned.
     Defaults to `str.length`.
 * Returns
   * the Unicode code point value before the given index.

### codepoint.codePointCount(str [, beginIndex [, endIndex]])

Returns the number of Unicode code points in the text range of the specified
`str`. The text range begins at the specified `beginIndex` and extends to
the Unicode code unit at index `endIndex - 1`.
Thus the length (in code units) of the text range is `endIndex-beginIndex`.
Unpaired surrogates within the text range count as one code point each.

 * Arguments
   * `str`: the string.
   * `beginIndex`: the index to the first code unit of the text range.
     Defaults to `0`.
   * `endIndex`: the index after the last code unit of the text range.
     Defaults to `str.length`.
 * Returns
   * the number of Unicode code points in the specified text range.

### codepoint.forEachCodePoint(str, cb [, thisArgs])

Executes a provided function (`cb`) once for each code point present in
the `str`.

 * Arguments
   * `str`: the string.
   * `cb`: callback function.
   * `thisArg`: `this` value for each invocationof `cb`.
     if it is not provided, `undefined` is used instead.

`cb` is invoked with three arguments:

 * Arguments
   * `cp`: the code point value.
   * `index`: the index to the code point of the `str`.
     (i.e. `cp === codepoint.codePointAt(str, index)`)
   * `str`: the string being traversed.

### codepoint.fromCodePoint([cp, ...])

Returns a string value containing as many code points as the number of
arguments. Each argument specifies one code point of the resulting string,
with the first argument specifing the first code point, and so on,
from left to right.

 * Argument
   * `cp`: Unicode code point.
 * Returns
   * the string.

### codepoint.highSurrogate(cp)

Returns the leading surrogate (a high surrogate code unit) of the surrogate
pair representing the specified supplementary code point in the UTF-16
encoding.
If the specified Unicode code point is not a supplementary code point,
an unspecified code unit is returned.

 * Arguments
   * `cp`: a supplementary code point.
 * Returns
   * the leading surrogate code unit used to represent the character
     in the UTF-16 encoding

### codepoint.isBmpCodePoint(cp)

Determines whether the specified Unicode code point is in the Basic
Multilingual Plane (BMP). Such code points can be represented using a
single code unit.

 * Arguments
   * `cp`: the Unicode code point to be tested.
 * Returns
   * `true` if the specified code point is between `codepoint.MIN_CODE_POINT`
     and `codepoint.MAX_CODE_UNIT` inclusive; `false` otherwise.

### codepoint.isHighSurrogate(cu)

Determines if the given Unicode code unit is a Unicode high-surrogate
code unit (also known as leading-surrogate code unit).

 * Arguments
   * `cu`: the Unicode code unit to be tested.
 * Returns
   * `true` if the code unit is between `codepoint.MIN_HIGH_SURROGATE` and
     `codepoint.MAX_HIGH_SURROGATE` inclusive; `false` otherwise.

### codepoint.isLowSurrogate(cu)

Determines if the given Unicode code unit is a Unicode low-surrogate
code unit (also known as trailing-surrogate code unit).

 * Arguments
   * `cu`: the Unicode code unit to be tested.
 * Returns
   * `true` if the code unit is between `codepoint.MIN_LOW_SURROGATE` and
     `codepoint.MAX_LOW_SURROGATE` inclusive; `false` otherwise.

### codepoint.isSupplementaryCodePoint(cp)

Determines whether the specified Unicode code point is in the supplementary
character range.

 * Arguments
   * `cp`: the Unicode code point to be tested.
 * Returns
   * `true` if the specified code point is between
     `MIN_SUPPLEMENTARY_CODE_POINT` and `MAX_CODE_POINT` inclusive;
     `false` otherwise.

### codepoint.isSurrogate(cu)

Determines if the given Unicode code unit is a Unicode surrogate code unit.

 * Arguments
   * `cu`: the Unicode code unit to be tested.
 * Returns
   * `true` if the code unit is between `codepoint.MIN_SURROGATE` and
     `codepoint.MAX_SURROGATE` inclusive; `false` otherwise.

### codepoint.isSurrogatePair(highCu, lowCu)

Determines whether the specified pair of code units is a valid Unicode
surrogate pair.

 * Arguments
   * `highCu`: the high-surrogate code unit to be tested.
   * `lowCu`: the low-surrogate code unit to be tested.
 * Returns
   * `true` if the specified high and low-surrogate code values represent
     a valid surrogate pair; `false` otherwise.

### codepoint.lowSurrogate(cp)

Returns the trailing surrogate (a low surrogate code unit) of the
surrogate pair representing the specified supplementary code point in the UTF-16 encoding.
If the specified code point is not a supplementary character, an unspecified
code unit is returned.

 * Arguments
   * `cp`: a supplementary code point.
 * Returns
   * the trailing surrogate code unit used to represent the character
     in the UTF-16 encoding

### codepoint.offsetByCodePoints(str, index, codePointOffset)

Returns the index within the given `str` that is offset from the given `index`
by `codePointOffset` code points. Unpaired surrogates within the text range
given by `index` and `codePointOffset` count as one code point each.

 * Arguments
   * `str`: the string.
   * `index`: the index to be offset.
   * `codePointOffset`: the offset in code points.
 * Returns
   * the index within the `str`.
     `-1` if `index` is negative or larger then the length of the `str`,
     or if `codePointOffset` is positive and the subsequence starting
     with `index` has fewer than `codePointOffset` code points, or if
     `codePointOffset` is negative and the subsequence before `index` has
     fewer than the absolute value of `codePointOffset` code points.

### codepoint.toChars(cp)

Converts the specified Unicode code point to its UTF-16 representation
stored in an array of code units. If the specified code point is a BMP
(Basic Multilingual Plane or Plane 0) value, the resulting array has
the same value as codePoint. If the specified code point is a supplementary
code point, the resulting array has the corresponding surrogate pair.

 * Arguments
   * `cp`: a Unicode code point
 * Returns
   * an array of code units having codePoint's UTF-16 representation.

### codepoint.toCodePoint(highSurrogate, lowSurrogate)

Converts the specified surrogate pair to its supplementary code point value.
This method does not validate the specified surrogate pair. The caller must
validate it using `codepoint.isSurrogatePair()` if necessary.

 * Arguments
   * `highSurrogate`: the high-surrogate code unit.
   * `lowSurrogate`: the low-surrogate code unit.
 * Returns
   * the supplementary code point composed from the specified surrogate pair.

# License

node-codeunit is licensed under the
[MIT license](http://www.opensource.org/licenses/mit-license.php).
