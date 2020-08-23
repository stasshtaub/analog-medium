export default function writer({ next, store }) {
  if (store.getters["user/isWriter"]) {
    return next();
  }
  return next({
    name: "Feed",
  });
}
