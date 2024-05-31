import React, { useEffect, useState } from "react";
import { Image, Form, Button } from "react-bootstrap";
import userimg from "~/assets/user_profile.png";
import userticket from "~/assets/user_tickets.svg";
import {
  serverUserInfo,
  serverLogout,
  serverCheckPassword,
  serverGetImage,
  serverInputImage,
} from "~/lib/apis/auth";
import { useNavigate } from "react-router-dom";
import useredit from "~/assets/user_edit.svg";
import logout from "~/assets/user_logout.svg";
import backIcon from "../../assets/back-icon.png";
import imgIcon from "../../assets/img-icon.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "~/store/reducers/user";
import Loading from "../loading-page/Loading";

const MyInfo = () => {
  // 첫 렌더링시 user의 정보를 get요청 보내서 가져옴
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [pw_before, setPasswordBefore] = useState("");
  const [pw_after, setPasswordAfter] = useState("");
  const [pwchange, setPasswordChange] = useState(false);
  const [pwcorrect, setPasswordCorrect] = useState();

  const [userImage, setUserImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 이미지 가져 오기 함수
  const fetchUserImage = async () => {
    try {
      const imageData = await serverGetImage();

      if (imageData) {
        setUserImage(imageData);
      }
    } catch (error) {
      console.error("에러다아아", error);
    }
  };

  // 이미지 업로드 함수
  const uploadImage = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";

      input.onchange = async (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("image", file);

        const response = await serverInputImage(formData);

        // 서버에서 새 이미지 URL을 받아와서 설정
        if (response && response.data && response.data.imageUrl) {
          setUserImage(response.data.imageUrl);
        }

        fetchUserImage();
      };

      input.click();
    } catch (error) {
      console.error("이미지 넣기 에러", error);
    }
  };

  useEffect(() => {
    fetchUserImage();
  }, []);

  useEffect(() => {
    try {
      serverUserInfo().then((data) => {
        setUser(data);
        setPassword(data.password);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(password);
  // !!** password 해싱 전 값 가져오는 법 확인하고 수정하기

  // 현재 비밀번호와 다른 비밀번호로 수정해야 함
  // ** 비밀번호 조건 추가되면 코드 수정 !
  useEffect(() => {
    if (pw_after && pw_before === pw_after) {
      setPasswordChange(true);
      console.log("비밀번호 변경가능");
    } else {
      setPasswordChange(false);
    }
  }, [pw_after]);

  // 현재 비밀번호가 정확한지 확인
  useEffect(() => {
    try {
      serverCheckPassword({ saltPassword: password, password: pw_before }).then(
        (data) => {
          console.log(`현재 비밀번호가 정확한지 확인: ${data}`);
          if (data) {
            setPasswordCorrect(data);
          } else {
            setPasswordCorrect(data);
          }
        }
      );

      console.log(`setPasswordCorrect: ${pwcorrect}`);
    } catch (error) {
      setPasswordCorrect(false);
    }
  }, [pw_before]);

  // 로그아웃 버튼을 누르면 호출되는 함수
  const handlelogout = async () => {
    serverLogout().then((success) => {
      console.log(success);
      if (success !== false) {
        // 다시 redux 설정 지우기
        dispatch(logoutUser());
        navigate("/");
      }
    });
  };

  // 응답 전에 user 정보를 렌더링하려고 하면 null인 상태에서 렌더링이 먼저 됨
  // => user가 null인 경우는 Loading화면 표시
  if (!user) {
    return <Loading/>;
  }

  // 뒤로가기 핸들러
  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Image onClick={handleBackPage} className="icon" src={backIcon} />
      <div className="info-box">
        <section className="profile-section">
          <Image
            className="circular-image"
            src={userImage ? URL.createObjectURL(userImage) : userimg}
          ></Image>
          <p>{user.nickname}</p>
          {/* <Button className="upload-button" onClick={uploadImage}>
            <im
          </Button> */}
          <Image
            src={imgIcon}
            className="upload-button"
            onClick={uploadImage}
          />
        </section>

        <div className="vertical-line"></div>
        <section className="user-info-section">
          <section className="user-ticket-section">
            <div className="user-ticket-title">
              <Image src={userticket}></Image>
              <p> 열람권 </p>
            </div>
            <div>
              {" "}
              보유한 열람권: <b>{user.ticket}</b> 개
            </div>
          </section>

          <section className="user-pw-section">
            <div className="user-edit-title">
              <Image src={useredit}></Image>
              <p> 내 정보 수정 </p>
            </div>
            <Form className="user-password-edit-group">
              <Form.Group controlId="formBasicPassword">
                {/* 이 부분이 현재 비번 입력 받고 태그를 띄우는 부분입니다! */}
                {pw_before === "" ? null : pwcorrect ? (
                  <p id="match">비밀번호가 일치합니다!</p>
                ) : (
                  <p id="notMatch">※ 비밀번호가 일치하지 않습니다.</p>
                )}

                <Form.Control
                  className="password-before"
                  type="password"
                  placeholder="현재 비밀번호"
                  value={pw_before}
                  onChange={(e) => setPasswordBefore(e.target.value)}
                />

                <Form.Control
                  className="password-after"
                  type="password"
                  placeholder="변경할 비밀번호"
                  value={pw_after}
                  onChange={(e) => setPasswordAfter(e.target.value)}
                />
              </Form.Group>
            </Form>
          </section>

          <section className="user-logout-section">
            <div className="user-logout-title">
              <Image src={logout}></Image>
              <Button onClick={handlelogout}> 로그아웃 </Button>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default MyInfo;
