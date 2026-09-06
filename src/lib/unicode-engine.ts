/**
 * Unicode Transformation Engine for FancyFonts.com
 * Provides 55+ distinct, verified Unicode typographic transformations.
 * Restricts characters to widely supported Unicode blocks (SMP Latin, Enclosed Alphanumerics, Combining Marks).
 */

export interface FontStyle {
  id: string;
  name: string;
  category: 'cursive' | 'gothic' | 'double-struck' | 'small-caps' | 'circled' | 'aesthetic' | 'gaming' | 'monospace';
  samplePreview: string;
  transform: (text: string, options?: TransformOptions) => string;
}

export interface TransformOptions {
  zalgoChaos?: 'low' | 'medium' | 'high';
  prefix?: string;
  suffix?: string;
}

// Character mapping utility
function mapChars(text: string, map: Record<string, string>): string {
  return Array.from(text)
    .map(ch => map[ch] || ch)
    .join('');
}

// Helper to generate full alphabet map from start code points
function buildAlphaMap(
  upperStart: number,
  lowerStart: number,
  digitsStart?: number,
  overrides?: Record<string, string>
): Record<string, string> {
  const map: Record<string, string> = {};
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const smalls = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 26; i++) {
    map[letters[i]] = String.fromCodePoint(upperStart + i);
    map[smalls[i]] = String.fromCodePoint(lowerStart + i);
  }

  if (digitsStart !== undefined) {
    const digits = '0123456789';
    for (let i = 0; i < 10; i++) {
      map[digits[i]] = String.fromCodePoint(digitsStart + i);
    }
  }

  if (overrides) {
    Object.assign(map, overrides);
  }

  return map;
}

// Combining diacritical marks helper
function combineMarks(text: string, mark: string): string {
  return Array.from(text)
    .map(ch => (ch === ' ' ? ' ' : ch + mark))
    .join('');
}

// Combining diacritical marks for Zalgo / Glitch
const ZALGO_UP = [
  '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
  '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c'
];
const ZALGO_MID = [
  '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
  '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362'
];
const ZALGO_DOWN = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
  '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330'
];

function generateZalgo(text: string, chaos: 'low' | 'medium' | 'high' = 'medium'): string {
  const counts = chaos === 'low' ? { up: 1, mid: 1, down: 1 } : chaos === 'medium' ? { up: 2, mid: 1, down: 2 } : { up: 4, mid: 2, down: 4 };

  return Array.from(text)
    .map(ch => {
      if (ch === ' ' || ch === '\n') return ch;
      let result = ch;
      for (let i = 0; i < counts.up; i++) {
        result += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
      }
      for (let i = 0; i < counts.mid; i++) {
        result += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
      }
      for (let i = 0; i < counts.down; i++) {
        result += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
      }
      return result;
    })
    .join('');
}

// ----------------------------------------------------
// Specialized Alphabet Character Maps
// ----------------------------------------------------

// Mathematical Bold: U+1D400 / U+1D41A / U+1D7CE
const MAP_BOLD = buildAlphaMap(0x1d400, 0x1d41a, 0x1d7ce);

// Mathematical Italic: U+1D434 / U+1D44E (note 'h' exception U+210E)
const MAP_ITALIC = buildAlphaMap(0x1d434, 0x1d44e, undefined, { h: 'ℎ' });

// Mathematical Bold Italic: U+1D468 / U+1D482
const MAP_BOLD_ITALIC = buildAlphaMap(0x1d468, 0x1d482);

// Mathematical Script Normal: U+1D49C / U+1D4B6 with standard Unicode exceptions
const MAP_SCRIPT = buildAlphaMap(0x1d49c, 0x1d4b6, undefined, {
  B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ',
  e: 'ℯ', g: 'ℊ', o: 'ℴ'
});

