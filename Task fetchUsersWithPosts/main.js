async function fetchUsersWithPosts() {
    const usersUrl = "https://jsonplaceholder.typicode.com/users";
    const postsUrl = "https://jsonplaceholder.typicode.com/posts?userId=";

    try {
        const usersResponse = await fetch(usersUrl);
        if (!usersResponse.ok) {
            throw new Error("Failed to fetch users.");
        }
        const users = await usersResponse.json();

        const usersWithPosts = await Promise.all(
            users.map(async (user) => {
                const userPostsResponse = await fetch(`${postsUrl}${user.id}`);
                if (!userPostsResponse.ok) {
                    throw new Error(`Failed to fetch posts for user ID: ${user.id}`);
                }
                const posts = await userPostsResponse.json();

                return {
                    id: user.id,
                    name: user.name,
                    posts: posts.map(post => post.title)
                };
            })
        );

        return usersWithPosts;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

fetchUsersWithPosts()
    .then(data => console.log(data))
    .catch(err => console.error(err));