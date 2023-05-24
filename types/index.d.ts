type IUser = {
    _id: string;
    email: string;
    userName: string;
    image: string;
    __v: 0;
  };

type CreatePromptType = {
  promptText: string;
  tag: string;
  userId?: string;
};

type PromptType = {
  promptText: string;
  tag: string;
  _id: string;
  creator: IUser;
};


