export default function auth({ next, store }) {
  if (store.getters["user/isAuth"]) {
    return next({
      name: "Feed",
    });
  }
  return next();
}
