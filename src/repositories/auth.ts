import Base from './base'
import { CreateUserInput, UpdateUserInput, RegisterInput, loginInput, ForgotPasswordEmailInput, ResetPasswordInput } from '@ts-types/generated'

class Auth extends Base<CreateUserInput, UpdateUserInput> {

  register = async (url: string, variables: RegisterInput) => {
    return this.http<RegisterInput>(url, 'post', variables)
  }
  login = async (url: string, variables: loginInput) => {
    return this.http<loginInput>(url, 'post', variables)
  }
  logout = async (url: string) => {
    return this.http(url, 'patch', {})
  }
  forgotPasswordEmail = async (url: string, variables: ForgotPasswordEmailInput) => {
    return this.http<ForgotPasswordEmailInput>(url, "post", variables)
  }
  resetPassword = async (url: string, variables: ResetPasswordInput) => {
    return this.http<ResetPasswordInput>(url, "post", variables)
  }
  upateProfile = async (url: string, variables: UpdateUserInput) => {
    return this.http<UpdateUserInput>(url, "post", variables)
  }
  upatePassword = async (url: string, variables: ResetPasswordInput) => {
    return this.http<ResetPasswordInput>(url, "put", variables)
  }
  verifyEmail = async (url: string) => {
    return this.find(url)
  }
  forgotPasswordVerifyUser = async (url: string) => {
    return this.find(url)
  }
  me = async (url: string) => {
    return this.find(url)
  }
}

export default new Auth()
