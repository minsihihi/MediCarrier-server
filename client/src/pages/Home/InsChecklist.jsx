import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Function to normalize condition names (replace spaces or underscores)
const normalizeConditionName = (name) =>
  name.replace(/ /g, "_").replace(/_/g, "_");

function InsChecklist() {
  const location = useLocation();
  const { type, mainCondition, subCondition } = location.state || {};

  // Normalize the condition names
  const normalizedMainCondition = normalizeConditionName(mainCondition || "");
  const normalizedSubCondition = normalizeConditionName(subCondition || "");

  console.log("Received state:", {
    type,
    normalizedMainCondition,
    normalizedSubCondition,
  });

  const commonDocuments = [
    { name: "보험금 청구서", issuer: "보험회사" },
    { name: "개인(신용)정보처리동의서", issuer: "보험회사" },
    { name: "신분증사본", issuer: "개인" },
  ];

  const conditionDocuments = {
    입원: [
      { name: "진단서", issuer: "의료기관" },
      { name: "진료비계산서(영수증)", issuer: "의료기관" },
      {
        name: "진료비세부내역서(비급여가 없는 경우, 생략 가능)",
        issuer: "의료기관",
      },
    ],
    통원: [
      { name: "3만원 이상", issuer: "의료기관" },
      { name: "진료비계산서(영수증)", issuer: "의료기관" },
      { name: "진료비세부내역서", issuer: "의료기관" },
      { name: "3만원 이상 10만원 미만", issuer: "의료기관" },
      { name: "진료비계산서(영수증)  ", issuer: "의료기관" },
      { name: "진료비 세부 내역서", issuer: "의료기관" },
      { name: "처방전", issuer: "의료기관" },
      { name: "10만원 이상", issuer: "의료기관" },
      { name: "진료비계산서(영수증) ", issuer: "의료기관" },
      { name: "진료비 세부 내역서", issuer: "의료기관" },
      { name: "진단명이 포함된 서류", issuer: "의료기관" },
    ],
    사망: [
      { name: "수익자 미지정 시", issuer: "의료기관" },
      { name: "상속관계 확인서류", issuer: "의료기관" },
      { name: "1인의 상속인의 전액 수령을 원하는 경우", issuer: "의료기관" },
      { name: "상속인의 각각의 위임장", issuer: "의료기관" },
      { name: "인감도장(또는 위임장에 인감도장 날인)", issuer: "의료기관" },
      { name: "인감증명서(또는 본인서명사실확인서)", issuer: "의료기관" },
    ],
    후유장해: [{ name: "후유장해 진단서", issuer: "의료기관" }],
    수술: [
      {
        name: "수술 확인서 또는 진단서(수술명 및 수술일자 포함)",
        issuer: "의료기관",
      },
    ],
    진단: [
      { name: "진단서", issuer: "의료기관" },
      { name: "조직검사결과지", issuer: "의료기관" },
    ],
    교통사고: [{ name: "사고사실 확인서", issuer: "개인" }],
    산재사고: [
      {
        name: "요양급여신청서 또는 보험급여지급확인원",
        issuer: "근로복지공단",
      },
    ],
    군복무중_사고: [{ name: "공무상병인증서", issuer: "군부대" }],
    의료사고_등_법원분쟁: [{ name: "법원 판결문", issuer: "법원" }],
    기타_상해사고: [{ name: "공공기관 사고사실확인서", issuer: "공공기관" }],
    사고확인서류_발급불가: [
      {
        name: "병원 초진차트 등 상해사고 증명서류 및 보험금청구서상 사고내용 기재",
        issuer: "의료기관",
      },
    ],
    형사합의지원금: [
      { name: "공소장", issuer: "법원" },
      { name: "공탁서", issuer: "법원" },
      { name: "피해자 공탁금 출금 확인서 (미합의 시)", issuer: "법원" },
      { name: "형사합의금이 입금된 내역", issuer: "금융기관" },
    ],
    교통사고처리지원금: [
      { name: "공소장", issuer: "법원" },
      { name: "공탁서", issuer: "법원" },
      { name: "피해자 공탁금 출금 확인서 (미합의 시)", issuer: "법원" },
      { name: "형사합의금이 입금된 내역", issuer: "금융기관" },
    ],
    자동차사고_변호사선임비용: [
      { name: "판결문", issuer: "법원" },
      { name: "구속영장", issuer: "법원" },
      { name: "공소장", issuer: "법원" },
    ],
    면허정지_및_취소위로금: [
      { name: "운전경력증명서", issuer: "경찰서" },
      {
        name: "운전면허 정지처분 결정통지서 또는 면허정지 행정처분 확인서",
        issuer: "경찰서",
      },
      {
        name: "운전면허 취소처분 결정통지서 또는 면허취소 확인원",
        issuer: "경찰서",
      },
    ],
    자동차보험할증지원금: [
      { name: "자동차보험 보험금지급결의서", issuer: "보험회사" },
    ],
    자동차부상치료비: [
      { name: "치료비 지급결의서", issuer: "보험회사" },
      { name: "진단서", issuer: "의료기관" },
    ],
    자동차사고성형수술비: [{ name: "진단서 또는 소견서", issuer: "의료기관" }],
  };

  const getDocuments = () => {
    let documents = [...commonDocuments];

    // Add mainCondition documents if available
    if (normalizedMainCondition) {
      documents = [
        ...documents,
        ...(conditionDocuments[normalizedMainCondition] || []),
      ];
    }

    // Add subCondition documents if available
    if (normalizedSubCondition) {
      documents = [
        ...documents,
        ...(conditionDocuments[normalizedSubCondition] || []),
      ];
    }

    // Remove duplicates
    const uniqueDocuments = [];
    const documentNames = new Set();

    documents.forEach((doc) => {
      if (!documentNames.has(doc.name)) {
        documentNames.add(doc.name);
        uniqueDocuments.push(doc);
      }
    });

    return uniqueDocuments;
  };

  const documents = getDocuments();

  const documentsByIssuer = documents.reduce((acc, doc) => {
    if (!acc[doc.issuer]) {
      acc[doc.issuer] = [];
    }
    acc[doc.issuer].push(doc.name);
    return acc;
  }, {});

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };

  const specialDocuments = [
    "3만원 이상",
    "3만원 이상 10만원 미만",
    "10만원 이상",
    "수익자 미지정 시",
    "1인의 상속인의 전액 수령을 원하는 경우",
  ];

  return (
    <ChecklistContainer>
      <Header>
        <button
          style={{ border: 0, backgroundColor: "transparent" }}
          onClick={navigateToHome}
        >
          <img src="../img/arrow-left.svg" alt="back" />
        </button>
        보험 알아보기
      </Header>
      <Title>
        {type === "질병"
          ? `질병 보험(${mainCondition}) 청구시 필요 서류`
          : `상해 보험(${mainCondition}-${subCondition}) 청구시 필요 서류`}
      </Title>
      <DocumentContainer>
        {Object.entries(documentsByIssuer).map(([issuer, docs]) => (
          <IssuerGroup key={issuer}>
            <IssuerName>{issuer}</IssuerName>
            <DocumentList>
              {docs.map((doc, index) => (
                <DocumentItem
                  key={index}
                  issuer={issuer}
                  special={specialDocuments.includes(doc)}
                >
                  {doc}
                </DocumentItem>
              ))}
            </DocumentList>
          </IssuerGroup>
        ))}
      </DocumentContainer>
    </ChecklistContainer>
  );
}

