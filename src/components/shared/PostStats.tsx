import React, { useEffect, useState } from "react";
import { Models } from "appwrite";

import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
  post: Models.Document;
  user: Models.Document;
};

const PostStats = ({ post, user }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const savedPostRecord = user?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(savedPostRecord);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  useEffect(() => {
    likePost({ postId: post.$id, likesArray: likes });
  }, [likes]);

  useEffect(() => {
    if (!isSaved && savedPostRecord) {
      deleteSavedPost(savedPostRecord.$id);
    }

    if (isSaved && !savedPostRecord) {
      savePost({ postId: post.$id, userId: user.$id });
    }
  }, [isSaved]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    setLikes((prev: string[]) => {
      let newLikes = [...prev];

      const hasLiked = newLikes.includes(user.$id);

      if (hasLiked) {
        newLikes = newLikes.filter((id) => id !== user.$id);
      } else {
        newLikes.push(user.$id);
      }

      return newLikes;
    });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsSaved((prev: Models.Document) => {
      return !prev;
    });
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2">
        <img
          src={
            checkIsLiked(likes, user.$id)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cusor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cusor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
