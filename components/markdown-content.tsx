'use client';

import ReactMarkdown from 'react-markdown';
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  InlineCode,
  List,
} from '@/components/ui/typography';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        p: P,
        blockquote: Blockquote,
        code: InlineCode,
        ul: List,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
