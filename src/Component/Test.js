import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Question from "./Qustions";

function Test({setName}) {
  const id = useParams();
  const [data, setData] = useState([]);
  const [qNum, setQNum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://interviewapi.ngminds.com/getQuizData")
      .then((response) => response.json())
      .then((json) =>
        json.tests.length
          ? setData(json.tests.find((el) => el.name === id.id))
          : setData(data)
      );
      

  }, [id]);

  const onSubmitHandler = () => {
    let test = JSON.parse(localStorage.getItem(JSON.stringify(data.name)));
    let b = data.questions.map((el, id) => {
      if (el.type !== undefined) {
        let c = el.correctOptionIndex.filter((elm) => test[id][elm] === true);
        if (el.correctOptionIndex.length === c.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return test[id][el.correctOptionIndex] === true;
      }
    });

    localStorage.setItem("result", JSON.stringify(b));
    localStorage.removeItem(JSON.stringify(data.name));
    navigate(`/finish/${data.name}`);
  };

  if (data.length !== 0) {
    return (
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">{data.name}</div>
              <div className="panel-body">
                <Question
                  quest={data.questions[qNum]}
                  data={data}
                  count={qNum}
                  name={data.name}
                />
                <div className="panel-footer">
                  <button
                    className="btn btn-success"
                    onClick={() => {setQNum((prev) => prev - 1);}}
                    disabled={qNum === 0}
                  >
                    Prev
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => setQNum((prev) => prev + 1)}
                    disabled={qNum > data.questions.length - 2}
                  >
                    Next
                  </button>
                  <button
                    className="pull-right btn btn-danger"
                    onClick={() => onSubmitHandler()}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}
export default Test;
