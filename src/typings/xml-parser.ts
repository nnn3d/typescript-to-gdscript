/**
 * Godot XML class documentation parser.
 * Parses Godot's XML class reference files into structured data.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import type { GodotEnumInfo } from './godot-registry.ts';

// ─── XML Data Types ──────────────────────────────────────────

export interface GodotClassXml {
  name: string;
  inherits?: string;
  briefDescription?: string;
  description?: string;
  methods: GodotMethodXml[];
  constructors: GodotMethodXml[];
  properties: GodotPropertyXml[];
  signals: GodotSignalXml[];
  constants: GodotConstantXml[];
  enums: GodotEnumInfo[];
  operators: GodotOperatorXml[];
  annotations: GodotAnnotationXml[];
}

export interface GodotMethodXml {
  name: string;
  returnType: string;
  parameters: GodotParamXml[];
  description?: string;
  isVirtual: boolean;
  isStatic: boolean;
  isConst: boolean;
  isVararg: boolean;
}

export interface GodotParamXml {
  name: string;
  type: string;
  defaultValue?: string;
}

export interface GodotPropertyXml {
  name: string;
  type: string;
  description?: string;
  setter?: string;
  getter?: string;
}

export interface GodotSignalXml {
  name: string;
  parameters: GodotParamXml[];
  description?: string;
}

export interface GodotConstantXml {
  name: string;
  value: string;
  description?: string;
  enumName?: string;
}

export interface GodotAnnotationXml {
  name: string;
  parameters: GodotParamXml[];
  description?: string;
  isVararg: boolean;
}

export interface GodotOperatorXml {
  /** e.g., "+", "-", "*", "/", "==", "!=", "<", "<=", ">", ">=", "unary+", "unary-" */
  operator: string;
  returnType: string;
  /** For binary operators, the right-hand operand type. Absent for unary. */
  rightType?: string;
  description?: string;
}

// ─── Helpers ─────────────────────────────────────────────────

/**
 * Extracts text content from a `<description>` tag within a body string.
 * Returns trimmed text or undefined if empty/missing.
 */
function extractDescription(body: string): string | undefined {
  const match = /<description>([\s\S]*?)<\/description>/.exec(body);
  if (!match) return undefined;
  const text = match[1]!.trim();
  return text || undefined;
}

/**
 * Converts Godot BBCode-style markup to plain text for JSDoc.
 * Strips [code], [b], [i], [url], [param], etc. tags.
 */
