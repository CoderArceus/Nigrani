declare module 'react-simple-maps' {
  import { ComponentType, ReactNode } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    className?: string;
    children?: ReactNode;
    [key: string]: unknown;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
    children?: ReactNode;
    [key: string]: unknown;
  }

  export interface GeographiesProps {
    geography: string | Record<string, unknown>;
    children: (data: { geographies: GeographyType[] }) => ReactNode;
    [key: string]: unknown;
  }

  export interface GeographyType {
    rsmKey: string;
    properties: Record<string, unknown>;
    [key: string]: unknown;
  }

  export interface GeographyProps {
    geography: GeographyType;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    [key: string]: unknown;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
}
