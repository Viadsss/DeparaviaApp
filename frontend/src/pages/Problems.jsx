import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ProblemList from "../components/problems/ProblemList";
import Output1 from "../components/problems/Output1";
import Output2 from "../components/problems/Output2";
import Output3 from "../components/problems/Output3";
import Output4 from "../components/problems/Output4";
import Output5 from "../components/problems/Output5";
import Output6 from "../components/problems/Output6";
import Output7 from "../components/problems/Output7";
import Output8 from "../components/problems/Output8";
import Output9 from "../components/problems/Output9";
import Output10 from "../components/problems/Output10";

export default function Problems() {
  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.600");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onClickDisplay1() {
    setModalTitle("Output 1");
    setModalContent(<Output1 />);
    onOpen();
  }

  function onClickDisplay2() {
    setModalTitle("Output 2");
    setModalContent(<Output2 />);
    onOpen();
  }
  function onClickDisplay3() {
    setModalTitle("Output 3");
    setModalContent(<Output3 />);
    onOpen();
  }

  function onClickDisplay4() {
    setModalTitle("Output 4");
    setModalContent(<Output4 />);
    onOpen();
  }

  function onClickDisplay5() {
    setModalTitle("Output 5");
    setModalContent(<Output5 />);
    onOpen();
  }

  function onClickDisplay6() {
    setModalTitle("Output 6");
    setModalContent(<Output6 />);
    onOpen();
  }

  function onClickDisplay7() {
    setModalTitle("Output 7");
    setModalContent(<Output7 />);
    onOpen();
  }

  function onClickDisplay8() {
    setModalTitle("Output 8");
    setModalContent(<Output8 />);
    onOpen();
  }

  function onClickDisplay9() {
    setModalTitle("Output 9");
    setModalContent(<Output9 />);
    onOpen();
  }

  function onClickDisplay10() {
    setModalTitle("Output 10");
    setModalContent(<Output10 />);
    onOpen();
  }

  return (
    <>
      <Box p="32px">
        <Heading as="h2" mb="24px" maxWidth="900px" mx="auto">
          Problem Statements
        </Heading>
        <Box
          bg={bgCard}
          border="1px"
          borderColor={borderCard}
          p={"24px"}
          rounded="lg"
          maxWidth="900px"
          mx="auto"
        >
          <OrderedList>
            <Heading size="md">Simple</Heading>
            <ProblemList
              number={1}
              toastDesc={toastDesc1}
              onClickDisplay={onClickDisplay1}
            >
              Display the first and last name of the patient including the
              patient ID.
            </ProblemList>

            <ProblemList
              number={2}
              toastDesc={toastDesc2}
              onClickDisplay={onClickDisplay2}
            >
              Display the doctor&apos;s names and start times for doctors who
              start work before 9 AM.
            </ProblemList>

            <ProblemList
              number={3}
              toastDesc={toastDesc3}
              onClickDisplay={onClickDisplay3}
            >
              Retrieve all patients who live in Quezon City and order them by
              their last name.
            </ProblemList>

            <Heading size="md" pt="24px">
              Moderate
            </Heading>
            <ProblemList
              number={4}
              toastDesc={toastDesc4}
              onClickDisplay={onClickDisplay4}
            >
              Display the marital statuses with more than 5 patients, along with
              the number of patients for each status.
            </ProblemList>

            <ProblemList
              number={5}
              toastDesc={toastDesc5}
              onClickDisplay={onClickDisplay5}
            >
              Display the visitor relationships and its total visits where there
              are more than 3 visits in each category.
            </ProblemList>

            <ProblemList
              number={6}
              toastDesc={toastDesc6}
              onClickDisplay={onClickDisplay6}
            >
              Display the average weight of patients grouped by city and ordered
              by average weight in descending order, but only include cities
              where the average weight is greater than 70
            </ProblemList>

            <ProblemList
              number={7}
              toastDesc={toastDesc7}
              onClickDisplay={onClickDisplay7}
            >
              Retrieve the count of patients by city, only for cities with more
              than 1 patient.
            </ProblemList>

            <Heading size="md" pt="24px">
              Difficult
            </Heading>
            <ProblemList
              number={8}
              toastDesc={toastDesc8}
              onClickDisplay={onClickDisplay8}
            >
              Display the visitor&apos;s name of female patients, including
              their total visit in descending order, only include the visitors
              that have more than 2 visits.
            </ProblemList>

            <ProblemList
              number={9}
              toastDesc={toastDesc9}
              onClickDisplay={onClickDisplay9}
            >
              Display the patients&apos; ID and their names, the total number of
              their admissions, and the most recent admission date. Only include
              patients who have been admitted more than once and sort them in
              descending order.
            </ProblemList>

            <ProblemList
              number={10}
              toastDesc={toastDesc10}
              onClickDisplay={onClickDisplay10}
            >
              Retrieve the doctors&apos; ID and their respective names and the
              average number of days their patients stay admitted, only for
              doctors with an average stay duration greater than 1 and a half
              days.
            </ProblemList>
          </OrderedList>
        </Box>
      </Box>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalContent}</ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const toastDesc1 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> patientID, firstName, lastName
      </Text>
      <Text>
        <b>FROM</b> patient;
      </Text>
    </Flex>
  ),
};

