import { Box, Center, keyframes, useBreakpointValue } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import HoverButton from "../common/HoverButton";

const bump = keyframes({
  "from, to": {
    transform: "scale(1, 1)",
  },
  "25%": {
    transform: "scale(0.9, 1.1)",
  },
  "50%": {
    transform: "scale(1.1, 0.9)",
  },
  "75%": {
    transform: "scale(0.95, 1.05)",
  },
});

export const Header = () => {
  const router: NextRouter = useRouter();

  const jumpToHome = () => {
    router.push(`/`);
  };
  const jumpToAbout = () => {
    router.push(`/about/`);
  };
  const jumpToProfile = () => {
    router.push(`/profile/`);
  };

  const animation = `${bump}  0.3s ease-in-out`;

  const isnotMobile = useBreakpointValue({ base: false, md: true });

  return (
    <Box layerStyle={"header"} boxShadow="lg">
      <Box layerStyle={"header_inner"}>
        <Center
          layerStyle={"blogTitle"}
          as="button"
          onClick={jumpToHome}
          _hover={{ animation: `${animation}` }} // ぷるんってする
        >
          もにょぶろぐ
        </Center>
        {isnotMobile && (
          <Box margin={"0 0 0 auto"}>
            <HoverButton
              textContent="About"
              areaLabel={"About button"}
              onClick={jumpToAbout}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
