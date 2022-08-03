import { Refine, AuthProvider } from '@pankod/refine-core';
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  AntdLayout,
} from '@pankod/refine-antd';
import routerProvider from '@pankod/refine-react-router-v6';
import dataProvider from '@pankod/refine-simple-rest';
import 'styles/antd.less';
import { PostList } from './module/pages/list/list';
import { PostShow } from './module/pages/show/show';
import { ListCategory } from './module/pages/category/categories';
import { ShowCategory } from 'module/pages/category/showCategory';
import { TagCategory } from './module/pages/tag/tags';
import { ShowTag } from 'module/pages/tag/showTag';
import { CustomMenu } from './module/sider/customMenu';
import { Login } from './module/login/loginPage';

const mockUsers = [
  {
    username: 'admin',
    roles: ['admin'],
  },
  {
    username: 'ujjwal',
    roles: ['ujjwal'],
  },
];

function App() {
  const authProvider: AuthProvider = {
    login: ({ username, password, remember }) => {
      const user = mockUsers.find((item) => item.username === username);

      if (user) {
        localStorage.setItem('auth', JSON.stringify(user));
        return Promise.resolve();
      }
      return Promise.reject();
    },
    logout: () => {
      localStorage.removeItem('auth');
      return Promise.resolve();
    },
    checkError: (error) => {
      if (error && error.statusCode === 401) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    checkAuth: () =>
      localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => {
      const auth = localStorage.getItem('auth');
      if (auth) {
        const parsedUser = JSON.parse(auth);
        return Promise.resolve(parsedUser.roles);
      }
      return Promise.reject();
    },
    getUserIdentity: () => {
      const auth = localStorage.getItem('auth');
      if (auth) {
        const parsedUser = JSON.parse(auth);
        return Promise.resolve(parsedUser.username);
      }
      return Promise.reject();
    },
  };

  const CustomTitle = ({ collapsed }: { collapsed: any }) => (
    <div className="custom-title">{collapsed ? ' ' : 'Ampcome'}</div>
  );

  return (
    <Refine
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
      authProvider={authProvider}
      LoginPage={Login}
      Title={CustomTitle}
      Layout={({ children, Footer, OffLayoutArea }) => (
        <AntdLayout>
          <AntdLayout.Sider>
            <CustomMenu />
          </AntdLayout.Sider>
          <AntdLayout.Content>
            <AntdLayout.Content>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </AntdLayout.Content>
            {Footer && <Footer />}
          </AntdLayout.Content>
          {OffLayoutArea && <OffLayoutArea />}
        </AntdLayout>
      )}
      resources={[
        {
          name: 'posts',
          list: PostList,
          show: PostShow,
        },
        {
          name: 'categories',
          list: ListCategory,
          show: ShowCategory,
        },
        {
          name: 'tags',
          list: TagCategory,
          show: ShowTag,
        },
      ]}
    />
  );
}

export default App;
