import { useState } from "react";

import { View } from "react-native";
import { useRouter } from "expo-router";

import { useAIStory } from "@/hooks/useAIStory";

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

import { StoryParams } from "@/types";
import ToggleSwitch from "@/components/create-story/ToggleSwitch";

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

  const { createStory, storyLoadingState, imagesLoadingState } = useAIStory();
  const router = useRouter();

  const resetFormState = () => {
    setFormState(INITIAL_FORM_STATE);
  };

  const handleCreateStory = () => {
    setStep(9); // Changed from 8 to 9 to show loading screen
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
      title="Let's give this story a title & main character"
      helpText="This is the title of the story and the main character"
      disabledNextButton={
        formState.title === "" || formState.mainCharacter === ""
      }
    >
      <View style={{ width: "100%", flexDirection: "column", gap: 32 }}>
        <TextInput
          label="Title of the "
          placeholder="An adventure in the jungle"
          value={formState.title}
          onChangeText={(text) => setFormState({ ...formState, title: text })}
        />
        <TextInput
          label="Main character"
          placeholder="Selma Sankari"
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
          label="Herra Matti to save the day"
        />
      </View>
    </CreateStoryStep>
  );

  const renderCharacterTraitsStep = () => (
    <CreateStoryStep
      step={step}
      onPress={() => setStep(4)}
      onBackPress={() => setStep(2)}
      title={`What is ${formState.mainCharacter} like in this story?`}
      helpText={`Based on this, ${
        formState.mainCharacter
      } will act accordingly in: ${formState.title.toLowerCase()} story!`}
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
      title="What's the theme of this story?"
      helpText="The theme is the main idea of the story."
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
      title="What's the moral of this story?"
      helpText="This is the lesson that will be taught through the story."
      highlightedText="moral"
      disabledNextButton={formState.moral === ""}
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
      title="What will the setting of this story be?"
      helpText="The setting is the place where the story takes place."
      highlightedText="setting"
      disabledNextButton={formState.setting.length === 0}
    >
      <TextInput
        label="Setting"
        placeholder="On a far away island 🌴"
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
      title="What will the image style of this story be?"
      helpText="The setting is the place where the story takes place."
      highlightedText="setting"
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
      title="Excellent, this is the story we'll create!"
      helpText="You can always change the story details later."
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
