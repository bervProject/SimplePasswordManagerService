import { Component, Vue } from "vue-property-decorator";
import { required, email } from "vee-validate/dist/rules";
import axios from "axios";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class Home extends Vue {
  $refs!: {
    observer: HTMLFormElement;
  };
  baseURL = "https://spms-berv.herokuapp.com";
  loginGithub = `${this.baseURL}/oauth/github`;
  loginGoogle = `${this.baseURL}/oauth/google`;
  loginTwitter = `${this.baseURL}/oauth/twitter`;
  loginPassword = `${this.baseURL}/authentication`;
  showPassword = false;
  password = "";
  username = "";
  valid = true;
  submitting = false;
  snackbar = false;
  errorMessage = "";
  submit(): void {
    const result = this.$refs.observer.validate();
    if (!result) {
      console.log("Can't login");
      return;
    }
    this.submitting = true;
    axios
      .post(this.loginPassword, {
        strategy: "local",
        email: this.username,
        password: this.password,
      })
      .then((result) => {
        this.submitting = false;
        console.log(result.data);
      })
      .catch((error) => {
        this.submitting = false;
        console.log(error);
        const statusCode = error.response.status;
        console.log(statusCode);
        if (statusCode === 401) {
          const dataResponse = error.response.data;
          const message = dataResponse.message;
          console.error(message);
          this.errorMessage = message;
        } else {
          this.errorMessage = "Failed to call server";
        }
        this.snackbar = true;
      });
  }
}