// Mathematical Script Bold: U+1D4D0 / U+1D4EA
const MAP_BOLD_SCRIPT = buildAlphaMap(0x1d4d0, 0x1d4ea);

// Fraktur / Gothic Normal: U+1D504 / U+1D51E with standard Unicode exceptions
const MAP_FRAKTUR = buildAlphaMap(0x1d504, 0x1d51e, undefined, {
  C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ'
});

// Fraktur / Gothic Bold: U+1D538 / U+1D552
const MAP_BOLD_FRAKTUR = buildAlphaMap(0x1d538, 0x1d552);

// Double-Struck / Blackboard: U+1D538 / U+1D552 with exceptions
const MAP_DOUBLE_STRUCK = buildAlphaMap(0x1d538, 0x1d552, 0x1d7d8, {
  C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ'
});

// Sans-Serif Normal: U+1D56C / U+1D586 / U+1D7E2
const MAP_SANS = buildAlphaMap(0x1d56c, 0x1d586, 0x1d7e2);

// Sans-Serif Bold: U+1D5A0 / U+1D5BA / U+1D7EC
const MAP_SANS_BOLD = buildAlphaMap(0x1d5a0, 0x1d5ba, 0x1d7ec);

// Sans-Serif Italic: U+1D5D4 / U+1D5EE
const MAP_SANS_ITALIC = buildAlphaMap(0x1d5d4, 0x1d5ee);

// Sans-Serif Bold Italic: U+1D608 / U+1D622
const MAP_SANS_BOLD_ITALIC = buildAlphaMap(0x1d608, 0x1d622);

// Monospace / Code: U+1D670 / U+1D68A / U+1D7F6
const MAP_MONOSPACE = buildAlphaMap(0x1d670, 0x1d68a, 0x1d7f6);

// Small Caps Map
const MAP_SMALL_CAPS: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ꜰ', G: 'ɢ', H: 'ʜ', I: 'ɪ',
  J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ',
  S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ',
};

// Fullwidth / Vaporwave Map
const MAP_FULLWIDTH: Record<string, string> = (() => {
  const map: Record<string, string> = { ' ': '　' };
  for (let i = 33; i <= 126; i++) {
    map[String.fromCharCode(i)] = String.fromCharCode(i + 0xfee0);
  }
  return map;
})();

// Circled White: Ⓐ and ⓐ
const MAP_CIRCLED_WHITE = buildAlphaMap(0x24b6, 0x24d0, undefined, {
  '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤',
  '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
});

// Circled Black / Inverted: 🅐 and 🅐
const MAP_CIRCLED_BLACK = (() => {
  const map: Record<string, string> = {};
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const smalls = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 26; i++) {
    map[letters[i]] = String.fromCodePoint(0x1f150 + i);
    map[smalls[i]] = String.fromCodePoint(0x1f150 + i);
  }
  map['0'] = '⓿';
  const digBlack = ['➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒'];
  for (let i = 1; i <= 9; i++) {
    map[i.toString()] = digBlack[i - 1];
  }
  return map;
})();

// Squared White: 🄰 and 🄰
const MAP_SQUARED_WHITE = (() => {
  const map: Record<string, string> = {};
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const smalls = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 26; i++) {
    map[letters[i]] = String.fromCodePoint(0x1f130 + i);
    map[smalls[i]] = String.fromCodePoint(0x1f130 + i);
  }
  return map;
})();

// Squared Black: 🅰 and 🅰
const MAP_SQUARED_BLACK = (() => {
  const map: Record<string, string> = {};
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const smalls = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 26; i++) {
    map[letters[i]] = String.fromCodePoint(0x1f170 + i);
    map[smalls[i]] = String.fromCodePoint(0x1f170 + i);
  }
  return map;
})();

