import {
  ActionIcon,
  AppShell,
  Box,
  Center,
  Divider,
  Flex,
  Text,
  TextInput,
} from "@mantine/core";
import SplitPane, { Pane } from "split-pane-react";
import {
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarLeftExpandFilled,
  IconSearch,
} from "@tabler/icons-react";
import {
  useAppDispatch,
  useAppSelector,
  useElectron,
  useWindowState,
} from "../hooks";
import {
  setHorizontalSplitSizes,
  setVerticalSplitSizes,
  toggleNavbar,
} from "../store";

const ExpandButton = () => {
  const dispatch = useAppDispatch();
  const navbarOpen = useAppSelector((state) => state.appShell.navbarOpen);
  const maximized = useAppSelector((state) => state.window.maximized);
  return (
    <ActionIcon
      hidden={maximized}
      className="titlebar-control"
      size="sm"
      color="gray"
      variant="transparent"
      style={{ cursor: "pointer", userSelect: "contain" }}
      onClick={() => {
        dispatch(toggleNavbar());
      }}
    >
      {navbarOpen ? (
        <IconLayoutSidebarLeftCollapseFilled />
      ) : (
        <IconLayoutSidebarLeftExpandFilled />
      )}
    </ActionIcon>
  );
};

export const App = () => {
  const navbarOpen = useAppSelector((state) => state.appShell.navbarOpen);
  const dispatch = useAppDispatch();
  const { maximized } = useWindowState();
  const { platform } = useElectron();
  const verticalSplitSizes = useAppSelector(
    (state) => state.appShell.verticalSplitSizes
  );
  const horizontalSplitSizes = useAppSelector(
    (state) => state.appShell.horizontalSplitSizes
  );
  return (
    <AppShell
      header={{
        height: 40,
      }}
      navbar={{
        width: navbarOpen ? 300 : 0,
        breakpoint: "xs",
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
          <ExpandButton />
          <Flex justify="center" flex={1}>
            <TextInput
              leftSection={<IconSearch size={12} />}
              className="titlebar-control"
              placeholder="Search"
              w="100%"
              maw={360}
              size="xs"
            />
          </Flex>
          <span style={{ width: platform === "darwin" ? 106 : 22 }} />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar style={{ overflow: "hidden" }}>
        <Center w="100%" h="100%">
          <Text fz="lg">Sidebar</Text>
        </Center>
      </AppShell.Navbar>
      <AppShell.Main w="100%" h="100%">
        <SplitPane
          split="horizontal"
          sizes={horizontalSplitSizes}
          style={{ width: "100%", height: "100%", overflow: "hiddeen" }}
          sashRender={() => (
            <Divider
              size="sm"
              onDoubleClick={() =>
                dispatch(setHorizontalSplitSizes(["50%", "50%"]))
              }
            />
          )}
          onChange={(sizes) => {
            dispatch(setHorizontalSplitSizes(sizes));
          }}
        >
          <Pane minSize="10%">
            <Box p="xs">Main</Box>
          </Pane>
          <Pane minSize="10%">
            <SplitPane
              split="vertical"
              sizes={verticalSplitSizes}
              style={{ width: "100%", height: "100%" }}
              sashRender={() => (
                <Divider
                  size="sm"
                  style={{ height: "100%" }}
                  orientation="vertical"
                  onDoubleClick={() =>
                    dispatch(setVerticalSplitSizes(["50%", "50%"]))
                  }
                />
              )}
              onChange={(sizes) => {
                dispatch(setVerticalSplitSizes(sizes));
              }}
            >
              <Pane minSize="10%">
                <Box p="xs">
                  WindowState: {maximized ? " maximized" : "unmaximized"}
                </Box>
              </Pane>
              <Pane minSize="10%">
                <Box p="xs">Platform: {platform}</Box>
              </Pane>
            </SplitPane>
          </Pane>
        </SplitPane>
      </AppShell.Main>
    </AppShell>
  );
};
