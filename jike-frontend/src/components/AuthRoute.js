// 封装高阶组件
import {getToken} from "@/utils/token";
import {Navigate} from "react-router-dom";

// children是原本要跳转到的路由组件
export const AuthRoute = ({children}) => {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace/>
  }
}
