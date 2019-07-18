// https://umijs.org/config/
import os from 'os';
import slash from 'slash2';
import { IPlugin, IConfig } from 'umi-types';
import defaultSettings from './defaultSettings';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, TEST, NODE_ENV } = process.env;
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
          // dll: {
          //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
          //   exclude: ['@babel/runtime', 'netlify-lambda'],
          // },
          hardSource: false,
        }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
      uglifyOptions: {
        // remove console.* except console.error
        compress: {
          drop_console: true,
          pure_funcs: ['console.error'],
        },
      },
    }
    : {};
export default {
  // add for transfer to umi
  history: 'hash',
  base: './',
  publicPath: './',
  plugins,
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION ? 'source-map' : false,
  // 路由配置
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          name: 'login',
          component: './user-login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      routes: [
        {
          path: '/',
          redirect: '/analysis',
        },
        {
          name: 'analysis',
          path: '/analysis',
          icon: 'bar-chart',
          component: './analysis',
        },
        {
          path: 'system',
          name: 'system',
          icon: 'setting',
          authority: ['user', 'role', 'permission', 'dictionary'],
          routes: [
            {
              path: '/system/user',
              name: 'user',
              authority: ['user'],
              component: './system/users',
            },
            {
              path: '/system/role',
              name: 'role',
              authority: ['role'],
              component: './system/role',
            },
            {
              path: '/system/permission',
              name: 'permission',
              authority: ['permission'],
              component: './system/permission',
            },
            {
              path: '/system/dictionary',
              name: 'dictionary',
              authority: ['dictionary'],
              component: './system/dictionary',
            },
          ],
        },
        {
          path: 'org',
          name: 'org',
          icon: 'home',
          authority: ['manager', 'organizational', 'person'],
          routes: [
            {
              path: '/org/manager',
              name: 'manager',
              authority: ['manager'],
              component: './org/manager',
            },
            {
              path: '/org/organizational',
              name: 'organizational',
              authority: ['organizational'],
              component: './org/organizational',
            },
            {
              path: '/org/person',
              name: 'person',
              authority: ['person'],
              component: './org/person',
            },
          ],
        },
        {
          path: 'devlop',
          name: 'devlop',
          icon: 'branches',
          authority: [
            'code-generator',
            'database-manager',
            'datasource',
            'dynamic-form',
            'schedule',
            'template',
          ],
          routes: [
            {
              path: '/devlop/code-generator',
              name: 'code-generator',
              authority: ['code-generator'],
              component: './devlop/code-generator',
            },
            {
              path: '/devlop/database-manager',
              name: 'database-manager',
              authority: ['database-manager'],
              component: './devlop/database-manager',
            },
            {
              path: '/devlop/datasource',
              name: 'datasource',
              authority: ['datasource'],
              component: './devlop/datasource',
            },
            {
              path: '/devlop/dynamic-form',
              name: 'dynamic-form',
              authority: ['dynamic-form'],
              component: './devlop/dynamic-form',
            },
            {
              path: '/devlop/schedule',
              name: 'schedule',
              authority: ['schedule'],
              component: './devlop/schedule',
            },
            {
              path: '/devlop/template',
              name: 'template',
              authority: ['template'],
              component: './devlop/template',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  proxy: {
    '/hsweb': {
      target: 'http://hsweb.zuaker.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/hsweb': '',
      },
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      localIdentName: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin,
} as IConfig;
