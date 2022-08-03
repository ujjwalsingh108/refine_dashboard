import { useState, CSSProperties } from 'react';
import {
  useTitle,
  ITreeMenu,
  CanAccess,
  useTranslate,
  useRefineContext,
  useRouterContext,
  useMenu,
  useLogout,
} from '@pankod/refine-core';
import {
  AntdLayout,
  Menu,
  Grid,
  Icons,
  Title,
  Button,
} from '@pankod/refine-antd';

export const CustomMenu: React.FC = () => {
  const { mutate: Logout } = useLogout();
  const refineTitle = useTitle();
  const { Link } = useRouterContext();

  const { SubMenu } = Menu;

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const breakpoint = Grid.useBreakpoint();
  const isMobile = !breakpoint.lg;

  const RenderToTitle = refineTitle ?? Title;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={route}
            icon={icon ?? <Icons.UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);

      return (
        <CanAccess key={route} resource={name.toLowerCase()} action="list">
          <Menu.Item
            id="custom-menu"
            key={route}
            style={{
              fontWeight: isSelected ? 'bold' : 'normal',
            }}
            icon={icon ?? (isRoute && <Icons.DingtalkSquareFilled />)}
          >
            <Link to={route}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  return (
    <AntdLayout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(!collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      <RenderToTitle collapsed={collapsed} />
      <Menu
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
      >
        {/* {hasDashboard ? (
          <Menu.Item
            key="dashboard"
            style={{
              fontWeight: selectedKey === '/' ? 'bold' : 'normal',
            }}
            icon={<Icons.DashboardOutlined />}
          >
            <Link to="/">{translate('dashboard.title', 'Dashboard')}</Link>
            {!collapsed && selectedKey === '/' && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        ) : null} */}
        {renderTreeView(menuItems, selectedKey)}
      </Menu>
      <div className="container">
        <Button
          type="primary"
          icon={<Icons.LogoutOutlined />}
          onClick={() => Logout()}
        >
          Logout
        </Button>
      </div>
    </AntdLayout.Sider>
  );
};

const antLayoutSider: CSSProperties = {
  position: 'relative',
  height: '100vh',
  backgroundColor: 'rgb(24, 87, 167)',
};
const antLayoutSiderMobile: CSSProperties = {
  position: 'fixed',
  height: '100vh',
  zIndex: 999,
  backgroundColor: 'rgb(24, 87, 167)',
};
