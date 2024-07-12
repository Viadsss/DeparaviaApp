import {
  Avatar,
  Box,
  Card,
  Circle,
  Flex,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react";

const teamDesigns = (
  <>
    <Circle
      size={120}
      bg="rgba(255, 190, 22, 0.25)"
      filter="auto"
      blur="24px"
      position="absolute"
      top="10%"
      right="5%"
    />
    <Circle
      size={120}
      bg="rgba(197, 48, 48, 0.5)"
      filter="auto"
      blur="24px"
      position="absolute"
      bottom="20%"
      left="5%"
    />
    <Circle
      size={250}
      bg="rgba(85, 102, 255, 0.5)"
      filter="auto"
      blur="24px"
      position="absolute"
      top="0%"
      left="30%"
    />
    <Circle
      size={200}
      bg="rgba(209, 233, 218, 0.8)"
      filter="auto"
      blur="24px"
      position="absolute"
      top="5%"
      left="3%"
    />
    <Circle
      size={120}
      bg="rgba(11, 197, 234, 0.5)"
      filter="auto"
      blur="24px"
      position="absolute"
      top="30%"
      right="20%"
    />
    <Circle
      size={200}
      bg="rgba(255, 190, 22, 0.50)"
      filter="auto"
      blur="24px"
      position="absolute"
      bottom="25%"
      left="20%"
    />
    <Circle
      size={120}
      bg="rgba(255, 190, 22, 0.50)"
      filter="auto"
      blur="24px"
      position="absolute"
      bottom="50%"
      left="50%"
    />
    <Circle
      size={300}
      bg="rgba(227, 61, 148, 0.6)"
      filter="auto"
      blur="24px"
      position="absolute"
      bottom="15%"
      right="10%"
    />
  </>
);

export default function Team() {
  return (
    <Flex
      justifyContent="center"
      minHeight="calc(100vh - 64px)"
      overflow="hidden"
      py="24px"
      position="relative"
    >
      <Box position="absolute" h="100%" w="100%">
        {teamDesigns}
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        position="relative"
        textAlign="center"
        w="100%"
        gap="16px"
      >
        <Tag colorScheme="blue">Our Group</Tag>
        <Heading size="3xl">Group 9</Heading>
        <Flex
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          gap="32px"
          mt="64px"
          flexWrap="wrap"
          w="100%"
        >
          <Flex justifyContent="space-evenly" gap="32px" flexWrap="wrap">
            <Card
              w="300px"
              h="250px"
              p="12px"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDir="column"
              >
                <Avatar size="lg" src="/home/Dela Cruz.jpg" />
                <Text fontWeight="bold">Jhana Mae Dela Cruz</Text>
                <Text>Project Manager / Database Developer</Text>
              </Flex>
              <Text color="gray.400">
                Manages overall project tasks, including database development,
                and coordinates team efforts.
              </Text>
            </Card>
            <Card
              w="300px"
              h="250px"
              p="12px"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDir="column"
              >
                <Avatar size="lg" src="/home/Hazel.jpg" />
                <Text fontWeight="bold">Hazel Ann Pangilinan</Text>
                <Text>Database & Backend Developer</Text>
              </Flex>
              <Text color="gray.400">
                Responsible for designing, developing, and maintaining databases
                and backend functionalities.
              </Text>
            </Card>
          </Flex>
          <Flex justifyContent="space-evenly" gap="32px" flexWrap="wrap">
            <Card
              w="300px"
              h="250px"
              p="12px"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDir="column"
              >
                <Avatar size="lg" src="/home/Kaye.jpg" />
                <Text fontWeight="bold">Ler Iseah Kaye Regala</Text>
                <Text>Database & Backend Developer</Text>
              </Flex>
              <Text color="gray.400">
                Responsible for designing, developing, and maintaining databases
                and backend functionalities.
              </Text>
            </Card>
            <Card
              w="300px"
              h="250px"
              p="12px"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDir="column"
              >
                <Avatar size="lg" src="/home/Viado.jpg" />
                <Text fontWeight="bold">John Paul Viado</Text>
                <Text>Lead Programmer / Full-Stack Developer</Text>
              </Flex>
              <Text color="gray.400">
                Leads and oversees all aspects of development and responsible
                for architecting the application&apos;s frontend.
              </Text>
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
