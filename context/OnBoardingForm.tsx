"use client";

import {
  Action,
  ActionType,
  onboardingFormContext,
  onboardingFormReducer,
} from "@/types/onBoardingContext";
import { UseCase } from "@prisma/client";
import { Session } from "next-auth";
import React, { createContext, useContext, useReducer } from "react";

// 1. Fixed the context name to match usage
export const OnboardingFormCtx = createContext<onboardingFormContext | null>(
  null
);

function onBoardingFormReducer(state: onboardingFormReducer, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionType.CHANGE_SITE: {
      return {
        ...state,
        currentStep: payload as 1 | 2 | 3,
      };
    }
    case ActionType.NAME:
      return {
        ...state,
        name: payload as string,
      };
    case ActionType.SURNAME:
      return {
        ...state,
        surname: payload as string,
      };
    case ActionType.USECASE:
      return {
        ...state,
        useCase: payload as UseCase,
      };
    case ActionType.PROFILEIMAGE:
      return {
        ...state,
        profileImage: payload as string | null | undefined,
      };
    case ActionType.WORKSPACE_NAME:
      return {
        ...state,
        workspaceName: payload as string,
      };
    case ActionType.WORKSPACE_IMAGE:
      return {
        ...state,
        workspaceImage: payload as string | null | undefined,
      };
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
  session: Session;
}

const initialFormState: onboardingFormReducer = {
  currentStep: 1,
  name: null,
  surname: null,
  profileImage: null,
  useCase: null,
  workspaceName: "",
  workspaceImage: null
};

export const OnBoardingFormProvider = ({ children, session }: Props) => {
  // 2. Fixed Children to children
  const [state, dispatch] = useReducer<
    React.Reducer<onboardingFormReducer, Action>
  >(onBoardingFormReducer, {
    ...initialFormState,
    name: session.user.name,
    surname: session.user.username,
    profileImage: session.user.image,
  });
  return (
    <OnboardingFormCtx.Provider value={{ ...state, dispatch }}>
      {" "}
      {/* 3. Fixed Provider syntax */}
      {children}
    </OnboardingFormCtx.Provider>
  );
};

export const useOnboardingForm = () => {
  const ctx = useContext(OnboardingFormCtx);
  if (!ctx) throw new Error("invalid user");
  console.log(ctx, "CCCCCCCCCC");
  return ctx;
};
