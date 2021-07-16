import { yupResolver } from "@hookform/resolvers/yup";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";
import { TextField } from "./src/components/TextField";

type FormData = {
  email: string;
  "Phone number": string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  "Phone number": yup
    .string()
    .matches(/^\+?\d{9,15}$/)
    .required(),
});

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <Container>
      <StatusBar style="auto" />

      <ScrollView>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              label={name}
              onBlur={onBlur}
              clearButtonMode="unless-editing"
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="Phone number"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              label={name}
              onBlur={onBlur}
              clearButtonMode="unless-editing"
              onChangeText={onChange}
              value={value}
              error={errors["Phone number"]?.message}
            />
          )}
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </Container>
  );
}

const ScrollView = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
