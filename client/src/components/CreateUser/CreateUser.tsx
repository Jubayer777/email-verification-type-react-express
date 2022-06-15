import React, { useState } from "react";
import "./CreateUser.css";
import userPageLogo from "../../asset/images/user.png";
import axios from "axios";

export interface CreateUserProps {}

type InputDataType = {
  userName: string;
  email: string;
  expireAt: string;
};
const CreateUser: React.FC<CreateUserProps> = () => {
  const [inputData, setInputData] = useState<InputDataType>({
    userName: "",
    email: "",
    expireAt: "",
  });
  const [successData, setSuccessData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isNonEmpty: boolean = !Object.values(inputData).some(
      (x) => x === null || x === ""
    );
    if (isNonEmpty) {
      const createUser = async () => {
        //const url=`http://localhost:5001/api/user`//express
        const url = `http://localhost:5004/api/user`; //typescript
        // const url=`http://localhost:4000/user/createUser`//nest
        await axios
          .post(url, inputData)
          .then((result: any) => {
            setSuccessData(result.data);
            if(result.data.user){
              var dirtyFormID = "userForm";
              var resetForm: any = document.getElementById(dirtyFormID);
              resetForm.reset();
              setInputData({
                userName: "",
                email: "",
                expireAt: "",
              });
            }
          })
          .catch((error: any) => {
            console.log("err", error.message);
          });
      };
      createUser();
    } else {
      console.log("empty field");
    }
  };

  return (
    <div className="createUserBody">
      <div className="createUserLeft">
        <img className="createUserImg" src={userPageLogo} alt="" />
      </div>
      <div className="createUserRight">
        <div className="rightContent">
          <h3>Create User</h3>
          <form id="userForm" onSubmit={handleCreate}>
            <div className="inputSegment">
              <label className="inputLabel">UserName</label>
              <input
                className="inputField"
                type="text"
                name="userName"
                onInput={handleChange}
              />
            </div>
            <div className="inputSegment">
              <label className="inputLabel">Email</label>
              <input
                className="inputField"
                type="email"
                name="email"
                onInput={handleChange}
              />
            </div>
            <div className="inputSegment">
              <label className="inputLabel">Expire Time (Minutes)</label>
              <input
                className="inputField"
                type="text"
                name="expireAt"
                onInput={handleChange}
              />
            </div>
            <button type="submit" className="saveBtn">
              Save
            </button>
          </form>
          {successData && (
            <p className={successData.user ? "successText" : "failedText"}>
              {successData.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
