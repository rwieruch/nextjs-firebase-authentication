import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const RE = /{(.*?)}/;

const calculateLinesToHighlight = (meta: string) => {
  const lineNumbers = meta
    .split(',')
    .map(v => v.split('-').map(v => parseInt(v, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    return lineNumbers.some(([start, end]) =>
      end
        ? lineNumber >= start && lineNumber <= end
        : lineNumber === start
    );
  };
};

type CodeProps = {
  children: string;
  className: string;
};

const Code = ({ children, className }: CodeProps) => {
  const highlight = className.match(RE);

  let isLineToHighlight = (index: number) => false;
  let language = className.replace(/language-/, '');

  if (highlight) {
    language = language.replace(highlight[0], '');
    isLineToHighlight = calculateLinesToHighlight(highlight[1]);
  }

  if (language === 'javascript') {
    language = 'jsx';
  }

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language as any}
      theme={theme}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => {
        const tokensWithoutTrailingLine = tokens.slice(0, -1);

        return (
          <pre
            className={className}
            style={{
              ...style,
              marginBottom: '0',
              padding: '20px',
              overflow: 'auto',
              maxWidth: 'calc(100vw - 80px)',
            }}
          >
            {tokensWithoutTrailingLine.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (isLineToHighlight(i)) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }

              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
};

export default Code;
