/**
 * This service generates a story using the OpenAI API
 * We have two API routes, one for generating the story and one for generating the images
 * First, we need to call the OpenAI API to generate the story
 * Then, we need to call the OpenAI API to generate the images, passing the image_description as the prompt for images
 * The stories can have 3-5 pages, and each page should have an image attached to it.
 *
 * ie. We generate a storu with 3 pages, we should also return 3 images. Once for each page.
 * Since we are handling two API calls, we need  to return a loading state for the user to see while the story is being generated.
 */

/**
 * Get the users characters, character descriptons etc from the database
 * Pass them to the API
 */

export default async function generateStory() {}
