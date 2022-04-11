import React, { useEffect, useState } from "react";
function Question({ quest, count, name, data }) {
  const [test, setTest] = useState(
    JSON.parse(localStorage.getItem(JSON.stringify(name))) !== null
      ? JSON.parse(localStorage.getItem(JSON.stringify(name)))
      : data.questions.map((el, id) =>
          new Array(data.questions[id].options.length).fill(false)
        )
  );
  const [checkBox, setCheckBox] = useState([""]);

  useEffect(() => {
    setCheckBox(test[count]);
  }, [count]);

  const onClickHandler = (e) => {
    let a = [...checkBox];
    if (quest.type !== undefined) {
      a[e.target.value] = !a[e.target.value];
      setCheckBox(a);
    } else {
      a = new Array(quest.options.length).fill(false);
      a[e.target.value] = !a[e.target.value];
      setCheckBox(a);
    }
  };

  useEffect(() => {
    test[count] = checkBox;
    localStorage.setItem(JSON.stringify(name), JSON.stringify(test));
  }, [checkBox]);

  return (
    <form>
      <label>{quest.questionText}</label>
      {quest.options.map((op, id) => {
        return (
          <div className="radio" key={id}>
            <label>
              <input
                type={quest.type !== "Multiple-Response" ? "radio" : "checkbox"}
                name="option"
                checked={checkBox[id]}
                value={id}
                onChange={(e) => onClickHandler(e)}
              />
              {op}
            </label>
          </div>
        );
      })}
    </form>
  );
}
export default Question;
