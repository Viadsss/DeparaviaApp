import { Box } from "@chakra-ui/react";
import Hero from "../components/home/Hero";
import Team from "../components/home/Team";

export default function Home() {
  return (
    <Box px={{ base: "8px", md: "32px" }}>
      <Hero />
      <Team />
    </Box>
  );
}
