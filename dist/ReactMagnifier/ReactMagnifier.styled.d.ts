/**
 * Global CSS injected via styled-components' createGlobalStyle.
 *
 * Defines styles for the imperatively-created .react-magnifier-glass element
 * (position, sizing, z-index, shadow) and the visibility/opacity transition
 * classes (.show-magnifier / .hide-magnifier). A GlobalStyle is required here
 * because the glass DOM node is created imperatively in utils.ts rather than
 * rendered as a styled-component.
 */
export declare const MagnifierGlobalStyles: import('react').NamedExoticComponent<
  import('styled-components').ExecutionProps & object
>;
/**
 * Wrapper <div> that holds the <img> and the magnifier glass overlay.
 * Uses inline-block layout and relative positioning so the absolutely-positioned
 * glass stays scoped to the container. A visible focus-ring is applied via
 * :focus-visible for keyboard accessibility.
 */
export declare const ImageContainer: import('styled-components/dist/types').IStyledComponentBase<
  'web',
  import('styled-components').FastOmit<
    import('react').DetailedHTMLProps<
      import('react').HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    never
  > &
    Partial<
      Pick<
        import('react').DetailedHTMLProps<
          import('react').HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        never
      >
    >
> &
  string;
/**
 * Screen-reader-only utility element.
 * Visually hides content while keeping it available to assistive technology.
 * Used to announce magnifier state changes (visible / hidden / position updates).
 */
export declare const SrOnly: import('styled-components/dist/types').IStyledComponentBase<
  'web',
  import('styled-components').FastOmit<
    import('react').DetailedHTMLProps<
      import('react').HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    never
  > &
    Partial<
      Pick<
        import('react').DetailedHTMLProps<
          import('react').HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        never
      >
    >
> &
  string;
//# sourceMappingURL=ReactMagnifier.styled.d.ts.map
