import Axios from "axios";

export default async function check({ to, next, store }) {
  let allowed = false;
  let post = null;

  if (store.getters["user/isAuth"]) {
    if (to.params.post) {
      post = to.params.post;
    } else {
      await Axios.get(`http://localhost:3000/posts/${to.params.id}`).then(
        (resp) => {
          post = resp.data;
        }
      );
    }
    allowed = store.getters["user/user"].id == post.userId;
  }

  if (allowed) {
    return next({ params: { post } });
  }
  return next({
    name: "Feed",
  });
}
