import React, { FC } from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import styled from "styled-components/native";

type Props = {
  label: string;
  error?: string;
} & TextInputProps; // extending TextInputProps allows makes it easier to use TextField as a TextInput replacement

// Using spread syntax, exclude label and error, and use the rest of the props to be passed to Field
export const TextField: FC<Props> = ({ label, error, ...props }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Field {...props} />
      <ErrorContainer>{error && <Error>{error}</Error>}</ErrorContainer>
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  margin-bottom: 8px;
  margin-left: 4px;
  font-weight: bold;
  color: #444;
  text-transform: uppercase;
  font-size: 12px;
`;

const Field = styled(TextInput)`
  padding: 8px;
  border-radius: 8px;
  background-color: #f3f3f4;
  color: #444;
  border: 1px solid #ccc;
`;

const ErrorContainer = styled.View`
  margin-top: 4px;
  margin-left: 4px;
  height: 15px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
`;
