interface SkipToContentProps {
  contentId: string;
}

export function SkipToContent({ contentId }: SkipToContentProps) {
  return (
    <a
      href={`#${contentId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:outline-none focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}