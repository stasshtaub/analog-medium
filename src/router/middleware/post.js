import Axios from "../../plugins/axios";

export default async function author({ to, next, store }) {
  let allowed = false;
  let post = null;

  if (store.getters["user/isAuth"]) {
    if (to.params.post) {
      post = to.params.post;
    } else {
      console.log("получаем пост");

      await Axios.get(`/posts/${to.params.id}`).then((resp) => {
        post = resp.data;
        console.log("получили пост", post);
      });
    }
    allowed = store.getters["user/user"].id == post.userId;
  }

  if (allowed) {
    return next({ params: { a: 1, b: 2 } });
  }
  return next({
    name: "Feed",
  });
}
