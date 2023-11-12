import './index.scss'
import {Button, Card, Form, Input, message} from 'antd'
import logo from '@/assets/logo.png'
import {fetchLogin} from "@/store/modules/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // 账号： 13800000002
    // 密码： 246810
    await dispatch(fetchLogin(values))
    navigate('/')
    message.success('登陆成功')
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt=""/>
        {/* 登录表单 */}
        <Form validateTrigger="onBlur"
              onFinish={onFinish}
              labelCol={{
                span: 4,
              }}
        >
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号格式'
              }
            ]}>
            <Input size="large" placeholder="请输入手机号"/>
          </Form.Item>
          <Form.Item
            name="code"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}>
            <Input size="large" placeholder="请输入验证码"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
