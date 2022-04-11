import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://interviewapi.ngminds.com/getQuizData")
      .then((response) => response.json())
      .then((json) => setData(json.tests));
  }, []);
  return (
    <div className="container">
      <div className="row">
        <h1>My Interview Portal</h1>
        <hr />
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Test</th>
                <th>No of Questions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((index, id) => {
                return (
                  <tr key={id}>
                    <td>{index.name}</td>
                    <td>{index.questions.length}</td>
                    <td>
                      <Link
                        to={`/test/${index.name}`}
                        className="btn btn-warning"
                      >
                        Start Test
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
