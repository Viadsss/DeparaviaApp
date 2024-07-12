import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Image,
  Heading,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "/DeparaviaLogo.png";

export default function Footer({ bg, borderColor }) {
  return (
    <Box
      as="footer"
      bg={bg}
      borderTop="2px"
      borderTopColor={borderColor}
      px="32px"
      py="16px"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxWidth="1600px"
        mx="auto"
        gap="12px"
      >
        <Flex flex="1" alignItems="center">
          <ChakraLink as={ReactRouterLink} to="/">
            <Image src={Logo} boxSize="48px" />
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/"
            _hover={{ textDecoration: "none" }}
          >
            <Heading size="md">
              <Text as="span" color="green.400">
                DEPA
              </Text>
              <Text as="span" color="blue.400">
                RAVIA
              </Text>
            </Heading>
          </ChakraLink>
        </Flex>
        <Box textAlign={"center"} mb={{ base: "8px", md: "0" }} flex="1">
          <Heading size="sm">Information Management Project</Heading>
          <Text fontSize="sm">
            This project is part of the Information Management course
          </Text>
        </Box>
        <Box textAlign={"center"} flex="1">
          <Text fontSize="sm">
            &copy; 2024 Polytechnic University of the Philippines.
            <br />
            All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

Footer.propTypes = {
  bg: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};
