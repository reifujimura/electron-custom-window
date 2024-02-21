import { ActionIcon, AppShell, Box, Center, Flex, Text } from "@mantine/core";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import {
  useAppDispatch,
  useAppSelector,
  useElectron,
  useWindowState,
} from "../hooks";
import { toggleNavbar } from "../store";

const ExpandButton = () => {
  const dispatch = useAppDispatch();
  const navbarOpen = useAppSelector((state) => state.appShell.navbarOpen);
  const maximized = useAppSelector((state) => state.window.maximized);
  return (
    <ActionIcon
      hidden={maximized}
      className="item"
      hiddenFrom="xxl"
      size="sm"
      color="gray"
      variant="transparent"
      style={{ cursor: "pointer", userSelect: "contain" }}
      onClick={() => {
        dispatch(toggleNavbar());
      }}
    >
      {navbarOpen ? (
        <IconLayoutSidebarLeftCollapse />
      ) : (
        <IconLayoutSidebarLeftExpand />
      )}
    </ActionIcon>
  );
};

export const App = () => {
  const navbarOpen = useAppSelector((state) => state.appShell.navbarOpen);
  const { maximized } = useWindowState();
  const { platform } = useElectron();
  return (
    <AppShell
      header={{
        height: 40,
      }}
      navbar={{
        width: 300,
        breakpoint: "xxl",
        collapsed: {
          mobile: !navbarOpen,
        },
      }}
      w="100%"
      h="100%"
    >
      <AppShell.Header>
        <Flex
          h="100%"
          p="sm"
          ml={platform !== "darwin" || maximized ? undefined : 84}
          align="center"
          gap="sm"
          className="titlebar"
        >
          {maximized ? <span style={{ width: 22 }} /> : <ExpandButton />}
          <Flex justify="center" flex={1}>
            <Text fw={900} fz="sm">
              App
            </Text>
          </Flex>
          <span style={{ width: 22 }} />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Center w="100%" h="100%">
          <Text fz="lg">Sidebar</Text>
        </Center>
      </AppShell.Navbar>
      <AppShell.Main w="100%" h="100%">
        <Center w="100%" h="100%">
          Main
          <br />
          {maximized ? " maximized" : "unmaximized"}
        </Center>
      </AppShell.Main>
    </AppShell>
  );
};
