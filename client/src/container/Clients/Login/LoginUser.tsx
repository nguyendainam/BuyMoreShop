import React from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import Header from '../Header/Header'
import style from './LoginUser.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

type FieldType = {
  username?: string
  password?: string
  remember?: boolean // Change the type to boolean
}

const LoginUser: React.FC = () => {
  return (
    <>
      <div className={style.mainFormLogin}>
        <Header />
        <div className={style.formLogin}>
          <div className={style.formMaxWidth}>
            <div className={style.formTitle}>
              Chào mừng bạn đến với BuyMore | Laptop, PC, Màn hình, điện thoại,
              linh kiện Chính Hãng!
            </div>
            <Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 30 }}>
              <Form.Item<FieldType>
                label='Username'
                name='username'
                rules={[
                  { required: true, message: 'Please input your username!' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
            <div className={style.inputWidth}>
              <Button>Login </Button>
            </div>
            OR
            <div className={style.formSocial}>
              <div className={style.icons}>
                <FcGoogle />
              </div>
              <div className={style.icons}>
                <FaFacebook />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginUser
