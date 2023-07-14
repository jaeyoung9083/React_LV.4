import React from "react";
import { StyledBkListHeader, StyledBkListBox } from "./styles";
import Todo from "../Todo";
import { useQuery } from "react-query";
import { getTodos } from "../../../api/bklist";

function TodoList({ isActive }) {
  const { isLoading, isError, data } = useQuery("todos", getTodos);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }
  if (isError) {
    return <h1>오류 발생</h1>;
  }

  return (
    <div>
      <StyledBkListHeader>
        {isActive ? "버킷리스트 목록" : "실천"}
      </StyledBkListHeader>
      <StyledBkListBox>
        {data
          .filter((item) => item.isDone === !isActive)
          .map((item) => {
            return <Todo key={item.id} todo={item} isActive={isActive} />;
          })}
      </StyledBkListBox>
    </div>
  );
}

export default TodoList;
