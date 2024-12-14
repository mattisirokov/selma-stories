import { useState } from "react";
import { View } from "react-native";

import { useAIStory } from "@/hooks/useAIStory";

import TextInput from "@/components/create-story/TextInput";
import CreateStoryStartScreen from "@/components/create-story/CreateStoryStartScreen";
import CreateStoryStep from "@/components/create-story/CreateStoryStep";
import OptionPicker from "@/components/create-story/OptionPicker";
import NumberSelector from "@/components/create-story/AmountSelector";
import StoryCreationSummary from "@/components/create-story/StoryCreationSummary";
import LoadingStory from "@/components/create-story/LoadingStory";

import { ArtStyle, FormState, StoryTheme } from "@/types";

export default function CreateStory() {
  const [step, setStep] = useState<number>(1);

  const [formState, setFormState] = useState({
    title: "",
    mainCharacter: "",
    mainCharacterTraits: [""],
    theme: [""],
    moral: "",
    setting: "",
    amountOfImages: 0,
    imageStyle: "",
  } as FormState);

  const { createStory, storyLoadingState, imagesLoadingState } = useAIStory();

  const resetFormState = () => {
    setFormState({
      title: "",
      mainCharacter: "",
      mainCharacterTraits: [""],
      theme: [""],
      moral: "",
      setting: "",
      amountOfImages: 0,
      imageStyle: "",
    });
  };

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
      return (
        <CreateStoryStep
          step={step}
          onPress={() => setStep(3)}
          onBackPress={() => setStep(1)}
          title="Let's give this story a title & main character"
          helpText="This is the title of the story and the main character"
          disabledNextButton={
            formState.title.length === 0 || formState.mainCharacter.length === 0
          }
        >
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              gap: 32,
            }}
          >
            <TextInput
              label="Title of the "
              placeholder="An adventure in the jungle"
              value={formState.title}
              onChangeText={(text) =>
                setFormState({ ...formState, title: text })
              }
            />
            <TextInput
              label="Main character"
              placeholder="Selma Sankari"
              value={formState.mainCharacter}
              onChangeText={(text) =>
                setFormState({ ...formState, mainCharacter: text })
              }
            />
          </View>
        </CreateStoryStep>
      );
    case 3:
      return (
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
            options={[
              "Brave",
              "Curious",
              "Kind",
              "Determined",
              "Mysterious",
              "Creative",
            ]}
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
    case 4:
      return (
        <CreateStoryStep
          step={step}
          onPress={() => setStep(5)}
          onBackPress={() => setStep(3)}
          title={`What's the theme of this story?`}
          helpText={`The theme is the main idea of the story, and the moral is the message of the story.`}
          highlightedText={"theme"}
          disabledNextButton={formState.theme.length === 0}
        >
          <OptionPicker
            options={[
              "Adventure",
              "Fantasy",
              "Mystery",
              "Romance",
              "Science Fiction",
              "Thriller",
              "Western",
            ]}
            selectedOptions={formState.theme}
            isSingleSelect={true}
            onSelect={(theme) => setFormState({ ...formState, theme: theme })}
          />
        </CreateStoryStep>
      );
    case 5:
      return (
        <CreateStoryStep
          step={step}
          onPress={() => setStep(6)}
          onBackPress={() => setStep(4)}
          title={`What will the setting of this story be?`}
          helpText={`The setting is the place where the story takes place.`}
          highlightedText={"setting"}
          disabledNextButton={formState.setting.length === 0}
        >
          <TextInput
            label="Setting"
            placeholder="On a far away island 🌴"
            value={formState.setting}
            isLarge={true}
            onChangeText={(text) =>
              setFormState({ ...formState, setting: text })
            }
          />
        </CreateStoryStep>
      );
    case 6:
      return (
        <CreateStoryStep
          step={step}
          onPress={() => setStep(7)}
          onBackPress={() => setStep(5)}
          title={`What will the image style of this story be?`}
          helpText={`The setting is the place where the story takes place.`}
          highlightedText={"setting"}
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
                options={[
                  "Watercolor",
                  "Realistic",
                  "Cartoon",
                  "Pixel art",
                  "Pencil",
                  "Anime",
                ]}
                selectedOptions={[formState.imageStyle]}
                isSingleSelect={true}
                onSelect={(imageStyle) =>
                  setFormState({ ...formState, imageStyle: imageStyle[0] })
                }
              />
            )}
          </View>
        </CreateStoryStep>
      );
    case 7:
      return (
        <CreateStoryStep
          step={step}
          onPress={() => {
            setStep(8);
            createStory(
              formState.amountOfImages,
              {
                title: formState.title,
                theme: formState.theme[0] as StoryTheme,
                mainCharacter: formState.mainCharacter,
                setting: formState.setting,
                targetAge: 5,
                moral: formState.moral,
                length: "medium",
                language: "Finnish",
              },
              {
                artStyle: formState.imageStyle as ArtStyle,
                colorScheme: "bright and cheerful",
                mood: "warm and friendly",
                focusElement: formState.mainCharacter,
              }
            );
          }}
          onBackPress={() => setStep(6)}
          title={`Excellent, this is the story we'll create!`}
          helpText={`You can always change the story details later.`}
          highlightedText={"Excellent,"}
          disabledNextButton={
            formState.title.length === 0 ||
            formState.mainCharacter.length === 0 ||
            formState.mainCharacterTraits.length === 0 ||
            formState.theme.length === 0 ||
            formState.setting.length === 0
          }
        >
          <StoryCreationSummary
            onBackPress={() => setStep(6)}
            formData={formState}
          />
        </CreateStoryStep>
      );
    case 8:
      return (
        <LoadingStory
          storyLoadingState={storyLoadingState}
          imagesLoadingState={imagesLoadingState}
          onResetPress={() => {
            setStep(1);
          }}
        />
      );
  }
}
