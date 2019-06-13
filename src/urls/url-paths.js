let url = {};
url.base = "https://cors-anywhere.herokuapp.com/https://immense-spire-50040.herokuapp.com/";
// url.base = "http://localhost:3001/";
url.login = url.base + "users/login";
url.signup = url.base + "users/signup";
url.users = url.base + "users/";
url.create_comment = url.base + "comments/createcomment/";
url.posts = url.base + "posts/";
url.images = url.base + "resources/images/";
url.create_post = url.base + "posts/createpost";
url.myprofile = url.base + "users/myprofile";
url.search = url.base + "users/search?s=";
url.profile = url.base + "users/profile";

export default url;
