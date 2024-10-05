import { useEffect } from "react";
import "zenn-content-css";

export default function PostContent({ content }: { content: string }) {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <section
      className="znc prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
