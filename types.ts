export type AuthenticatedUser = {
  id: string;
  email?: string;
};

export type Story = {
  id?: string;
  title: string;
  content: string;
  // imageUrls: string[];
};
