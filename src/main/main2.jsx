import React, { useState, createContext } from "react";
import Sidebar from "../sidebar/sidebar.jsx";

import "./main.css";
import { toast } from "react-toastify";
import axios from "axios";

export const saveContext = createContext();

const Main = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isOn, setIsOn] = useState("off");
  const [saveData, setSaveData] = useState([]);

  const darkModeToggle = () => {
    if (!darkMode) {
      setDarkMode(true);
      setIsOn("on");
    } else {
      setDarkMode(false);
      setIsOn("off");
    }
  };

  const home = () => {
    setIsLoading(true);
    setDarkMode(false);
    setIsOn("off");
    setResultData([]);
    setInputData("");
  };

  const recentSearch = async (eachData) => {
    setResultData([]);
    setIsLoading(false);
    setShowLoader(true);
    setInputData(eachData);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBE9xbENPJURmat3usnhN8TNeGvioRSQeY",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: eachData,
                },
              ],
            },
          ],
        },
      });
      const ans = response.data.candidates[0].content.parts[0].text;
      const ans2 = ans.split("**");

      setResultData(ans2);
      toast.success("Success!");
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Error fetching data. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  const onSearch = async () => {
    if (inputData.trim() === "") {
      toast.warn("Please enter a prompt!");
      return;
    }
    console.log(saveData.length);
    setResultData([]);
    setSaveData([...saveData, inputData]); // Use functional update for saveData
    setIsLoading(false);
    setShowLoader(true);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBE9xbENPJURmat3usnhN8TNeGvioRSQeY",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: inputData,
                },
              ],
            },
          ],
        },
      });
      const ans = response.data.candidates[0].content.parts[0].text;
      const ans2 = ans.split("**");

      setResultData(ans2);

      toast.success("Success!");
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Error fetching data. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <saveContext.Provider value={{ saveData, recentSearch, setSaveData }}>
      <>
        <div className="app-container">
          <div className="sidebar-section">
            <Sidebar />
          </div>
          <div className="main-section">
            <nav className="mb-4">
              <div className="d-flex justify-content-between nav-content">
                <h4 className="mt-2">Gemini</h4>
                <div className="d-flex">
                  <div
                    className="new d-flex justify-content-start align-start "
                    onClick={home}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      className="bi bi-plus-lg plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                      />
                    </svg>
                    <h5 className="pl-3 mt-2">New Chat</h5>
                  </div>

                  <div className="ml-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      className="bi bi-moon ai moon"
                      viewBox="0 0 16 16"
                      onClick={darkModeToggle}
                    >
                      <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                    </svg>
                  </div>
                </div>
              </div>
              <hr />
            </nav>

            <div className="search-section mt-3">
              {isLoading && (
                <div className="text-start">
                  <h1>Hello Dev,</h1>
                  <h1 className="mt-2">How Can I help you today...</h1>
                </div>
              )}

              {showLoader && (
                <div className="d-flex justify-content-center flex-column align-items-center w-100 loader">
                  <div className="d-flex justify-content-start w-100 mb-5 p-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      fill="currentColor"
                      className="bi bi-stars chatgpt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                    </svg>
                  </div>
                  <div className="d-flex justify-content-center w-100 mb-3 p-4 loader-animation"></div>
                  <div className="d-flex justify-content-center w-100 mb-3 p-4 loader-animation"></div>
                  <div className="d-flex justify-content-center w-100 mb-3 p-4 loader-animation"></div>
                  <div className="d-flex justify-content-center w-100 mb-3 p-4 loader-animation"></div>
                  <div className="d-flex justify-content-center w-100 mb-3 p-4 loader-animation"></div>
                </div>
              )}

              {isLoading && (
                <div className="gemini-cards container">
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3  mb-2">
                      <div className="card d-flex justify-content-between flex-column p-2">
                        <div className="mb-3">
                          <p>
                            Suggest Beautiful places to see on an upcoming road
                            trip.
                          </p>
                        </div>
                        <div className="m-2 text-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-compass mt-3 text-right"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 col-xl-3  mb-2">
                      <div className="card d-flex justify-content-between flex-column p-2">
                        <div className="mb-3">
                          <p>Briefly explain how AI works.</p>
                        </div>
                        <div className="m-2 text-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-compass mt-3 text-right"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 col-xl-3  mb-2">
                      <div className="card d-flex justify-content-between flex-column p-2">
                        <div className="mb-3">
                          <p>
                            Tell me about the best historical sites in Rome.
                          </p>
                        </div>
                        <div className="m-2 text-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-compass mt-3 text-right"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 col-xl-3  mb-2">
                      <div className="card d-flex justify-content-between flex-column p-2">
                        <div className="mb-3">
                          <p>
                            Give me a recipe for a quick and healthy breakfast.
                          </p>
                        </div>
                        <div className="m-2 text-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-compass mt-3 text-right"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isLoading && (
                <ul className={`result-list ${isOn}`}>
                  {resultData.map((eachLine, index) => {
                    if (index % 2 === 1) {
                      return (
                        <li key={index}>
                          <pre className="font">{eachLine}</pre>
                        </li>
                      );
                    } else {
                      return (
                        <pre key={index} className="font">
                          {eachLine}
                        </pre>
                      );
                    }
                  })}
                </ul>
              )}

              <div className="d-flex justify-content-center search-bar">
                <input
                  type="text"
                  className="w-100 mr-3"
                  placeholder="Enter your prompt here..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearch();
                    }
                  }}
                />

                <svg
                  xmlns="http://www.w3.org/4000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-image mic"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-mic mr-3 mic"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-send mic"
                  viewBox="0 0 16 16"
                  onClick={onSearch}
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </>
    </saveContext.Provider>
  );
};

export default Main;
