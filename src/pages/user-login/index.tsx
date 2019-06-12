import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import LoginComponents from './components/Login';
import styles from './style.less';
import { Dispatch } from 'redux';
import { IStateType } from './model';
import { FormComponentProps } from 'antd/lib/form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

interface UserLoginProps {
  dispatch: Dispatch<any>;
  userLogin: IStateType;
  submitting: boolean;
}
interface UserLoginState {
  autoLogin: boolean;
  token_type: string;
}
export interface FromDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({
    userLogin,
    loading,
  }: {
    userLogin: IStateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userLogin,
    submitting: loading.effects['userLogin/login'],
  }),
)
class UserLogin extends Component<UserLoginProps, UserLoginState> {
  state: UserLoginState = {
    autoLogin: true,
    token_type: 'token',
  };
  loginForm: FormComponentProps['form'] | undefined | null;

  handleSubmit = (err: any, values: FromDataType) => {
    const { token_type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: {
          ...values,
          token_type,
        },
      });
    }
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          {status === 'error' && loginType === 'account' && !submitting && this.renderMessage(formatMessage({ id: 'user-login.login.message-invalid-credentials' }))}
          <UserName
            name="username"
            placeholder={`${formatMessage({ id: 'user-login.login.userName' })}: admin or user`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'user-login.userName.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({ id: 'user-login.login.password' })}: ant.design`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'user-login.password.required' }),
              },
            ]}
            onPressEnter={() =>
              this.loginForm && this.loginForm.validateFields(this.handleSubmit)
            }
          />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="user-login.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default UserLogin;
