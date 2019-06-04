let url = {};
url.base=  "https://piktogram-be.herokuapp.com/";
url.login = url.base + "users/login" ;
url.signup = url.base + "users/signup" ;
url.users = url.base + "users/" ;
url.create_comment = url.base + "comments/createcomment/" ;
url.posts = url.base + "posts/" ;
url.images = url.base + "resources/images/" ;
url.create_post = url.base + "posts/createpost" ;
url.myprofile = url.base + "users/myprofile" ;
url.search = url.base + "users/search?s=";

export default url;