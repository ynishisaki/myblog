import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import "zenn-content-css";

export const PostContent = ({ content }: { content: string }) => {
	useEffect(() => {
		import("zenn-embed-elements");
	}, []);

	return (
		<Box
			className='znc'
			dangerouslySetInnerHTML={{
				__html: content,
			}}
			sx={{
				"& h1": {
					fontWeight: "bold",
				},
				"& h2": {
					fontWeight: "bold",
				},
				"& h3": {
					fontWeight: "semibold",
				},
			}}
		/>
	);
};