const toastDesc2 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> doctorName, doctorStartTime
      </Text>
      <Text>
        <b>FROM</b> doctor
      </Text>
      <Text>
        <b>WHERE</b> doctorStartTime {"<"} &apos;09:00:00&apos;;
      </Text>
    </Flex>
  ),
};

const toastDesc3 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> *
      </Text>
      <Text>
        <b>FROM</b> patient
      </Text>
      <Text>
        <b>WHERE</b> city = &apos;Quezon City&apos;
      </Text>
      <Text>
        <b>ORDER BY</b> lastname;
      </Text>
    </Flex>
  ),
};

const toastDesc4 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> maritalStatus, COUNT(*) as patientCount
      </Text>
      <Text>
        <b>FROM</b> patient
      </Text>
      <Text>
        <b>GROUP BY</b> maritalStatus
      </Text>
      <Text>
        <b>HAVING</b> patientCount {">"} 5;
      </Text>
    </Flex>
  ),
};

const toastDesc5 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> visitorRelationship, COUNT(*) as visitorCount
      </Text>
      <Text>
        <b>FROM</b> visitor
      </Text>
      <Text>
        <b>GROUP BY</b> visitorRelationship
      </Text>
      <Text>
        <b>HAVING</b> visitorCount {">"} 3;
      </Text>
    </Flex>
  ),
};

const toastDesc6 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> city, AVG(weight) AS avg_weight
      </Text>
      <Text>
        <b>FROM</b> patient
      </Text>
      <Text>
        <b>GROUP BY</b> city
      </Text>
      <Text>
        <b>HAVING</b> AVG(weight) {">"} 70;
      </Text>
    </Flex>
  ),
};

const toastDesc7 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> city, COUNT(*) as patientCount
      </Text>
      <Text>
        <b>FROM</b> patient
      </Text>
      <Text>
        <b>GROUP BY</b> city
      </Text>
      <Text>
        <b>HAVING</b> COUNT(*) {">"} 1;
      </Text>
    </Flex>
  ),
};

const toastDesc8 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text>
        <b>SELECT</b> v.visitorName, COUNT(*) AS total_visits
      </Text>
      <Text>
        <b>FROM</b> visitor v, patient p
      </Text>
      <Text>
        <b>WHERE</b> p.patientID = v.patientID AND p.sex = &apos;F&apos;
      </Text>
      <Text>
        <b>GROUP BY</b> v.visitorName
      </Text>
      <Text>
        <b>HAVING</b> total_visits {">"} 2
      </Text>
      <Text>
        <b>ORDER BY</b> total_visits DESC;
      </Text>
    </Flex>
  ),
};

const toastDesc9 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text paddingLeft={"20px"} textIndent={"-20px"}>
        <b>SELECT</b> p.patientID, p.firstName, p.lastName, COUNT(a.admissionID)
        AS total_admissions,MAX(a.admissionDate) AS most_recent_admission
      </Text>
      <Text>
        <b>FROM</b> patient p, admission a
      </Text>
      <Text>
        <b>WHERE</b> p.patientID = a.patientID
      </Text>
      <Text>
        <b>GROUP BY</b> p.patientID, p.firstName, p.lastName
      </Text>
      <Text>
        <b>HAVING</b> COUNT(a.admissionID) {">"} 1
      </Text>
      <Text>
        <b>ORDER BY</b> total_admissions DESC;
      </Text>
    </Flex>
  ),
};

const toastDesc10 = {
  description: (
    <Flex
      flexWrap="wrap"
      flexDir="column"
      fontFamily="Roboto Mono Variable"
      fontWeight={400}
    >
      <Text paddingLeft={"20px"} textIndent={"-20px"}>
        <b>SELECT</b> d.doctorID, d.doctorName, AVG(DATEDIFF(a.dischargeDate,
        a.admissionDate)) AS avgStayDuration
      </Text>
      <Text>
        <b>FROM</b> doctor d, admission a
      </Text>
      <Text paddingLeft={"20px"} textIndent={"-20px"}>
        <b>WHERE</b> d.doctorID = a.doctorID AND a.dischargeDate IS NOT NULL
      </Text>
      <Text>
        <b>GROUP BY</b> d.doctorID, d.doctorName
      </Text>
      <Text>
        <b>HAVING</b> avgStayDuration {">"} 1.5;
      </Text>
    </Flex>
  ),
};
