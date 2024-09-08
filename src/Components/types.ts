
export type FeedDataItems={
    id:number,
    name:string;
    imgUrl:string;
    timeStamp:number;
    postText:string;
    emoji:string;
    commentsCount:number;
    isEdited:boolean
}

export type LoginFormType={
    email:string;
    password:string;
}
export type LoginErrorType={
    email:string | null;
    password:string | null;
    loginError:string | null
}

export type SignUpFormType={
    email:string;
    username:string;
    password:string;
}
export type SignUpErrorType={
    email:string | null;
    username:string | null;
    password:string | null
}

export type FeedData=[FeedDataItems]
   