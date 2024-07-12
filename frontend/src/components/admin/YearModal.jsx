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

export default function YearModal({ isOpen, onClose }) {
  const [yearAdmissionData, setYearAdmissionData] = useState([]);
  const [yearVisitorData, setYearVisitorData] = useState([]);
  const color = useColorModeValue("#1A202C", "#F7FAFC");
  const gridColor = useColorModeValue(
    "rgba(0, 0, 0, 0.20)",
    "rgba(255, 255, 255, 0.20)"
  );

  useEffect(() => {
    getYearAdmissions();
    getYearVisitors();
  }, [isOpen]);

  const getYearAdmissions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/admissions/year"
      );
      const data = response.data;
      setYearAdmissionData(data);
    } catch (err) {
      console.error("Error fetching yearly admissions:", err);
    }
  };

  const getYearVisitors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/visitors/year"
      );
      const data = response.data;
      setYearVisitorData(data);
    } catch (err) {
      console.error("Error fetching yearly visitors:", err);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const admissionsTotalArr = new Array(12).fill(0); // Initialize array with 12 months, all set to 0
  const visitorsTotalArr = new Array(12).fill(0);

  yearAdmissionData.forEach((entry) => {
    const monthIndex = months.indexOf(entry.month);
    if (monthIndex !== -1) {
      admissionsTotalArr[monthIndex] = entry.total;
    }
  });

  yearVisitorData.forEach((entry) => {
    const monthIndex = months.indexOf(entry.month);
    if (monthIndex !== -1) {
      visitorsTotalArr[monthIndex] = entry.total;
    }
  });

  const chartData = {
    labels: months,
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

  const optionsYear = {
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
          text: "Month",
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
        <ModalHeader>Overview This Year</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Bar data={chartData} options={optionsYear} />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

YearModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
