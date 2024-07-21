
import { getNewAccessToken, validateAccessToken } from "./cookies/validate";

const authenticateUser = async () => {
        const user = await validateAccessToken();
        if (user) {
        return user;
      }else{
        const user = await getNewAccessToken();
        if (user) {
          return user;
        }
    }
    return false;
  };
  

export default authenticateUser;