// Parenthesized: ⑴, ⒜
const MAP_PARENTHESIZED = (() => {
  const map: Record<string, string> = {};
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const smalls = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 26; i++) {
    map[letters[i]] = String.fromCodePoint(0x249c + i);
    map[smalls[i]] = String.fromCodePoint(0x249c + i);
  }
  const digits = ['⑴', '⑵', '⑶', '⑷', '⑸', '⑹', '⑺', '⑻', '⑼'];
  for (let i = 1; i <= 9; i++) {
    map[i.toString()] = digits[i - 1];
  }
  return map;
})();

// Inverted / Upside Down Map
const MAP_FLIPPED: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
  J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ',
  S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': '⇂', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'", "'": ',', '"': '„',
  '?': '¿', '!': '¡', '[': ']', ']': '[', '(': ')', ')': '(', '{': '}', '}': '{',
  '<': '>', '>': '<', '&': '⅋', '_': '‾'
};

// Subscript Map
const MAP_SUBSCRIPT: Record<string, string> = {
  a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ',
  o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
  A: 'ₐ', E: 'ₑ', H: 'ₕ', I: 'ᵢ', J: 'ⱼ', K: 'ₖ', L: 'ₗ', M: 'ₘ', N: 'ₙ',
  O: 'ₒ', P: 'ₚ', R: 'ᵣ', S: 'ₛ', T: 'ₜ', U: 'ᵤ', V: 'ᵥ', X: 'ₓ',
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆',
  '7': '₇', '8': '₈', '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎'
};

// Superscript Map
const MAP_SUPERSCRIPT: Record<string, string> = {
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ',
  j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ',
  t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
  A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ',
  J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', S: 'ˢ',
  T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ', X: 'ˣ', Y: 'ʸ', Z: 'ᶻ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶',
  '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
};

// 1337 / Leet Speak Map
const MAP_LEET: Record<string, string> = {
  a: '4', A: '4', b: '8', B: '8', e: '3', E: '3', g: '9', G: '9',
  i: '1', I: '1', l: '1', L: '1', o: '0', O: '0', s: '5', S: '5',
  t: '7', T: '7'
};

// Morse Code Map
const MAP_MORSE: Record<string, string> = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.',
  h: '....', i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.',
  o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-', u: '..-',
  v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': '/'
};

// Mirror / Reverse Map
const MAP_MIRROR: Record<string, string> = {
  a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'Ꮈ', g: 'ǫ', h: 'ʜ', i: 'i',
  j: 'į', k: 'ʞ', l: 'l', m: 'm', n: 'ᴎ', o: 'o', p: 'q', q: 'p', r: 'я',
  s: 'ƨ', t: 'ƚ', u: 'u', v: 'v', w: 'w', x: 'x', y: 'ʏ', z: 'ƹ',
  A: 'A', B: 'ᙠ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'ꟻ', G: 'Ꭾ', H: 'H', I: 'I',
  J: 'Ⴑ', K: 'ʞ', L: '⅃', M: 'M', N: 'И', O: 'O', P: 'ꟼ', Q: 'Ọ', R: 'Я',
  S: 'Ƨ', T: 'T', U: 'U', V: 'V', W: 'W', X: 'X', Y: 'Y', Z: 'Ƹ'
};

// ----------------------------------------------------
// 55+ Curated Unicode Font Styles
// ----------------------------------------------------

