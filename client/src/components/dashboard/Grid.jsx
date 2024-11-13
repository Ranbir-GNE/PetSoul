import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Line } from "react-chartjs-2";
import pet1 from "../../assets/pet1.jpg";
import pet2 from "../../assets/pet2.jpg";
import profile from "../../assets/profilePicture.jpg";
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
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
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
        <div className="bg-gray-200 m-3 rounded-lg shadow-md p-3 flex justify-between items-center">
          <div>
            <p>Name</p>
            <p>Age</p>
            <p>Breed</p>
            <p>Spices</p>
          </div>
          <div>
            <img
              src={pet1}
              alt="Nature"
              className="object-cover h-16 w-16 rounded-full"
            />
          </div>
        </div>
        <div className="bg-gray-200 m-3 rounded-lg shadow-md p-3 flex justify-between items-center">
          <div>
            <p>Name</p>
            <p>Age</p>
            <p>Breed</p>
            <p>Spices</p>
          </div>
          <div>
            <img
              src={pet2}
              alt="Nature"
              className="object-cover h-16 w-16 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 pb-3">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md col-span-3">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Line data={dataTemplate} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Line data={dataTemplate} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Line data={dataTemplate} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Line data={dataTemplate} />
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-3 rounded-lg shadow-md grid grid-cols-1 gap-4 justify-center">
          <div>
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Pet 1</Tab>
                <Tab>Pet 2</Tab>
              </TabList>
              <TabPanel>
                <div className="flex flex-col p-2 bg-white shadow-md rounded-md">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={pet1}
                        alt="Pet picture"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        Vaccination Name
                      </p>
                      <p className="text-gray-600">Vaccination Due Date</p>{" "}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col p-2 bg-white shadow-md rounded-md">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={pet2}
                        alt="Pet picture"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        Vaccination Name
                      </p>
                      <p className="text-gray-600">Vaccination Due Date</p>{" "}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="bg-white rounded-lg shadow-md p-3 flex justify-between items-center">
            <div>
              <p>Name</p>
              <p>Contact</p>
              <p>Address</p>
              <p>Pincode</p>
            </div>
            <div>
              <img
                src={profile}
                alt="Profile Picture"
                className="object-cover h-24 w-24 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-4">
        <div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-2">
            <div className="flex items-center">
              <div className="mr-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={pet1}
                  alt="Health"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Health</p>
                <p className="text-gray-600">Health Description</p>{" "}
                <p className="text-gray-600">Allergies</p>{" "}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="mr-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={pet2}
                    alt="Health"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Health</p>
                  <p className="text-gray-600">Health Description</p>{" "}
                  <p className="text-gray-600">Allergies</p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg shadow-md col-span-2">3</div>
      </div>
    </div>
  );
};

export default Grid;
