// A small tokenizer for the handful of languages the site shows. It returns
// plain token objects that components render as spans, so no HTML is injected.

export type Language = 'python' | 'bash' | 'toml' | 'env' | 'markdown' | 'text'

export type Token = { text: string; type?: string }

const PYTHON_KEYWORDS = new Set([
  'from',
  'import',
  'def',
  'class',
  'return',
  'with',
  'as',
  'yield',
  'if',
  'else',
  'elif',
  'or',
  'and',
  'not',
  'in',
  'is',
  'for',
  'while',
  'try',
  'except',
  'raise',
  'async',
  'await',
  'lambda',
  'pass',
  'None',
  'True',
  'False',
])

const PYTHON_BUILTINS = new Set(['str', 'int', 'bool', 'dict', 'list', 'self', 'print'])

const PYTHON =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[\w.]+)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g

const BASH = /(#[^\n]*)|("(?:\\.|[^"\\])*"|'[^']*')|(\s--?[\w-]+)|(^|[\n;&|]\s*|&&\s*)([\w./-]+)/g

const TOML = /(#[^\n]*)|(^\[[^\]\n]+\])|("(?:\\.|[^"\\])*")|(^[\w.-]+(?=\s*=))|(\b\d+\b)/gm

const ENV = /(#[^\n]*)|(^[A-Z_][A-Z0-9_]*(?==))/gm

const MARKDOWN = /(^#{1,6} [^\n]*)|(`[^`\n]+`)/gm

function scan(
  code: string,
  pattern: RegExp,
  classify: (match: RegExpExecArray, push: (text: string, type?: string) => void) => void,
): Token[] {
  const tokens: Token[] = []
  const push = (text: string, type?: string) => {
    if (text) tokens.push({ text, type })
  }
  let last = 0
  pattern.lastIndex = 0
  for (let match = pattern.exec(code); match; match = pattern.exec(code)) {
    if (match[0] === '') {
      pattern.lastIndex++
      continue
    }
    push(code.slice(last, match.index))
    classify(match, push)
    last = match.index + match[0].length
  }
  push(code.slice(last))
  return tokens
}

function python(code: string): Token[] {
  let previousWord = ''
  return scan(code, PYTHON, (m, push) => {
    if (m[1]) push(m[1], 'comment')
    else if (m[2]) push(m[2], 'string')
    else if (m[3]) push(m[3], 'decorator')
    else if (m[4]) push(m[4], 'number')
    else if (m[5]) {
      const word = m[5]
      let type: string | undefined
      if (PYTHON_KEYWORDS.has(word)) type = 'keyword'
      else if (previousWord === 'def') type = 'function'
      else if (previousWord === 'class' || /^[A-Z][a-z]\w*$/.test(word)) type = 'class'
      else if (PYTHON_BUILTINS.has(word)) type = 'builtin'
      push(word, type)
      previousWord = word
      return
    }
    previousWord = ''
  })
}

function bash(code: string): Token[] {
  return scan(code, BASH, (m, push) => {
    if (m[1]) push(m[1], 'comment')
    else if (m[2]) push(m[2], 'string')
    else if (m[3]) push(m[3], 'flag')
    else {
      push(m[4])
      push(m[5], 'command')
    }
  })
}

function toml(code: string): Token[] {
  return scan(code, TOML, (m, push) => {
    if (m[1]) push(m[1], 'comment')
    else if (m[2]) push(m[2], 'section')
    else if (m[3]) push(m[3], 'string')
    else if (m[4]) push(m[4], 'key')
    else if (m[5]) push(m[5], 'number')
  })
}

function env(code: string): Token[] {
  return scan(code, ENV, (m, push) => {
    if (m[1]) push(m[1], 'comment')
    else push(m[2], 'key')
  })
}

function markdown(code: string): Token[] {
  return scan(code, MARKDOWN, (m, push) => {
    if (m[1]) push(m[1], 'heading')
    else push(m[2], 'string')
  })
}

export function highlight(code: string, language: Language): Token[] {
  switch (language) {
    case 'python':
      return python(code)
    case 'bash':
      return bash(code)
    case 'toml':
      return toml(code)
    case 'env':
      return env(code)
    case 'markdown':
      return markdown(code)
    default:
      return [{ text: code }]
  }
}

export function languageForFile(path: string): Language {
  if (path.endsWith('.py')) return 'python'
  if (path.endsWith('.toml')) return 'toml'
  if (path.endsWith('.md')) return 'markdown'
  if (path.startsWith('.env') || path.endsWith('/.env')) return 'env'
  if (path.endsWith('.gitignore')) return 'env'
  return 'text'
}
