declare namespace TSRequest {
  interface OptionsInterface {
    postData: object | null;
    onReady: Function | null;
    onError: Function | null;
    onSuccess: Function | null;
  }
}