export function gdDocToPlain(text: string): string {
  return (
    text
      .replace(/\[codeblock\][\s\S]*?\[\/codeblock\]/g, '') // remove code blocks entirely
      .replace(/\[codeblocks\][\s\S]*?\[\/codeblocks\]/g, '')
      .replace(/\[code\](.*?)\[\/code\]/g, '`$1`')
      .replace(/\[param\s+(\w+)\]/g, '`$1`')
      .replace(/\[b\](.*?)\[\/b\]/g, '**$1**')
      .replace(/\[i\](.*?)\[\/i\]/g, '*$1*')
      .replace(/\[url=([^\]]*)\](.*?)\[\/url\]/g, '$2 ($1)')
      .replace(/\[([A-Z]\w*)\]/g, '{@link $1}') // class refs like [Node]
      .replace(/\[method\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[member\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[signal\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[constant\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[enum\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[kbd\](.*?)\[\/kbd\]/g, '`$1`')
      .replace(/\[annotation\s+[^\]]+\]/g, '')
      .replace(/\[theme_item\s+[^\]]+\]/g, '')
      .replace(/\[color=[^\]]*\](.*?)\[\/color\]/g, '$1')
      .replace(/\[font=[^\]]*\](.*?)\[\/font\]/g, '$1')
      .replace(/\[br\]/g, '\n')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      // Normalize indentation: replace tabs and collapse multi-spaces
      .split('\n')
      .map((l) => l.replace(/\t/g, '').trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

// ─── Main Parsers ────────────────────────────────────────────

/**
 * Parses a Godot XML class documentation file.
 */
export function parseClassXml(xmlContent: string): GodotClassXml | null {
  const nameMatch = /<class name="([^"]+)"/.exec(xmlContent);
  if (!nameMatch) return null;

  const name = nameMatch[1]!;
  const inheritsMatch = /inherits="([^"]+)"/.exec(xmlContent);
  const inherits = inheritsMatch?.[1];

  // Parse class-level descriptions
  const briefMatch = /<brief_description>([\s\S]*?)<\/brief_description>/.exec(
    xmlContent,
  );
  const briefDescription = briefMatch?.[1]?.trim() || undefined;
  const classDescMatch = xmlContent.match(
    /<class[^>]*>[\s\S]*?<description>([\s\S]*?)<\/description>/,
  );
  const classDescription = classDescMatch?.[1]?.trim() || undefined;

  const methods: GodotMethodXml[] = [];
  const properties: GodotPropertyXml[] = [];
  const signals: GodotSignalXml[] = [];
  const constants: GodotConstantXml[] = [];

  // Parse methods
  const methodRegex = /<method name="([^"]+)"([^>]*)>([\s\S]*?)<\/method>/g;
  let match: RegExpExecArray | null;
  while ((match = methodRegex.exec(xmlContent)) !== null) {
    const methodName = match[1]!;
    const attrs = match[2]!;
    const body = match[3]!;

    const returnMatch = /<return type="([^"]*)"/.exec(body);
    const returnType = returnMatch?.[1] ?? 'void';

    const params: GodotParamXml[] = [];
    const paramRegex =
      /<param index="\d+" name="([^"]+)" type="([^"]+)"(?:\s+default="([^"]*)")?/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex.exec(body)) !== null) {
      params.push({
        name: paramMatch[1]!,
        type: paramMatch[2]!,
        defaultValue: paramMatch[3],
      });
    }

    const qualifiers = attrs.match(/qualifiers="([^"]*)"/)?.[1] ?? '';

    methods.push({
      name: methodName,
      returnType,
      parameters: params,
      description: extractDescription(body),
      isVirtual: qualifiers.includes('virtual'),
      isStatic: qualifiers.includes('static'),
      isConst: qualifiers.includes('const'),
      isVararg: qualifiers.includes('vararg'),
    });
  }

  // Parse properties (members) -- may have inline text or child <description>
  const propRegex =
    /<member name="([^"]+)" type="([^"]+)"(?:\s+setter="([^"]*)")?(?:\s+getter="([^"]*)")?[^>]*(?:\/>|>([\s\S]*?)<\/member>)/g;
  while ((match = propRegex.exec(xmlContent)) !== null) {
    const propDesc = match[5]?.trim() || undefined;
    properties.push({
      name: match[1]!,
      type: match[2]!,
      description: propDesc,
      setter: match[3],
      getter: match[4],
    });
  }

  // Parse signals
  const signalRegex = /<signal name="([^"]+)"(?:\s*\/|>([\s\S]*?)<\/signal)>/g;
  while ((match = signalRegex.exec(xmlContent)) !== null) {
    const sigName = match[1]!;
    const body = match[2] ?? '';
    const params: GodotParamXml[] = [];
    const paramRegex2 = /<param index="\d+" name="([^"]+)" type="([^"]+)"/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex2.exec(body)) !== null) {
      params.push({ name: paramMatch[1]!, type: paramMatch[2]! });
    }
    signals.push({
      name: sigName,
      parameters: params,
      description: extractDescription(body),
    });
  }

  // Parse constants -- may have inline text or child content
  const constRegex =
    /<constant name="([^"]+)" value="([^"]*)"(?:\s+enum="([^"]*)")?[^>]*(?:\/>|>([\s\S]*?)<\/constant>)/g;
  while ((match = constRegex.exec(xmlContent)) !== null) {
    const constContent = match[4]?.trim() || undefined;
    constants.push({
      name: match[1]!,
      value: match[2]!,
      description: constContent,
      enumName: match[3],
    });
  }

  // Group constants by enum
  const enumMap = new Map<string, GodotEnumInfo>();
  for (const c of constants) {
    if (c.enumName) {
      let e = enumMap.get(c.enumName);
      if (!e) {
        e = { name: c.enumName, values: [] };
        enumMap.set(c.enumName, e);
      }
      e.values.push({ name: c.name, value: c.value });
    }
  }

  // Parse operators
  const operators: GodotOperatorXml[] = [];
  const operatorRegex =
    /<operator name="operator ([^"]+)"[^>]*>([\s\S]*?)<\/operator>/g;
  while ((match = operatorRegex.exec(xmlContent)) !== null) {
    var opName = match[1]!
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
    const opBody = match[2]!;

    const returnMatch = /<return type="([^"]*)"/.exec(opBody);
    const returnType = returnMatch?.[1] ?? '';

    const paramMatch = /<param index="0" name="[^"]*" type="([^"]+)"/.exec(
      opBody,
    );
    const rightType = paramMatch?.[1];

    operators.push({
      operator: opName,
      returnType,
      rightType,
      description: extractDescription(opBody),
    });
  }

  // Parse constructors
  const constructorMethods: GodotMethodXml[] = [];
  const ctorRegex =
    /<constructor name="([^"]+)"[^>]*>([\s\S]*?)<\/constructor>/g;
  while ((match = ctorRegex.exec(xmlContent)) !== null) {
    const ctorBody = match[2]!;
    const returnMatch = /<return type="([^"]*)"/.exec(ctorBody);
    const returnType = returnMatch?.[1] ?? name;
    const params: GodotParamXml[] = [];
    const paramRegex3 =
      /<param index="\d+" name="([^"]+)" type="([^"]+)"(?:\s+default="([^"]*)")?/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex3.exec(ctorBody)) !== null) {
      params.push({
        name: paramMatch[1]!,
        type: paramMatch[2]!,
        defaultValue: paramMatch[3],
      });
    }
    constructorMethods.push({
      name: match[1]!,
      returnType,
      parameters: params,
      description: extractDescription(ctorBody),
      isVirtual: false,
      isStatic: false,
      isConst: false,
      isVararg: false,
    });
  }

  // Parse annotations
  const annotations: GodotAnnotationXml[] = [];
  const annotationRegex =
    /<annotation name="@([^"]+)"(?:\s+qualifiers="([^"]*)")?[^>]*>([\s\S]*?)<\/annotation>/g;
  while ((match = annotationRegex.exec(xmlContent)) !== null) {
    const annName = match[1]!;
    const qualifiers = match[2] ?? '';
    const annBody = match[3]!;
    const params: GodotParamXml[] = [];
    const paramRegex4 =
      /<param index="\d+" name="([^"]+)" type="([^"]+)"(?:\s+default="([^"]*)")?/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex4.exec(annBody)) !== null) {
      params.push({
        name: paramMatch[1]!,
        type: paramMatch[2]!,
        defaultValue: paramMatch[3],
      });
    }
    annotations.push({
      name: annName,
      parameters: params,
      description: extractDescription(annBody),
      isVararg: qualifiers.includes('vararg'),
    });
  }

  return {
    name,
    inherits,
    briefDescription,
    description: classDescription,
    methods,
    constructors: constructorMethods,
    properties,
    signals,
    constants,
    enums: [...enumMap.values()],
    operators,
    annotations,
  };
}

/**
 * Parses all Godot XML class docs from a directory.
 */
export function parseAllClassXmls(
  classDocsDir: string,
): Map<string, GodotClassXml> {
  const xmlFiles = readdirSync(classDocsDir).filter((f) => f.endsWith('.xml'));
  const classes = new Map<string, GodotClassXml>();

  for (const xmlFile of xmlFiles) {
    const xmlPath = join(classDocsDir, xmlFile);
    const xmlContent = readFileSync(xmlPath, 'utf-8');
    const cls = parseClassXml(xmlContent);
    if (cls) {
      classes.set(cls.name, cls);
    }
  }

  return classes;
}
