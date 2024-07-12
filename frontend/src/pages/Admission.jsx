import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Admission() {
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");
  return (
    <Box p="32px">
      <Heading as="h2" textAlign="center" mb="24px">
        Admission
      </Heading>
      <Box
        bg={bgCard}
        border="1px"
        borderColor={borderCard}
        p={"24px"}
        rounded="lg"
        maxWidth="900px"
        mx="auto"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize="lg" mb="16px" textAlign={"center"}>
          Are you a new patient or a returning patient?
        </Text>
        <VStack spacing="16px">
          <Button>
            <ChakraLink
              as={ReactRouterLink}
              to="/admission/new"
              fontSize="xl"
              _hover={{ textDecoration: "none" }}
            >
              New Patient
            </ChakraLink>
          </Button>
          <Button>
            <ChakraLink
              as={ReactRouterLink}
              to="/admission/returning"
              fontSize="xl"
              _hover={{ textDecoration: "none" }}
            >
              Returning Patient
            </ChakraLink>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
