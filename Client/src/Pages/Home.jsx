import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppState } from "../App";
import axios from "../axiosConfig";

function Home() {
  const [question, setQuestion] = useState([]);
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");

  async function getQuestions() {
    try {
      const { data } = await axios.get("/questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestion(data?.questions);
    } catch (error) {
      console.log("errrrrrrrr", error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);
  console.log(question)

  return (
    <div>
      <h1>Home</h1>
      <br />
      <h2>welcome : {user.username}</h2>
      <div>
        {question.length > 0 ? (
          question.map((question, index) => (
            <div key={index}>
              <h3>{question.title}</h3>
              <p>{question.description}</p>
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
