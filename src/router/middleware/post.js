import Axios from "axios";

export default async function check({ to, next, store }) {
  let allowed = false;

  if (store.getters["user/isAuth"]) {
    await Axios.get(`http://localhost:3000/posts/${to.params.id}`).then(
      (resp) => {
        const post = resp.data;
        allowed = store.getters["user/user"].id == post.userId;
      }
    );
  }

  if (allowed) {
    return next();
  }
  return next({
    name: "Feed",
  });
}
