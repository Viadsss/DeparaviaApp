import { IconMenu, IconMoonStars, IconSun } from "@tabler/icons-react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Link as ChakraLink,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Image,
  IconButton,
  Heading,
  Text,
} from "@chakra-ui/react";
import Logo from "/DeparaviaLogo.png";
import PropTypes from "prop-types";

export default function Header({ bg, borderColor }) {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<IconMoonStars />, <IconSun />);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const links = (
    <>
      <ChakraLink as={ReactRouterLink} to="/patient" onClick={onClose}>
        Patient
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/visitor" onClick={onClose}>
        Visitor
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/doctor" onClick={onClose}>
        Doctor
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/admission" onClick={onClose}>
        Admission
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/admin" onClick={onClose}>
        Admin
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/problems" onClick={onClose}>
        Problems
      </ChakraLink>
    </>
  );

  return (
    <>
      <Box
        as="header"
        h="64px"
        bg={bg}
        borderBottom="2px"
        borderBottomColor={borderColor}
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Flex
          as="nav"
          h={"100%"}
          justifyContent={"space-between"}
          maxWidth={"1600px"}
          mx="auto"
          px="32px"
          py="16px"
          alignItems={"center"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} gap={"8px"}>
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
          <Flex
            gap="16px"
            alignItems="center"
            direction={{ base: "row-reverse", md: "row" }}
          >
            {!isMobile ? (
              links
            ) : (
              <IconButton icon={<IconMenu />} onClick={onOpen} />
            )}
            <Box>
              <IconButton
                onClick={toggleColorMode}
                icon={icon}
                variant={"ghost"}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex alignItems={"center"} gap={"8px"}>
              <ChakraLink as={ReactRouterLink} to="/">
                <Image src={Logo} boxSize="48px" />
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/"
                onClick={onClose}
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
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap="16px">
              {links}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

Header.propTypes = {
  bg: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};