export default InsChecklist;

const Header = styled.div`
  position: fixed;
  background: #ffffff;
  z-index: 10;
  top: 0px;
  left: 0px;
  display: inline-flex;
  height: 29px;
  padding: 13px 17px;
  align-items: center;
  width: 359px;
  gap: 95px;
  color: var(--mainblue, var(--Color, #4a7dff));
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1px;
  img {
    cursor: pointer;
  }
`;

const ChecklistContainer = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  margin-top: 31px;
  padding: 15px 0 20px 0;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
`;

const DocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 323px;
  padding: 14px 13px;
  align-items: flex-start;
  border-radius: 10px;
  background: #f8f8f8;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.03);
  gap: 14px;
`;

const IssuerGroup = styled.div`
  /* margin-bottom: 14px; */
`;

const IssuerName = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 8px;
`;

const DocumentList = styled.ul`
  /* list-style-type: none; */
  margin: 0;
  padding: 0;
`;

const DocumentItem = styled.li`
  margin-bottom: 10px;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  list-style: none;
  position: relative;
  padding-left: 25px; /* 이미지 크기에 맞게 조정 */

  ${({ special }) =>
    special &&
    `
    margin: 2px 0 8px 0;
    display: flex;
    height: 15px;
    width: 90%;
    padding: 4px 14px;
    justify-content: center;
    align-items: center;
    gap: 0px;
    border-radius: 200px;
    background: var(--Color, #4a7dff);
    color: #fff;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    `}

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 22px; /* 이미지 크기에 맞게 조정 */
    height: 22px; /* 이미지 크기에 맞게 조정 */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    ${({ issuer }) => {
      if (issuer === "의료기관") {
        return `background-image: url('../../img/파랑_체크박스.svg');`;
      } else if (issuer === "보험회사") {
        return `background-image: url('../../img/노랑_체크박스.svg');`;
      } else if (
        (issuer === "개인",
        "군부대",
        "근로복지공단",
        "법원",
        "공공기관",
        "금융기관",
        "경찰서")
      ) {
        return `background-image: url('../../img/회색_체크박스.svg');`;
      }
    }}
  }
`;
