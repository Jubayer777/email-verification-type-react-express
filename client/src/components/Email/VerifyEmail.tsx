import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./verifyEmail.css";
import expiredLogo from "../../asset/images/expired.png";
import verifiedLogo from "../../asset/images/verified.png";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export interface VerifyEmailProps {}

const cypherKey: string = String(process.env.REACT_APP_CYPHER_KEY);

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
  const { userId } = useParams<string>();
  const [verifyData, setVerifyData] = useState<any>({});

  const decryptId = (str: any): string => {
    const decodedStr = decodeURIComponent(str);
    return AES.decrypt(decodedStr, cypherKey).toString(enc.Utf8);
  };
  const uId: string = decryptId(userId);
  const verifyUser = async (id: string) => {
    // const url=`http://localhost:4000/user/verify/${id}`;//nest
    // const url=`http://localhost:5001/api/verify/${id}`;//express
    const url = `http://localhost:5004/api/verify/${id}`; //typescript
    await axios
      .get(url)
      .then((result) => {
        setVerifyData(result.data);
      })
      .catch((error) => {
        console.log("err", error.message);
      });
  };

  useEffect(() => {
    verifyUser(uId);
  }, [userId]);

  return (
    <div className="verifyBody">
      <div className="verifyCard">
        {verifyData.user ? (
          <>
            <img className="verifyImg" src={verifiedLogo} alt="" />
            <div className="verifyTxt">
              <h3>Hi, {verifyData.user.userName}</h3>
              <p>{verifyData.message}</p>
            </div>
          </>
        ) : (
          <>
            <img className="verifyImg" src={expiredLogo} alt="" />
            <div className="verifyTxt">
              <h3>OPPS...!</h3>
              <p>{verifyData.message}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