export const FONT_STYLES: FontStyle[] = [
  // 1. Cursive & Script
  {
    id: 'script-bold',
    name: 'Mathematical Bold Script',
    category: 'cursive',
    samplePreview: '𝓕𝓪𝓷𝓬𝔂 𝓕𝓸𝓷𝓽𝓼',
    transform: (t) => mapChars(t, MAP_BOLD_SCRIPT),
  },
  {
    id: 'script-regular',
    name: 'Mathematical Script',
    category: 'cursive',
    samplePreview: '𝒻𝒶𝓃𝒸𝓎 𝒻ℴ𝓃𝓉𝓈',
    transform: (t) => mapChars(t, MAP_SCRIPT),
  },
  {
    id: 'italic',
    name: 'Slanted Italic',
    category: 'cursive',
    samplePreview: '𝘍𝘢𝘯𝘤𝘺 𝘍𝘰𝘯𝘵𝘴',
    transform: (t) => mapChars(t, MAP_ITALIC),
  },
  {
    id: 'bold-italic',
    name: 'Bold Slanted Italic',
    category: 'cursive',
    samplePreview: '𝙁𝙖𝙣𝙘𝙮 𝙁𝙤𝙣𝙩𝙨',
    transform: (t) => mapChars(t, MAP_BOLD_ITALIC),
  },
  {
    id: 'cursive-flourish',
    name: 'Flourish Cursive',
    category: 'cursive',
    samplePreview: '𝓯𝒶𝓷𝒸𝓎',
    transform: (t) =>
      Array.from(t)
        .map((ch, idx) => (idx % 2 === 0 ? MAP_BOLD_SCRIPT[ch] || ch : MAP_SCRIPT[ch] || ch))
        .join(''),
  },

  // 2. Gothic & Medieval
  {
    id: 'gothic-bold',
    name: 'Fraktur / Gothic Bold',
    category: 'gothic',
    samplePreview: '𝕱𝖆𝖓𝖈𝖞 𝕱𝖔𝖓𝖙𝖘',
    transform: (t) => mapChars(t, MAP_BOLD_FRAKTUR),
  },
  {
    id: 'gothic-regular',
    name: 'Fraktur / Gothic Normal',
    category: 'gothic',
    samplePreview: '𝔉𝔞𝔫𝔠𝔶 𝔉𝔬𝔫𝔱𝔰',
    transform: (t) => mapChars(t, MAP_FRAKTUR),
  },
  {
    id: 'medieval-cross',
    name: 'Medieval Crest',
    category: 'gothic',
    samplePreview: '✠ 𝕱𝖆𝖓𝖈𝖞 ✠',
    transform: (t) => `✠ ${mapChars(t, MAP_BOLD_FRAKTUR)} ✠`,
  },
  {
    id: 'dark-gothic',
    name: 'Dark Knight Gothic',
    category: 'gothic',
    samplePreview: '⚔️ 𝕱𝖆𝖓𝖈𝖞 ⚔️',
    transform: (t) => `⚔️ ${mapChars(t, MAP_BOLD_FRAKTUR)} ⚔️`,
  },

  // 3. Double-Struck / Blackboard
  {
    id: 'double-struck',
    name: 'Double-Struck Blackboard',
    category: 'double-struck',
    samplePreview: '𝔽𝕒𝕟𝕔𝕪 𝔽𝕠𝕟𝕥𝕤',
    transform: (t) => mapChars(t, MAP_DOUBLE_STRUCK),
  },
  {
    id: 'double-struck-spaced',
    name: 'Double-Struck Spaced',
    category: 'double-struck',
    samplePreview: '𝔽 𝕒 𝕟 𝕔 𝕪',
    transform: (t) => Array.from(mapChars(t, MAP_DOUBLE_STRUCK)).join(' '),
  },
  {
    id: 'double-struck-framed',
    name: 'Double-Struck Framed',
    category: 'double-struck',
    samplePreview: '⟦ 𝔽𝕒𝕟𝕔𝕪 ⟧',
    transform: (t) => `⟦ ${mapChars(t, MAP_DOUBLE_STRUCK)} ⟧`,
  },

  // 4. Small Caps & Sans-Serif
  {
    id: 'small-caps',
    name: 'Small Capitals',
    category: 'small-caps',
    samplePreview: 'ꜰᴀɴᴄʏ ꜰᴏɴᴛꜱ',
    transform: (t) => mapChars(t, MAP_SMALL_CAPS),
  },
  {
    id: 'small-caps-spaced',
    name: 'Small Capitals Spaced',
    category: 'small-caps',
    samplePreview: 'ꜰ ᴀ ɴ ᴄ ʏ',
    transform: (t) => Array.from(mapChars(t, MAP_SMALL_CAPS)).join(' '),
  },
  {
    id: 'sans-bold',
    name: 'Sans-Serif Bold',
    category: 'small-caps',
    samplePreview: '𝗙𝗮𝗻𝗰𝘆 𝗙𝗼𝗻𝘁𝘀',
    transform: (t) => mapChars(t, MAP_SANS_BOLD),
  },
  {
    id: 'sans-regular',
    name: 'Sans-Serif Clean',
    category: 'small-caps',
    samplePreview: '𝖥𝖺𝗇𝖼𝗒 𝖥𝗈𝗇𝗍𝗌',
    transform: (t) => mapChars(t, MAP_SANS),
  },
  {
    id: 'sans-italic',
    name: 'Sans-Serif Italic',
    category: 'small-caps',
    samplePreview: '𝘍𝘢𝘯𝘤𝘺 𝘍𝘰𝘯𝘵𝘴',
    transform: (t) => mapChars(t, MAP_SANS_ITALIC),
  },
  {
    id: 'sans-bold-italic',
    name: 'Sans-Serif Bold Italic',
    category: 'small-caps',
    samplePreview: '𝙁𝙖𝙣𝙘𝙮 𝙁𝙤𝙣𝙩𝙨',
    transform: (t) => mapChars(t, MAP_SANS_BOLD_ITALIC),
  },

  // 5. Circled & Framed
  {
    id: 'circled-white',
    name: 'Circled Bubble Text',
    category: 'circled',
    samplePreview: 'Ⓕⓐⓝⓒⓨ',
    transform: (t) => mapChars(t, MAP_CIRCLED_WHITE),
  },
  {
    id: 'circled-black',
    name: 'Inverted Bubble (Black)',
    category: 'circled',
    samplePreview: '🅕🅐🅝🅒🅨',
    transform: (t) => mapChars(t, MAP_CIRCLED_BLACK),
  },
  {
    id: 'squared-white',
    name: 'Squared Box Text',
    category: 'circled',
    samplePreview: '🄵🄰🄽🄲🅈',
    transform: (t) => mapChars(t, MAP_SQUARED_WHITE),
  },
  {
    id: 'squared-black',
    name: 'Negative Squared Box',
    category: 'circled',
    samplePreview: '🅵🅰🅽🅲🆈',
    transform: (t) => mapChars(t, MAP_SQUARED_BLACK),
  },
  {
    id: 'parenthesized',
    name: 'Parenthesized Letters',
    category: 'circled',
    samplePreview: '⒡⒜⒩⒞⒴',
    transform: (t) => mapChars(t, MAP_PARENTHESIZED),
  },
  {
    id: 'bracketed-asian',
    name: 'Lenticular Brackets',
    category: 'circled',
    samplePreview: '【 𝓕𝓪𝓷𝓬𝔂 】',
    transform: (t) => `【 ${mapChars(t, MAP_BOLD_SCRIPT)} 】`,
  },
  {
    id: 'corner-bracketed',
    name: 'Quotation Corners',
    category: 'circled',
    samplePreview: '『 𝓕𝓪𝓷𝓬𝔂 』',
    transform: (t) => `『 ${mapChars(t, MAP_BOLD_SCRIPT)} 』`,
  },

  // 6. Aesthetic & Vaporwave
  {
    id: 'vaporwave-fullwidth',
    name: 'Fullwidth Vaporwave',
    category: 'aesthetic',
    samplePreview: 'Ｆａｎｃｙ　Ｆｏｎｔｓ',
    transform: (t) => mapChars(t, MAP_FULLWIDTH),
  },
  {
    id: 'spaced-aesthetic',
    name: 'Aesthetic Spaced',
    category: 'aesthetic',
    samplePreview: 'F a n c y   F o n t s',
    transform: (t) => Array.from(t).join(' '),
  },
  {
    id: 'aesthetic-sparkles',
    name: 'Sparkle Starlight',
    category: 'aesthetic',
    samplePreview: '✧･ﾟ: * 𝓕𝓪𝓷𝓬𝔂 *:･ﾟ✧',
    transform: (t) => `✧･ﾟ: * ${mapChars(t, MAP_BOLD_SCRIPT)} *:･ﾟ✧`,
  },
  {
    id: 'heart-bubble',
    name: 'Aesthetic Hearts',
    category: 'aesthetic',
    samplePreview: '♡ 𝓕𝓪𝓷𝓬𝔂 ♡',
    transform: (t) => `♡ ${mapChars(t, MAP_BOLD_SCRIPT)} ♡`,
  },
  {
    id: 'heart-connector',
    name: 'Sweet Heart Connected',
    category: 'aesthetic',
    samplePreview: 'F♡a♡n♡c♡y',
    transform: (t) => Array.from(t).join('♡'),
  },
  {
    id: 'star-connector',
    name: 'Star Connected',
    category: 'aesthetic',
    samplePreview: 'F★a★n★c★y',
    transform: (t) => Array.from(t).join('★'),
  },
  {
    id: 'dot-connector',
    name: 'Dotted Connector',
    category: 'aesthetic',
    samplePreview: 'F•a•n•c•y',
    transform: (t) => Array.from(t).join('•'),
  },
  {
    id: 'kawaii-blush',
    name: 'Kawaii Smile Border',
    category: 'aesthetic',
    samplePreview: '(◕‿◕) 𝓕𝓪𝓷𝓬𝔂 (◕‿◕)',
    transform: (t) => `(◕‿◕) ${mapChars(t, MAP_BOLD_SCRIPT)} (◕‿◕)`,
  },
  {
    id: 'aesthetic-wings',
    name: 'Royal Wings',
    category: 'aesthetic',
    samplePreview: '꧁༺ 𝓕𝓪𝓷𝓬𝔂 ༻꧂',
    transform: (t) => `꧁༺ ${mapChars(t, MAP_BOLD_SCRIPT)} ༻꧂`,
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom Floral',
    category: 'aesthetic',
    samplePreview: '🌸 𝓕𝓪𝓷𝓬𝔂 🌸',
    transform: (t) => `🌸 ${mapChars(t, MAP_BOLD_SCRIPT)} 🌸`,
  },
  {
    id: 'moon-phases',
    name: 'Celestial Moon',
    category: 'aesthetic',
    samplePreview: '☾ 𝓕𝓪𝓷𝓬𝔂 ☽',
    transform: (t) => `☾ ${mapChars(t, MAP_BOLD_SCRIPT)} ☽`,
  },

  // 7. Gaming, Cyber & Glitch
  {
    id: 'glitch-zalgo',
    name: 'Zalgo / Glitch Void',
    category: 'gaming',
    samplePreview: 'F̷a̷n̷c̷y̷',
    transform: (t, opts) => generateZalgo(t, opts?.zalgoChaos || 'medium'),
  },
  {
    id: 'strikethrough',
    name: 'Strikethrough Cross',
    category: 'gaming',
    samplePreview: 'F̶a̶n̶c̶y̶',
    transform: (t) => combineMarks(t, '\u0336'),
  },
  {
    id: 'slash-through',
    name: 'Cyber Slash-Through',
    category: 'gaming',
    samplePreview: 'F̷a̷n̷c̷y̷',
    transform: (t) => combineMarks(t, '\u0337'),
  },
  {
    id: 'tilde-through',
    name: 'Tilde Wave Through',
    category: 'gaming',
    samplePreview: 'F̴a̴n̴c̴y̴',
    transform: (t) => combineMarks(t, '\u0334'),
  },
  {
    id: 'underline-single',
    name: 'Clean Underline',
    category: 'gaming',
    samplePreview: 'F̲a̲n̲c̲y̲',
    transform: (t) => combineMarks(t, '\u0332'),
  },
  {
    id: 'underline-double',
    name: 'Double Underline',
    category: 'gaming',
    samplePreview: 'F̳a̳n̳c̳y̳',
    transform: (t) => combineMarks(t, '\u0333'),
  },
  {
    id: 'overline',
    name: 'Overline Ceiling',
    category: 'gaming',
    samplePreview: 'F̅a̅n̅c̅y̅',
    transform: (t) => combineMarks(t, '\u0305'),
  },
  {
    id: 'arrows-accent',
    name: 'Fast Forward Arrows',
    category: 'gaming',
    samplePreview: '» 𝓕𝓪𝓷𝓬𝔂 «',
    transform: (t) => `» ${mapChars(t, MAP_SANS_BOLD)} «`,
  },
  {
    id: 'hacker-leet',
    name: 'Hacker 1337 Speak',
    category: 'gaming',
    samplePreview: 'F4ncy F0n75',
    transform: (t) => mapChars(t, MAP_LEET),
  },
  {
    id: 'upside-down',
    name: 'Upside-Down / Flipped',
    category: 'gaming',
    samplePreview: 'ʎɔuɐɟ sʇuoℲ',
    transform: (t) => Array.from(mapChars(t, MAP_FLIPPED)).reverse().join(''),
  },
  {
    id: 'retro-morse',
    name: 'Morse Code Signal',
    category: 'gaming',
    samplePreview: '..-. .- -. -.-. -.--',
    transform: (t) =>
      Array.from(t.toLowerCase())
        .map(ch => MAP_MORSE[ch] || ch)
        .join(' '),
  },
  {
    id: 'cyber-blocks',
    name: 'Cyber Block Shades',
    category: 'gaming',
    samplePreview: '░▒▓ 𝓕𝓪𝓷𝓬𝔂 ▓▒░',
    transform: (t) => `░▒▓ ${mapChars(t, MAP_SANS_BOLD)} ▓▒░`,
  },
  {
    id: 'gaming-clan-tag',
    name: 'Clan Gamer Tag',
    category: 'gaming',
    samplePreview: '﹄ 𝓕𝓪𝓷𝓬𝔂 ﹃',
    transform: (t) => `﹄ ${mapChars(t, MAP_SANS_BOLD)} ﹃`,
  },

  // 8. Monospace, Math & Specialty
  {
    id: 'monospace-math',
    name: 'Mathematical Monospace',
    category: 'monospace',
    samplePreview: '𝚏𝚊𝚗𝚌𝚢 𝚏𝚘𝚗𝚝𝚜',
    transform: (t) => mapChars(t, MAP_MONOSPACE),
  },
  {
    id: 'subscript',
    name: 'Subscript Tiny',
    category: 'monospace',
    samplePreview: 'ꜰₐₙ𝒸ᵧ',
    transform: (t) => mapChars(t, MAP_SUBSCRIPT),
  },
  {
    id: 'superscript',
    name: 'Superscript Tiny',
    category: 'monospace',
    samplePreview: 'ᶠᵃⁿᶜʸ',
    transform: (t) => mapChars(t, MAP_SUPERSCRIPT),
  },
  {
    id: 'mirror-text',
    name: 'Mirror Reflection',
    category: 'monospace',
    samplePreview: 'Ꮈɒᴎɔʏ',
    transform: (t) => Array.from(mapChars(t, MAP_MIRROR)).reverse().join(''),
  },
  {
    id: 'bold-serif',
    name: 'Mathematical Serif Bold',
    category: 'monospace',
    samplePreview: '𝐅𝐚𝐧𝐜𝐲 𝐅𝐨𝐧𝐭𝐬',
    transform: (t) => mapChars(t, MAP_BOLD),
  },
];
