import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(...registerables);

export default function MonthModal({ isOpen, onClose }) {
  const [monthAdmissionData, setMonthAdmissionData] = useState([]);
  const [monthVisitorData, setMonthVisitorData] = useState([]);
  const color = useColorModeValue("#1A202C", "#F7FAFC");
  const gridColor = useColorModeValue(
    "rgba(0, 0, 0, 0.20)",
    "rgba(255, 255, 255, 0.20)"
  );

  useEffect(() => {
    getMonthAdmissions();
    getMonthVisitors();
  }, [isOpen]);

  const getMonthAdmissions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/admissions/month"
      );
      const data = response.data;
      setMonthAdmissionData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMonthVisitors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/visitors/month"
      );
      const data = response.data;
      setMonthVisitorData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const admissionsTotalArr = new Array(daysInMonth).fill(0);
  const visitorsTotalArr = new Array(daysInMonth).fill(0);

  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  monthAdmissionData.forEach(
    (entry) => (admissionsTotalArr[entry.day - 1] = entry.total)
  );

  monthVisitorData.forEach(
    (entry) => (visitorsTotalArr[entry.day - 1] = entry.total)
  );

  const chartData = {
    labels: daysArray,
    datasets: [
      {
        label: "Total Admissions",
        data: admissionsTotalArr,
        borderWidth: 2,
      },
      {
        label: "Total Visitors",
        data: visitorsTotalArr,
        borderWidth: 2,
      },
    ],
  };

  const optionsMonth = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Lexend', 'sans-serif'",
          },
          color: color,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
          font: {
            family: "'Lexend', 'sans-serif'",
          },
          color: color,
        },
        ticks: {
          font: {
            family: "'Lexend', 'sans-serif'",
          },
          color: color,
        },
        grid: {
          display: true,
          color: gridColor,
        },
      },
      y: {
        title: {
          display: true,
          text: "Number Admissions/Visitors",
          font: {
            family: "'Lexend', 'sans-serif'",
          },
          color: color,
        },
        ticks: {
          font: {
            family: "'Lexend', 'sans-serif'",
          },
          color: color,
          precision: 0,
        },
        grid: {
          display: true,
          color: gridColor,
        },
      },
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Overview This Month</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Bar data={chartData} options={optionsMonth} />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

MonthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
