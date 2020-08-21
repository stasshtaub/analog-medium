import { required, email } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "Обязательное поле",
});

extend("email", {
  ...email,
  message: "Некорректный e-mail",
});