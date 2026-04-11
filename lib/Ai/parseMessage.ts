// lib/parseMessage.ts

type TableData = {
  headers: string[];
  rows: string[][];
  caption?: string;
};

type ParsedPart =
  | { type: "text"; content: string }
  | { type: "table"; content: TableData };

export function parseMessage(raw: string): ParsedPart[] {
  const withoutMdTables = raw.replace(
    /(\|.+\|\n)((\|[-:]+)+\|\n)((\|.+\|\n)*)/g,
    ""
  ).trim();

  const tableRegex = /```table\s*([\s\S]*?)```/g;

  if (!tableRegex.test(withoutMdTables)) {
    return [{ type: "text", content: withoutMdTables }];
  }

  tableRegex.lastIndex = 0;

  const parts: ParsedPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tableRegex.exec(withoutMdTables)) !== null) {
    const before = withoutMdTables.slice(lastIndex, match.index).trim();
    if (before) parts.push({ type: "text", content: before });

    try {
      const data: TableData = JSON.parse(match[1].trim());
      parts.push({ type: "table", content: data });
    } catch {
      parts.push({ type: "text", content: match[0] });
    }

    lastIndex = match.index + match[0].length;
  }

  const after = withoutMdTables.slice(lastIndex).trim();
  if (after) parts.push({ type: "text", content: after });

  return parts;
}

export type { TableData, ParsedPart };