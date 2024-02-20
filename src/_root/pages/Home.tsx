import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import {
  useGetCurrentUser,
  useGetRecentPosts,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const { data: user, isPending: isUserLoading } = useGetCurrentUser();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading || isUserLoading || !user || !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id}>
                  <PostCard post={post} user={user!} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
