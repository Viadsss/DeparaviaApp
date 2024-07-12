import { Flex, IconButton, ListItem, Text, useToast } from "@chakra-ui/react";
import { IconEyeCode, IconTableShortcut } from "@tabler/icons-react";
import PropTypes from "prop-types";

export default function ProblemList({
  number,
  toastDesc,
  onClickDisplay,
  children,
}) {
  const toast = useToast();

  return (
    <ListItem mb="16px">
      <Text>{children}</Text>
      <Flex flexWrap="wrap" gap="4px">
        <IconButton
          icon={<IconTableShortcut />}
          onClick={onClickDisplay}
          size="xs"
          colorScheme="green"
        >
          Display
        </IconButton>
        <IconButton
          icon={<IconEyeCode />}
          onClick={() =>
            toast({
              title: `SQL Code: Problem ${number}`,
              ...toastDesc,
              status: "info",
              duration: 5000,
              isClosable: true,
            })
          }
          size="xs"
          colorScheme="blue"
        >
          Show Code
        </IconButton>
      </Flex>
    </ListItem>
  );
}

ProblemList.propTypes = {
  number: PropTypes.number.isRequired,
  toastDesc: PropTypes.object.isRequired,
  onClickDisplay: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
