import React, { useState } from "react";
import health from "../../assets/health.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dataTemplate = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
  ],
  datasets: [
    {
      label: "Reading",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const Grid = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="m-3">
      <div className="grid grid-cols-5 gap-4 pb-3">
        <div className="bg-gray-200 m-3 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <p>Title</p>
            <p>Content</p>
            <p>Reeding</p>
          </div>
          <div>
            <img
              src={health}
              alt="Nature"
              className="object-cover h-24 w-24 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 pb-3">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md col-span-3">
          <div>
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Temperature</Tab>
                <Tab>Heart Rate</Tab>
                <Tab>Respiratory Rate</Tab>
                <Tab>Weight</Tab>
              </TabList>

              <TabPanel>
                <Line data={dataTemplate} />
              </TabPanel>
              <TabPanel>
                <Line data={dataTemplate} />
              </TabPanel>
              <TabPanel>
                <Line data={dataTemplate} />
              </TabPanel>
              <TabPanel>
                <Line data={dataTemplate} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md ">
          
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">1</div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">2</div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">3</div>
      </div>
    </div>
  );
};

export default Grid;
