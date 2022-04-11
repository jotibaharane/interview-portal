import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Finish(props) {
  const name = useParams();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("result"));
    setTotal(a.length);
    let result = a.filter((el) => el === true);
    setCorrect(result.length);
    return () => {
      navigate("/");
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1>My Interview Portal</h1>
        <hr />
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">{name.id} - Result</div>
            <div className="panel-body">
              <center>
                <h2 className="">Total no of Questions:{total}</h2>
                <h3 className="text-success">
                  Correct Answers: {correct}
                  <span className="text-danger">
                    Wrong Answers:{total - correct}
                  </span>
                </h3>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finish;
