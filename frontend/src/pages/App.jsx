import { Outlet } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function App() {
  const mainBg = useColorModeValue("gray.50", "gray.900");
  const headerFooterBg = useColorModeValue("white", "gray.900");
  const headerBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <Box bg={mainBg}>
        <Header bg={headerFooterBg} borderColor={headerBorder} />
        <Box
          as="main"
          w="100%"
          maxWidth="1600px"
          minHeight="calc(100vh - 64px)"
          mx="auto"
        >
          <Outlet />
        </Box>
        <Footer bg={headerFooterBg} borderColor={headerBorder} />
      </Box>
    </>
  );
}
