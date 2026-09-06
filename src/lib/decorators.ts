/**
 * Prefix & Suffix Decorators for FancyFonts.com
 * Categorized custom wrappers for bios, nicknames, and titles.
 */

export interface Decorator {
  id: string;
  name: string;
  category: 'wings' | 'stars' | 'hearts' | 'brackets' | 'borders' | 'kaomoji';
  prefix: string;
  suffix: string;
  preview: string;
}

export const DECORATORS: Decorator[] = [
  // Wings & Royal
  {
    id: 'wing-royal',
    name: 'Royal Wings',
    category: 'wings',
    prefix: '꧁༺ ',
    suffix: ' ༻꧂',
    preview: '꧁༺ Text ༻꧂',
  },
  {
    id: 'wing-angel',
    name: 'Angel Halo Wings',
    category: 'wings',
    prefix: '༒☬ ',
    suffix: ' ☬༒',
    preview: '༒☬ Text ☬༒',
  },
  {
    id: 'wing-feather',
    name: 'Feather Crest',
    category: 'wings',
    prefix: '༺═ ',
    suffix: ' ═༻',
    preview: '༺═ Text ═༻',
  },
  {
    id: 'wing-crown',
    name: 'Monarch Crown',
    category: 'wings',
    prefix: '👑 ♛ ',
    suffix: ' ♛ 👑',
    preview: '👑 ♛ Text ♛ 👑',
  },
  {
    id: 'sword-shield',
    name: 'Gladiator Swords',
    category: 'wings',
    prefix: '⚔️ 彡 ',
    suffix: ' 彡 ⚔️',
    preview: '⚔️ 彡 Text 彡 ⚔️',
  },

  // Stars & Sparkles
  {
    id: 'star-magic',
    name: 'Magic Stardust',
    category: 'stars',
    prefix: '✧･ﾟ: * ',
    suffix: ' *:･ﾟ✧',
    preview: '✧･ﾟ: * Text *:･ﾟ✧',
  },
  {
    id: 'star-shooting',
    name: 'Shooting Star',
    category: 'stars',
    prefix: '★彡 ',
    suffix: ' 彡★',
    preview: '★彡 Text 彡★',
  },
  {
    id: 'star-celestial',
    name: 'Celestial Twilight',
    category: 'stars',
    prefix: '⋆｡°✩ ',
    suffix: ' ✩°｡⋆',
    preview: '⋆｡°✩ Text ✩°｡⋆',
  },
  {
    id: 'star-four-point',
    name: 'Four-Point Sparkles',
    category: 'stars',
    prefix: '✦ ',
    suffix: ' ✦',
    preview: '✦ Text ✦',
  },
  {
    id: 'star-glimmer',
    name: 'Night Sky Glimmer',
    category: 'stars',
    prefix: '☽∷ ',
    suffix: ' ∷☾',
    preview: '☽∷ Text ∷☾',
  },

  // Hearts & Cute
  {
    id: 'heart-simple',
    name: 'Pure Love Heart',
    category: 'hearts',
    prefix: '♡ ',
    suffix: ' ♡',
    preview: '♡ Text ♡',
  },
  {
    id: 'heart-sparkle',
    name: 'Sparkling Hearts',
    category: 'hearts',
    prefix: '💖 ✨ ',
    suffix: ' ✨ 💖',
    preview: '💖 ✨ Text ✨ 💖',
  },
  {
    id: 'heart-arrows',
    name: 'Cupid Arrow Heart',
    category: 'hearts',
    prefix: '💘 ༻ ',
    suffix: ' ༺ 💘',
    preview: '💘 ༻ Text ༺ 💘',
  },
  {
    id: 'cherry-petal',
    name: 'Blossom Petals',
    category: 'hearts',
    prefix: '🌸 ﾟ.*･｡ﾟ ',
    suffix: ' ﾟ.*･｡ﾟ 🌸',
    preview: '🌸 ﾟ.*･｡ﾟ Text ﾟ.*･｡ﾟ 🌸',
  },

  // Brackets & Frames
  {
    id: 'bracket-lenticular',
    name: 'Lenticular Brackets',
    category: 'brackets',
    prefix: '【 ',
    suffix: ' 】',
    preview: '【 Text 】',
  },
  {
    id: 'bracket-corner',
    name: 'Quotation Corners',
    category: 'brackets',
    prefix: '『 ',
    suffix: ' 』',
    preview: '『 Text 』',
  },
  {
    id: 'bracket-white-square',
    name: 'White Square Frame',
    category: 'brackets',
    prefix: '⟦ ',
    suffix: ' ⟧',
    preview: '⟦ Text ⟧',
  },
  {
    id: 'bracket-angle',
    name: 'Double Angle Ornate',
    category: 'brackets',
    prefix: '《 ',
    suffix: ' 》',
    preview: '《 Text 》',
  },
  {
    id: 'bracket-shield',
    name: 'Cyber Braces',
    category: 'brackets',
    prefix: '⦅ ',
    suffix: ' ⦆',
    preview: '⦅ Text ⦆',
  },

  // Borders & Cyber
  {
    id: 'border-pixel-blocks',
    name: 'Pixel Blocks',
    category: 'borders',
    prefix: '░▒▓█ ',
    suffix: ' █▓▒░',
    preview: '░▒▓█ Text █▓▒░',
  },
  {
    id: 'border-checker',
    name: 'Checkered Square',
    category: 'borders',
    prefix: '■□■ ',
    suffix: ' ■□■',
    preview: '■□■ Text ■□■',
  },
  {
    id: 'border-vintage-line',
    name: 'Vintage Double Line',
    category: 'borders',
    prefix: '━━━━━ ',
    suffix: ' ━━━━━',
    preview: '━━━━━ Text ━━━━━',
  },
  {
    id: 'border-triangles',
    name: 'Geometric Triangles',
    category: 'borders',
    prefix: '▲▼▲ ',
    suffix: ' ▲▼▲',
    preview: '▲▼▲ Text ▲▼▲',
  },

  // Kaomoji & Facial Emoticons
  {
    id: 'kaomoji-joy',
    name: 'Joyful Cheer',
    category: 'kaomoji',
    prefix: '(✿◠‿◠) ',
    suffix: ' (◡‿◡✿)',
    preview: '(✿◠‿◠) Text (◡‿◡✿)',
  },
  {
    id: 'kaomoji-bear',
    name: 'Cute Bear Hug',
    category: 'kaomoji',
    prefix: 'ʕ•́ᴥ•̀ʔっ ',
    suffix: ' ⊂(・▽・⊂)',
    preview: 'ʕ•́ᴥ•̀ʔっ Text ⊂(・▽・⊂)',
  },
  {
    id: 'kaomoji-sparkle-eyes',
    name: 'Glistening Eyes',
    category: 'kaomoji',
    prefix: '(◕‿◕)✧ ',
    suffix: ' ✧(◕‿◕)',
    preview: '(◕‿◕)✧ Text ✧(◕‿◕)',
  },
  {
    id: 'kaomoji-flex',
    name: 'Gamer Flex',
    category: 'kaomoji',
    prefix: 'ᕙ(⇀‸↼‶)ᕗ ',
    suffix: ' ᕙ(⇀‸↼‶)ᕗ',
    preview: 'ᕙ(⇀‸↼‶)ᕗ Text ᕙ(⇀‸↼‶)ᕗ',
  },
];
