import { Link as ReactRouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Link as ChakraLink,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import DoctorHeartPng from "/home/DoctorHeart.png";

const links = (
  <>
    <ChakraLink as={ReactRouterLink} to="/patient">
      <Button variant="outline" colorScheme="green">
        Patient
      </Button>
    </ChakraLink>
    <ChakraLink as={ReactRouterLink} to="/visitor">
      <Button variant="outline" colorScheme="green">
        Visitor
      </Button>
    </ChakraLink>
    <ChakraLink as={ReactRouterLink} to="/doctor">
      <Button variant="outline" colorScheme="blue">
        Doctor
      </Button>
    </ChakraLink>

    <ChakraLink as={ReactRouterLink} to="/admission">
      <Button variant="outline" colorScheme="blue">
        Admission
      </Button>
    </ChakraLink>
  </>
);

const logo = (
  <>
    Welcome to{" "}
    <Text as="span" color="green.400">
      DEPA
    </Text>
    <Text as="span" color="blue.400">
      RAVIA
    </Text>{" "}
    Medical Center
  </>
);

const heroDesigns = (
  <>
    <Circle
      size={120}
      bg="rgba(255, 190, 22, 0.25)"
      filter="auto"
      blur="24px"
      position="absolute"
      top="15%"
      left="25%"
    />
    <Circle
      size={150}
      bg="rgba(85, 102, 255, 0.25)"
      filter="auto"
      blur="24px"
      position="absolute"
      top="65%"
      left="5%"
    />
    <Circle
      size={200}
      bg="rgba(209, 233, 218, 1)"
      filter="auto"
      blur="24px"
      position="absolute"
      top="5%"
      right="3%"
    />
    <Circle
      size={200}
      bg="rgba(255, 190, 22, 0.50)"
      filter="auto"
      blur="24px"
      position="absolute"
      bottom="25%"
      right="20%"
      display={{ base: "none", md: "block" }}
    />
  </>
);

export default function Hero() {
  return (
    <Flex
      justifyContent="center"
      minHeight="calc(100vh - 64px)"
      height="calc(100vh - 64px)"
      overflow="hidden"
      py="16px"
      px="8px"
      position="relative"
      textAlign={{ base: "center", md: "left" }}
    >
      <Box position="absolute" h="100%" w="100%">
        {heroDesigns}
      </Box>
      <Flex flex="2" flexDir="column" justifyContent="center" gap="16px">
        <Heading size={{ base: "3xl", md: "4xl" }}>{logo}</Heading>
        <Text color="gray.400">Medical care for everyone</Text>
        <Flex
          gap="12px"
          flexWrap="wrap"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          {links}
        </Flex>
      </Flex>
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        zIndex={2}
        display={{ base: "none", md: "flex" }}
      >
        <Image
          src={DoctorHeartPng}
          objectPosition="center"
          objectFit="contain"
          maxW="100%"
          maxH="100%"
        />
      </Flex>
    </Flex>
  );
}
