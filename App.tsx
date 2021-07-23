import { yupResolver } from "@hookform/resolvers/yup";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";
import { TextField } from "./src/components/TextField";
import { ToggleField } from "./src/components/ToggleField";

// Define the form schema using Typescript
type FormData = {
  email: string;
  "phone number": string;
  hungry: boolean;
  food: string;
};

// Define the form validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email().required(),
  // A very simple phone number validation using a regular expression
  "phone number": yup
    .string()
    .matches(/^\+?\d{9,15}$/)
    .required(),
});

export default function App() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const watchHungry = watch("hungry", false);

  // In real life you would probably want to do a POST request to your server or something similar
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
          name="phone number"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              label={name}
              onBlur={onBlur}
              clearButtonMode="unless-editing"
              onChangeText={onChange}
              value={value}
              error={errors["phone number"]?.message}
            />
          )}
        />

        <Controller
          name="hungry"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <ToggleField onValueChange={onChange} value={value} label={name} />
          )}
        />

        {watchHungry && (
          <Controller
            name="food"
            control={control}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <TextField
                label={name}
                onBlur={onBlur}
                clearButtonMode="unless-editing"
                onChangeText={onChange}
                value={value}
                error={errors.food?.message}
              />
            )}
          />
        )}

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
