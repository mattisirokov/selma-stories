import { useState } from "react";

import { View } from "react-native";
import { useRouter } from "expo-router";

import { useTranslation } from "react-i18next";
import { useStories } from "@/contexts/StoryContext";

import {
  CHARACTER_TRAITS,
  IMAGE_STYLES,
  STORY_THEMES,
  STORY_MORALS,
} from "@/constants/Options";

import TextInput from "@/components/create-story/TextInput";
import CreateStoryStartScreen from "@/components/create-story/CreateStoryStartScreen";
import CreateStoryStep from "@/components/create-story/CreateStoryStep";
import OptionPicker from "@/components/create-story/OptionPicker";
import NumberSelector from "@/components/create-story/AmountSelector";
import StoryCreationSummary from "@/components/create-story/StoryCreationSummary";
import LoadingStory from "@/components/create-story/LoadingStory";
import ToggleSwitch from "@/components/create-story/ToggleSwitch";

import { StoryParams } from "@/types";

const INITIAL_FORM_STATE: StoryParams = {
  title: "",
  mainCharacter: "",
  herraMattiAddition: false,
  mainCharacterTraits: [""],
  theme: [""],
  moral: "",
  setting: "",
  amountOfImages: 0,
  imageStyle: "",
  targetAge: 5, // this can be hard-coded for now
  length: "medium", // this can be hard-coded for now
  language: "Finnish", // this can be hard-coded for now
};

