import { Icon, Layout } from 'antd';
import React, { Fragment } from 'react';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;

const FooterView: React.SFC = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Hs web Demo',
          title: 'Hs web Demo',
          href: 'https://github.com/hs-web/hsweb-ui-antd',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/hs-web',
          blankTarget: true,
        },
        {
          key: 'Hs-web',
          title: 'Hs-web',
          href: 'https://github.com/hs-web',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 Hsweb Pro技术部出品
        </Fragment>
      }
    />
  </Footer>
);

export default FooterView;
