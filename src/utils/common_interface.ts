import React from 'react';

export interface INativeProps<S extends string = never> {
  className?: string;
  style?: React.CSSProperties & Partial<Record<S, string>>;
  tabIndex?: number;
}
