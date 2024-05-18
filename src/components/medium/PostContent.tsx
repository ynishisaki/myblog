import { useEffect } from "react";
import "zenn-content-css";

export const PostContent = ({ content }: { content: string }) => {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <section
      className="znc prose prose-slate"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