export default function CreateStory() {
  const [step, setStep] = useState<number>(1);
  const [formState, setFormState] = useState<StoryParams>(INITIAL_FORM_STATE);

  const { createStory, storyLoadingState, imagesLoadingState } = useStories();

  const { t } = useTranslation();
  const router = useRouter();

  const resetFormState = () => {
    setFormState(INITIAL_FORM_STATE);
  };

  const handleCreateStory = () => {
    setStep(9);
    createStory(
      formState.amountOfImages,
      {
        title: formState.title,
        theme: formState.theme,
        mainCharacter: formState.mainCharacter,
        herraMattiAddition: formState.herraMattiAddition,
        mainCharacterTraits: formState.mainCharacterTraits,
        setting: formState.setting,
        amountOfImages: formState.amountOfImages,
        imageStyle: formState.imageStyle,
        targetAge: 5,
        moral: formState.moral,
        length: "medium",
        language: "Finnish",
      },
      {
        artStyle: formState.imageStyle,
        colorScheme: "bright and cheerful",
        mood: "warm and friendly",
        focusElement: formState.mainCharacter,
      }
    );
  };

  const renderTitleAndCharacterStep = () => (
    <CreateStoryStep
      step={step}
      onPress={() => setStep(3)}
      onBackPress={() => setStep(1)}
      title={t("give-title-and-character")}
      helpText={t("give-title-and-character-description")}
      disabledNextButton={
        formState.title === "" || formState.mainCharacter === ""
      }
    >
      <View style={{ width: "100%", flexDirection: "column", gap: 32 }}>
        <TextInput
          label={t("title-of-the-story")}
          placeholder={t("title-of-the-story-placeholder")}
          value={formState.title}
          onChangeText={(text) => setFormState({ ...formState, title: text })}
        />
        <TextInput
          label={t("main-character")}
          placeholder={t("main-character-placeholder")}
          value={formState.mainCharacter}
          onChangeText={(text) =>
            setFormState({ ...formState, mainCharacter: text })
          }
        />
        <ToggleSwitch
          value={formState.herraMattiAddition}
          onChange={(value) =>
            setFormState({ ...formState, herraMattiAddition: value })
          }
          label={t("herra-matti-to-save-the-day")}
        />
      </View>
    </CreateStoryStep>
  );

  const renderCharacterTraitsStep = () => (
    <CreateStoryStep
      step={step}
      onPress={() => setStep(4)}
      onBackPress={() => setStep(2)}
      title={`${t("character-traits-step-header")} ${formState.mainCharacter}`}
      helpText={t("character-traits-step-long-text")}
      highlightedText={formState.mainCharacter}
      disabledNextButton={formState.mainCharacterTraits.length === 0}
    >
      <OptionPicker
        options={CHARACTER_TRAITS}
        selectedOptions={formState.mainCharacterTraits}
        isSingleSelect={false}
        onSelect={(trait) =>
          setFormState({
            ...formState,
            mainCharacterTraits: trait,
          })
        }
      />
    </CreateStoryStep>
  );

  const renderThemeStep = () => (
    <CreateStoryStep
      step={step}
      onPress={() => setStep(5)}
      onBackPress={() => setStep(3)}
      title={t("theme-step-header")}
      helpText={t("theme-step-long-text")}
      highlightedText="theme"
      disabledNextButton={formState.theme.length === 0}
    >
      <OptionPicker
        options={STORY_THEMES}
        selectedOptions={formState.theme}
        isSingleSelect={true}
        onSelect={(theme) => setFormState({ ...formState, theme: theme })}
      />
    </CreateStoryStep>
  );

  const renderStoryMoralStep = () => (
    <CreateStoryStep
      step={step}
      onPress={() => setStep(6)}
      onBackPress={() => setStep(4)}
      title={t("moral-step-header")}
      helpText={t("moral-step-long-text")}
      highlightedText="moral"
      disabledNextButton={formState.moral == ""}
    >
      <OptionPicker
        options={STORY_MORALS}
        selectedOptions={[formState.moral]}
        isSingleSelect={true}
        onSelect={(moral) => setFormState({ ...formState, moral: moral[0] })}
      />
    </CreateStoryStep>
  );

  const renderSettingStep = () => (
    <CreateStoryStep
      step={step}
      onPress={() => setStep(7)}
      onBackPress={() => setStep(5)}
      title={t("setting-step-header")}
      helpText={t("setting-step-long-text")}
      highlightedText="setting"
      disabledNextButton={formState.setting.length === 0}
    >
      <TextInput
        label={t("setting-step-label")}
        placeholder={t("setting-step-placeholder")}
        value={formState.setting}
        isLarge={true}
        onChangeText={(text) => setFormState({ ...formState, setting: text })}
      />
    </CreateStoryStep>
  );

  const renderImageStyleStep = () => (
    <CreateStoryStep
      step={step}
      onPress={() => setStep(8)}
      onBackPress={() => setStep(6)}
      title={t("image-step-header")}
      helpText={t("image-step-long-text")}
      highlightedText="images,"
      disabledNextButton={formState.setting.length === 0}
    >
      <View>
        <NumberSelector
          value={formState.amountOfImages}
          onChange={(number) =>
            setFormState({ ...formState, amountOfImages: number })
          }
          min={0}
          max={2}
        />
        {formState.amountOfImages > 0 && (
          <OptionPicker
            options={IMAGE_STYLES}
            selectedOptions={[formState.imageStyle]}
            isSingleSelect={true}
            onSelect={(imageStyle) =>
              setFormState({
                ...formState,
                imageStyle: imageStyle[0],
              })
            }
          />
        )}
      </View>
    </CreateStoryStep>
  );

  const renderSummaryStep = () => (
    <CreateStoryStep
      step={step}
      onPress={handleCreateStory}
      onBackPress={() => setStep(7)}
      title={t("summary-step-header")}
      helpText={t("summary-step-long-text")}
      highlightedText="Excellent,"
      disabledNextButton={
        formState.title.length === 0 ||
        formState.mainCharacter.length === 0 ||
        formState.mainCharacterTraits.length === 0 ||
        formState.theme.length === 0 ||
        formState.moral.length === 0 ||
        formState.setting.length === 0
      }
    >
      <StoryCreationSummary
        onBackPress={() => setStep(7)}
        formData={formState}
      />
    </CreateStoryStep>
  );

  switch (step) {
    case 1:
      return (
        <CreateStoryStartScreen
          onPress={() => {
            setStep(2);
            resetFormState();
          }}
        />
      );
    case 2:
      return renderTitleAndCharacterStep();
    case 3:
      return renderCharacterTraitsStep();
    case 4:
      return renderThemeStep();
    case 5:
      return renderStoryMoralStep();
    case 6:
      return renderSettingStep();
    case 7:
      return renderImageStyleStep();
    case 8:
      return renderSummaryStep();
    case 9:
      return (
        <LoadingStory
          storyLoadingState={storyLoadingState}
          imagesLoadingState={imagesLoadingState}
          numberOfImages={formState.amountOfImages}
          onReset={() => {
            router.push("/my-stories");
            setStep(1);
          }}
        />
      );
  }
}
