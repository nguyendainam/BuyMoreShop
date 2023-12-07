import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import Header from '../Header/Header'
import style from './LoginUser.module.scss'
import { useParams, } from 'react-router-dom'
import { validatePassword } from '../../../components/Validate'
import FormData from 'form-data'
import { changePassword } from '../../../services/user'
// import { FcGoogle } from 'react-icons/fc'
// import { FaFacebook } from 'react-icons/fa'



const ResetPassword: React.FC = () => {
    const { token }: { token?: string } = useParams();
    const [password, setPassword] = useState<string>('')
    const [correctPass, setCorrectPass] = useState<boolean>(false)

    const handleGetTokenParam = () => {
        console.log(token)
    }

    const handleOnChange = (value: string) => {


        setPassword(value)
    }


    useEffect(() => {
        handleGetTokenParam()

    })

    const handleSendRequest = async () => {
        if (correctPass === false) {
            message.error('Please check information again')
        } else if (correctPass) {
            const formdata = new FormData()
            formdata.append('token', token)
            formdata.append('password', password)

            const resultRequest = await changePassword(formdata)

            console.log(resultRequest)
            if (resultRequest.data.err === 0) {
                message.success(resultRequest.data.errMessage)
            } else {
                message.error(resultRequest.data.errMessage)
            }
        }
    }


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
                        <Form name='basic' labelCol={{ span: 10 }} wrapperCol={{ span: 60 }}>
                            <Form.Item
                                label='Password'
                                name='password'
                                required
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    ({ getFieldValue }) => ({

                                        validator(_, value) {
                                            const isValidPass = validatePassword(value)

                                            if (!value || (isValidPass && getFieldValue('password') === value)) {
                                                setCorrectPass(true)
                                                return Promise.resolve();
                                            }
                                            else if (value.length < 8) {
                                                setCorrectPass(false)
                                                return Promise.reject('Password must less than 8')
                                            }
                                            setCorrectPass(false)
                                            return Promise.reject('Password must contain capital letters and numbers')



                                        }
                                    })

                                ]}
                            >
                                <Input.Password
                                    value={password}
                                    onChange={(event) => handleOnChange(event.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                label='Confirm Password'
                                name='confirmPassword'
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please input your Confirm Password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                setCorrectPass(true)
                                                return Promise.resolve();
                                            }
                                            setCorrectPass(false)
                                            return Promise.reject('The two passwords do not match!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Form>
                        <div className={style.inputWidth45}>
                            <Button onClick={handleSendRequest}>Change Password </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
