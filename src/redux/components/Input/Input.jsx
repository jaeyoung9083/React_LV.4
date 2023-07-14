import React, { useState } from "react";
import LabledInput from "../common/LabledInput";
import HeightBox from "../common/HeightBox";
import { FlexDiv } from "./styles";
import RightMarginBox from "../common/RightMarginBox";
import "./styles";
import { StyledDiv } from "./styles";
import { addTodo } from "../../../api/bklist";
import { useMutation, useQueryClient } from "react-query";
import shortid from "shortid";

function Input() {
  // 쿼리 관련 코드
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  // 컴포넌트 내부에서 사용할 state (순위, 내용) 정의
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 에러 메시지 발생 함수
  const getErrorMsg = (errorCode, params) => {
    switch (errorCode) {
      case "01":
        return alert(
          `[필수 입력 값 검증 실패 안내]\n\n제목과 내용은 모두 입력돼야 합니다. 입력값을 확인해주세요.\n입력된 값(제목 : '${params.title}', 내용 : '${params.contents}')`
        );
      default:
        return `시스템 내부 오류가 발생하였습니다. 고객센터로 연락주세요.`;
    }
  };

  // title의 변경을 감지하는 함수
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // contents의 변경을 감지하는 함수
  const handleContentsChange = (event) => {
    setContents(event.target.value);
  };

  // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    // 제목과 내용 있어야 인증
    // "01" : 필수 입력값 검증 실패 안내
    if (!title || !contents) {
      return getErrorMsg("01", { title, contents });
    }

    // 추가하려는 todo를 newTodo라는 객체로 세로 만듦
    const newTodo = {
      title,
      contents,
      isDone: false,
      id: shortid.generate(),
    };

    mutation.mutate(newTodo);

    // state 두 개를 초기화
    setTitle("");
    setContents("");
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmitButtonClick}>
        <FlexDiv>
          <RightMarginBox margin={10}>
            <LabledInput
              id="title"
              label="버킷리스트"
              placeholder="버킷리스트 순위"
              value={title}
              onChange={handleTitleChange}
            />
            <HeightBox height={10} />
            <LabledInput
              id="contents"
              label="내용"
              placeholder="버킷리스트"
              value={contents}
              onChange={handleContentsChange}
            />
          </RightMarginBox>
          <button type="submit">추가하기</button>
        </FlexDiv>
      </form>
    </StyledDiv>
  );
}

export default Input;
