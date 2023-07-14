import { deleteTodo, switchTodo, updateTodo } from "../../../api/bklist";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import React, { useState } from "react";
import HeightBox from "../common/HeightBox";

import {
  StyledDiv,
  StyledTitle,
  StyledContents,
  TodoButton,
  FlexButtonBox,
  FlexTitleBox,
} from "./styles";

function Todo({ todo, isActive }) {
  // 삭제 확인 용 메시지 관리
  const CONFIRM_MESSAGE = `[삭제 확인]\n\n"${todo.title}" 항목을 정말로 삭제하시겠습니까?\n삭제를 원치 않으시면 [취소] 버튼을 눌러주세요.`;

  // 완료, 취소를 handling하는 함수
  const handleSwitchButton = () => {
    const payload = {
      id: todo.id,
      isDone: !todo.isDone,
    };
    switchMutation.mutate(payload);
  };

  // 수정
  const handlerUpdateButton = () => {
    const newTodo = {
      id: todo.id,
      title: updatetitle,
      contents: updatecontents,
    };
    updateMutation.mutate(newTodo);
  };

  const [updatetitle, setUpdateTitle] = useState("");
  const [updatecontents, setUpdateContents] = useState("");

  // title의 수정 감지 함수
  const updateTitleChange = (event) => {
    setUpdateTitle(event.target.value);
  };

  // contents의 수정 감지 함수
  const updateContentsChange = (event) => {
    setUpdateContents(event.target.value);
  };

  // 삭제
  const handleRemoveButton = () => {
    deleteMutation.mutate(todo.id);
  };

  // query
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const switchMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <StyledDiv>
      <FlexTitleBox>
        <StyledTitle>순위 : {todo.title}</StyledTitle>
      </FlexTitleBox>
      <HeightBox height={10} />
      <StyledContents>하고싶은것 : {todo.contents}</StyledContents>
      <input
        id="updatetitle"
        placeholder="수정 순위"
        value={updatetitle}
        onChange={updateTitleChange}
      />
      <input
        id="updatecontents"
        placeholder="수정 내용"
        value={updatecontents}
        onChange={updateContentsChange}
      />
      <HeightBox height={20} />
      <FlexButtonBox>
        <TodoButton onClick={handleSwitchButton}>
          {isActive ? "완료" : "취소"}
        </TodoButton>
        <TodoButton onClick={handleRemoveButton}>삭제</TodoButton>
        <TodoButton onClick={handlerUpdateButton}>수정</TodoButton>
      </FlexButtonBox>
    </StyledDiv>
  );
}

export default Todo;
