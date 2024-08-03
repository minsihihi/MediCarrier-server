import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDrag } from "@use-gesture/react";

const Sheet = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isOpen", "isExpand"].includes(prop),
})`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  width: 393px;
  height: 50%;
  max-height: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 0;
  touch-action: none; /* 터치 제스처 문제 해결 */
`;

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 0;
`;

const Head = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; /* 상대적 위치 설정 */
  touch-action: none; /* 터치 제스처 비활성화 */
  p {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 550;
    line-height: normal;
    letter-spacing: -0.64px;
    padding: 25px 309px 0 21px;
    white-space: nowrap;
  }
`;

const DragHandle = styled.div`
  width: 50px;
  height: 5px;
  background: #ccc;
  border-radius: 5px;
  cursor: pointer;
  position: absolute; /* 절대적 위치 설정 */
  top: 10px; /* 헤더 내에서 드래그 핸들 위치 조정 */
`;

const Content = styled.div`
  flex: 1;
  padding: 0 20px 80px 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const BottomSheet = ({ isOpen, onClose, children, autoExpand }) => {
  const [isExpand, setIsExpand] = useState(autoExpand);
  const [translateY, setTranslateY] = useState(autoExpand ? 0 : 200);
  const [initialOffset, setInitialOffset] = useState(autoExpand ? 0 : 200);
  const sheetRef = useRef(null);

  const bind = useDrag(
    (state) => {
      // 드래그 시작 시
      if (state.first) {
        setInitialOffset(-state.offset[1] + initialOffset);
      }

      // 드래그 방향이 위쪽일 때
      if (state.offset[1] < 0) {
        setIsExpand(true);
        setTranslateY(Math.max(state.offset[1] + initialOffset, 0));
      } else if (state.offset[1] >= 0) {
        // 드래그 방향이 아래쪽일 때
        setIsExpand(false);
        setTranslateY(Math.min(state.offset[1] + initialOffset, 200));
      }
    },
    {
      from: () => [0, translateY],
      filterTaps: true,
      bounds: { top: -200, bottom: 0 },
      enabled: (state) => state.offset[1] < -10, // 헤더 영역에서만 드래그 허용
    }
  );

  useEffect(() => {
    if (isOpen) {
      setTranslateY(autoExpand ? 0 : 200);
      setIsExpand(autoExpand);
    }
  }, [isOpen, autoExpand]);

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Sheet
        ref={sheetRef}
        isExpand={isExpand}
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <Head {...bind()}>
          <DragHandle />
          <p>검색 결과</p>
        </Head>
        {isExpand && (
          <Content>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onClick: (e) => {
                  // 자식 컴포넌트의 클릭 이벤트 처리
                  if (child.props.onClick) {
                    child.props.onClick(e);
                  }
                },
              })
            )}
          </Content>
        )}
      </Sheet>
    </>
  );
};

export default BottomSheet;
