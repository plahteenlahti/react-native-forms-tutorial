import React from "react";
import { FC } from "react";
import styled from "styled-components/native";
import { Switch, SwitchProps } from "react-native";

type Props = {
  label: string;
} & SwitchProps;

export const ToggleField: FC<Props> = ({ label, ...props }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Switch {...props} />
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
