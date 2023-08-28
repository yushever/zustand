import { Button } from "@chakra-ui/react";
import { useTodos } from "../store";

export default function FetchTodos() {
  const { loading, error, fetchTodos } = useTodos((state) => ({
    loading: state.loading,
    error: state.error,
    fetchTodos: state.fetchTodos,
  }));
  console.log("render");

  return (
    <Button isLoading={loading} onClick={fetchTodos}>
      {!error ? "Get todos" : { error }}
    </Button>
  );
}
