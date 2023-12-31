import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
  } from "@tanstack/react-query";
import { createPost, createUserAccount, signInAccount, signOutAccount } from "@/lib/appwrite/api";
import { INewPost, INewUser } from '@/types'
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

// for creating user
export const useCreateUserAccount = () => {
    return useMutation({
      mutationFn: (user: INewUser) => createUserAccount(user),
    });
  };

// for creating account
export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
    });
  };

  export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount
    });
  };

  export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };